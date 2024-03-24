import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { OWM_API_KEY } from '@/config/environment.ts';
import { OWMData } from '@/types/weather.type.ts';

const url = new URL('https://api.openweathermap.org/data/2.5/onecall');

export function useWeather() {
  return useQuery({
    queryKey: ['weather'],
    queryFn: async () => {
      url.searchParams.set('lat', '0');
      url.searchParams.set('lon', '0');
      url.searchParams.set('appid', OWM_API_KEY);
      const response = await axios.get<OWMData>(url.toString());
      return response.data;
    },
  });
}
