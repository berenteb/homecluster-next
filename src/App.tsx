import { AqiWidget } from '@/components/widgets/aqi.tsx';
import { Clock } from '@/components/widgets/clock.tsx';
import { WeatherWidget } from '@/components/widgets/weather.tsx';
import { WeatherCamWidget } from '@/components/widgets/weather-cam.tsx';
import { useSettingsContext } from '@/contexts/settings.context.tsx';
import { useThemeChange } from '@/hooks/use-theme-change.ts';

export function App() {
  useThemeChange();
  const { backgroundUrl } = useSettingsContext();
  return (
    <div
      className='bg-center bg-cover'
      style={{
        backgroundImage: `url("${backgroundUrl}")`,
      }}
    >
      <div className='grid grid-cols-3 grid-rows-3 p-10 gap-10 h-screen w-screen bg-slate-50/50 dark:bg-slate-900/50'>
        <Clock />
        <AqiWidget />
        <WeatherCamWidget />
        <WeatherWidget />
      </div>
    </div>
  );
}
