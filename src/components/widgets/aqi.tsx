import { FiWind } from 'react-icons/fi';

import { Widget } from '@/components/widgets/widget.tsx';
import { useAqi } from '@/hooks/queries/use-aqi.ts';
import { AqiValueLabels } from '@/utils/aqi.utils.ts';
import { cn } from '@/utils/common.utils.ts';

export function AqiWidget() {
  const aqi = useAqi();
  const aqiValue = aqi.data?.list[0];
  if (!aqiValue) {
    return null;
  }
  return (
    <Widget
      className={cn('flex items-center justify-between bg-gradient-to-br', {
        'from-teal-300 to-teal-600 text-white': aqiValue.main.aqi === 1,
        'from-green-300 to-green-600 text-white': aqiValue.main.aqi === 2,
        'from-yellow-300 to-yellow-600 text-gray-700': aqiValue.main.aqi === 3,
        'from-red-300 to-red-600 text-white': aqiValue.main.aqi === 4,
        'from-purple-300 to-purple-600 text-white': aqiValue.main.aqi === 5,
      })}
    >
      <div className='space-y-5 justify-center'>
        <p className='text-inherit uppercase font-thin'>Levegőminőség</p>
        <h2 className='text-inherit'>
          {Math.round(aqiValue.components.pm2_5) || '?'}
          <span className='text-lg'> µg/m³ (PM2.5)</span>
        </h2>
        <p className='text-inherit'>{AqiValueLabels[aqiValue.main.aqi]}</p>
      </div>
      <FiWind size={100} />
    </Widget>
  );
}
