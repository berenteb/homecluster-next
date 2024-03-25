import { useEffect } from 'react';

import { useSettingsContext } from '@/contexts/settings.context.tsx';
import { useWeather } from '@/hooks/queries/use-weather.ts';

export function useThemeChange() {
  const { darkMode, setDarkMode } = useSettingsContext();
  const weather = useWeather();
  const sunrise = weather.data?.sunrise;
  const sunset = weather.data?.sunset;

  useEffect(() => {
    if (sunrise && sunset) {
      const darkMode = Date.now() > sunset || Date.now() < sunrise;
      setDarkMode(darkMode);
    }
  }, [darkMode, setDarkMode, sunrise, sunset, weather.data]);
}
