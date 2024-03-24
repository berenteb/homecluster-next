import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { OWM_API_KEY } from '@/config/environment.ts';
import { useSettingsContext } from '@/contexts/settings.context.tsx';
import { AqiData } from '@/types/aqi.type.ts';

const url = new URL('https://api.openweathermap.org/data/2.5/air_pollution');

export function useAqi() {
  const { staticCoordinates } = useSettingsContext();
  return useQuery({
    queryKey: ['aqi'],
    queryFn: async () => {
      url.searchParams.set('lat', staticCoordinates.lat.toString());
      url.searchParams.set('lon', staticCoordinates.lon.toString());
      url.searchParams.set('appid', OWM_API_KEY);
      const response = await axios.get<AqiData>(url.toString());
      return response.data;
    },
  });
}
