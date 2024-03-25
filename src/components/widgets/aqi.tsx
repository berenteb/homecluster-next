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
        'text-white from-teal-300 to-teal-600 dark:from-teal-600 dark:to-teal-900': aqiValue.main.aqi === 1,
        'text-white from-emerald-300 to-emerald-600 dark:from-emerald-600 dark:to-emerald-900': aqiValue.main.aqi === 2,
        'text-gray-700 dark:text-white from-yellow-300 to-yellow-600 dark:from-yellow-600 dark:to-yellow-900':
          aqiValue.main.aqi === 3,
        'text-white from-red-300 to-red-600 dark:from-red-600 dark:to-red-900': aqiValue.main.aqi === 4,
        'text-white from-purple-300 to-purple-600 dark:from-purple-600 dark:to-purple-900': aqiValue.main.aqi === 5,
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
