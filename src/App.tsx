import { AqiWidget } from '@/components/widgets/aqi.tsx';
import { Clock } from '@/components/widgets/clock.tsx';
import { Widget } from '@/components/widgets/widget.tsx';

export function App() {
  return (
    <div
      className='bg-center bg-cover'
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1631679706909-1844bbd07221")',
      }}
    >
      <div className='grid grid-cols-3 grid-rows-3 p-10 gap-10 h-screen w-screen bg-slate-50/50'>
        <Clock />
        <AqiWidget />
        <Widget />
        <Widget />
        <Widget />
        <Widget />
      </div>
    </div>
  );
}
