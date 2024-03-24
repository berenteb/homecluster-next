import { Widget } from '@/components/widgets/base/widget.tsx';
import { Clock } from '@/components/widgets/clock.tsx';

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
        <Widget>
          <h2>Widget 1</h2>
          <p>Widget 1</p>
        </Widget>
        <Widget />
        <Widget />
        <Widget />
        <Widget />
      </div>
    </div>
  );
}
