import { useEffect, useState } from 'react';

import { Widget } from '@/components/widgets/widget.tsx';
import { formatHu } from '@/utils/common.utils.ts';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let greetingText = 'Jó napot!';
  const hours = time.getHours();
  if (hours < 6 || hours > 22) greetingText = 'Jó éjszakát!';
  else if (hours < 11 && hours >= 6) greetingText = 'Jó reggelt!';
  else if (hours > 18) greetingText = 'Jó estét!';

  return (
    <Widget className='flex flex-col items-center justify-center'>
      <p className='mb-5 uppercase font-thin'>{greetingText}</p>
      <h2 className='mb-5'>{time.toLocaleTimeString()}</h2>
      <p>{formatHu(time, 'yyyy. MM. dd.')}</p>
      <p>{formatHu(time, 'EEEE')}</p>
    </Widget>
  );
}
