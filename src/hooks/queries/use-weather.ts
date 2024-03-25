import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { OWM_API_KEY } from '@/config/environment.ts';
import { useSettingsContext } from '@/contexts/settings.context.tsx';
import { OWMData } from '@/types/weather.type.ts';

const url = new URL('https://api.openweathermap.org/data/2.5/onecall');

export function useWeather() {
  const { staticCoordinates } = useSettingsContext();
  return useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      url.searchParams.set('lat', staticCoordinates.lat.toString());
      url.searchParams.set('lon', staticCoordinates.lon.toString());
      url.searchParams.set('appid', OWM_API_KEY);
      const response = await axios.get<OWMData>(url.toString());
      return response.data;
    },
    select: (data) => ({
      forecast: {
        nextRain: data.minutely.find((m) => m.precipitation > 0)?.dt ?? data.hourly.slice(1, 4).find((h) => h.rain)?.dt,
        nextSnow: data.hourly.slice(0, 3).find((h) => h.snow)?.dt,
        rainEnd: data.minutely.find((m) => m.precipitation === 0)?.dt ?? data.hourly.slice(1).find((m) => !m.rain)?.dt,
        snowEnd: data.hourly.slice(1).find((m) => !m.snow)?.dt,
      },
      weatherId: data.current.weather[0].id,
      rain: data.current.rain?.['1h'],
      snow: data.current.snow?.['1h'],
      icon: data.current.weather[0].icon
        ? `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
        : undefined,
      temp: {
        current: Math.round(data.current.temp) - 273,
        min: Math.round(data.daily[0]?.temp.min) - 273,
        max: Math.round(data.daily[0]?.temp.max) - 273,
      },
      daily: data.daily.slice(0, 6).map((dailyItem) => ({
        timestamp: dailyItem.dt,
        temp: {
          min: Math.round(dailyItem.temp.min) - 273,
          max: Math.round(dailyItem.temp.max) - 273,
        },
        weather: dailyItem.weather[0].icon
          ? `https://openweathermap.org/img/wn/${dailyItem.weather[0].icon}@2x.png`
          : undefined,
      })),
      sunrise: data.current.sunrise * 1000,
      sunset: data.current.sunset * 1000,
    }),
  });
}
