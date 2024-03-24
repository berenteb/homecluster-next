import { useEffect, useState } from 'react';

import { Widget } from '@/components/widgets/base/widget.tsx';
import { formatHu } from '@/utils/common.utils.ts';

export function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Widget className='flex flex-col items-center justify-center'>
      <h2 className='mb-5'>{time.toLocaleTimeString()}</h2>
      <p>{formatHu(time, 'yyyy. MM. dd.')}</p>
      <p>{formatHu(time, 'EEEE')}</p>
    </Widget>
  );
}
