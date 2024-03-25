import { useEffect, useMemo, useState } from 'react';

import { Widget } from '@/components/widgets/widget.tsx';

const weatherImageSrc = 'https://ha5kfu.hu/idokep/kamera.php';

export function WeatherCamWidget() {
  const [camId, setCamId] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCamId((prev) => (prev % 2) + 1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const src = useMemo(() => {
    const url = new URL(weatherImageSrc);
    url.searchParams.set('id', camId.toString());
    url.searchParams.set('t', new Date().getTime().toString());
    return url.toString();
  }, [camId]);

  return (
    <Widget className='p-0 overflow-hidden'>
      <img
        className='object-center h-full w-full object-cover'
        src={src}
        alt='Nem sikerült betölteni az időjárás kamera képet'
      />
    </Widget>
  );
}
