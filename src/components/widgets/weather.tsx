import { IconType } from 'react-icons';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { WiCloudy, WiRain, WiSnow } from 'react-icons/wi';

import { Widget } from '@/components/widgets/widget.tsx';
import { useWeather } from '@/hooks/queries/use-weather.ts';
import { cn, formatHu } from '@/utils/common.utils.ts';

export function WeatherWidget() {
  const weather = useWeather();

  if (!weather.data) return null;

  const forecast = weather.data.forecast;

  const shouldShowForecast =
    (forecast.rainEnd && weather.data.rain) ||
    (forecast.snowEnd && weather.data.snow) ||
    forecast.nextRain ||
    forecast.nextSnow;

  return (
    <>
      <Widget
        className={cn('flex gap-5 items-center justify-start bg-gradient-to-br', {
          'from-slate-200 to-slate-400': weather.data.weatherId > 800,
          'from-yellow-100 to-blue-400': weather.data.weatherId === 800,
          'from-gray-50 to-gray-300': weather.data.weatherId >= 700 && weather.data.weatherId < 800,
          'from-white to-gray-200': weather.data.weatherId >= 600 && weather.data.weatherId < 700,
          'from-gray-500 to-blue-500': weather.data.weatherId >= 500 && weather.data.weatherId < 600,
          'from-gray-500 to-blue-200': weather.data.weatherId >= 300 && weather.data.weatherId < 500,
          'from-gray-400 to-gray-600': weather.data.weatherId < 300,
        })}
      >
        {weather.data.icon && (
          <img className='bg-white/30 backdrop-blur-md rounded-full' src={weather.data.icon} alt='weather icon' />
        )}
        <div className='space-y-5'>
          <h2>
            {weather.data.temp.current}°{weather.data.rain && ` | ${weather.data.rain}mm/h`}
            {weather.data.snow && ` | ${weather.data.snow}mm/h`}
          </h2>
          <p className='text-white/50'>
            <FiArrowDown className='inline' />
            {weather.data.temp.min}° | {''}
            <FiArrowUp className='inline' />
            {weather.data.temp.max}°
          </p>
        </div>
      </Widget>
      {shouldShowForecast && (
        <Widget className='flex flex-wrap justify-evenly bg-gradient-to-br from-blue-200 to-blue-500 text-white p-10'>
          {forecast.nextRain && <ForecastField icon={WiRain} label='Eső várható' time={forecast.nextRain} />}
          {forecast.rainEnd && weather.data.rain && (
            <ForecastField icon={WiCloudy} label='Eső vége' time={forecast.rainEnd} />
          )}
          {forecast.nextSnow && <ForecastField icon={WiSnow} label='Havazás várható' time={forecast.nextSnow} />}
          {forecast.snowEnd && weather.data.snow && (
            <ForecastField icon={WiCloudy} label='Havazás vége' time={forecast.snowEnd} />
          )}
        </Widget>
      )}
      <Widget className='grid grid-cols-6 gap-3 p-10'>
        {weather.data.daily.map((daily) => (
          <div
            key={daily.timestamp}
            className='bg-white/50 backdrop-blur-sm shadow-md rounded-md pb-2 text-center flex flex-col items-center justify-between'
          >
            {daily.weather && <img src={daily.weather} alt='weather icon' />}
            <div>
              <p>{daily.temp.max}°</p>
              <p className='opacity-50'>{daily.temp.min}°</p>
            </div>
            <p className='text-center'>{formatHu(new Date(daily.timestamp * 1000), 'EEE')}</p>
          </div>
        ))}
      </Widget>
    </>
  );
}

interface ForecastFieldProps {
  icon: IconType;
  label: string;
  time: number;
}

function ForecastField({ icon, label, time }: ForecastFieldProps) {
  return (
    <div className='flex gap-5 items-center grow'>
      {icon({ className: 'text-white', size: 50 })}
      <div>
        <p className='text-inherit uppercase font-thin'>{label}</p>
        <p className='text-inherit text-4xl'>{formatHu(new Date(time * 1000), 'HH:mm')}</p>
      </div>
    </div>
  );
}
