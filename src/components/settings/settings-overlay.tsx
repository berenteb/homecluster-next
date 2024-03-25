import { zodResolver } from '@hookform/resolvers/zod';
import { MouseEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { FiSettings } from 'react-icons/fi';
import { z } from 'zod';

import { Widget } from '@/components/widgets/widget.tsx';
import { useSettingsContext } from '@/contexts/settings.context.tsx';
import { cn } from '@/utils/common.utils.ts';

interface SettingsForm {
  backgroundUrl: string;
  lat: string;
  lon: string;
}

const formSchema = z.object({
  backgroundUrl: z.string().url(),
  lat: z.string().regex(/^\d+(\.\d+)?$/),
  lon: z.string().regex(/^\d+(\.\d+)?$/),
});

export function SettingsOverlay() {
  const {
    settingsOverlayVisible,
    setSettingsOverlayVisible,
    backgroundUrl,
    setBackgroundUrl,
    staticCoordinates,
    setStaticCoordinates,
  } = useSettingsContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SettingsForm>({
    defaultValues: {
      backgroundUrl: backgroundUrl,
      lat: staticCoordinates.lat.toString(),
      lon: staticCoordinates.lon.toString(),
    },
    resolver: zodResolver(formSchema),
  });

  const onOpen = () => {
    setSettingsOverlayVisible(true);
  };

  const onClose: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      setSettingsOverlayVisible(false);
    }
  };

  const onSubmit = handleSubmit((data) => {
    setBackgroundUrl(data.backgroundUrl);
    setStaticCoordinates({ lat: parseFloat(data.lat), lon: parseFloat(data.lon) });
    setSettingsOverlayVisible(false);
  });

  const onCancel = () => {
    reset({
      backgroundUrl,
      lat: staticCoordinates.lat.toString(),
      lon: staticCoordinates.lon.toString(),
    });
    setSettingsOverlayVisible(false);
  };

  return (
    <>
      <div
        onClick={onOpen}
        className='absolute bottom-0 right-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-5 rounded-tl-lg shadow-md text-gray-700 dark:text-gray-100 translate-x-[50%] translate-y-[50%] hover:translate-x-0 hover:translate-y-0 cursor-pointer transition-transform'
      >
        <FiSettings size={20} />
      </div>
      <div
        onClick={onClose}
        className={cn(
          'bg-slate-900/50 absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center shadow-lg',
          {
            hidden: !settingsOverlayVisible,
          }
        )}
      >
        <Widget className='w-full max-w-fit panel'>
          <form onSubmit={onSubmit}>
            <h2>Beállítások</h2>
            <label htmlFor='backgroundUrl'>Háttérkép URL</label>
            <input
              id='backgroundUrl'
              type='text'
              {...register('backgroundUrl')}
              className={cn({
                invalid: errors.backgroundUrl,
              })}
            />
            {errors.backgroundUrl && <p className='text-red-500 text-sm'>Hibás URL</p>}

            <label htmlFor='lat'>Szélességi fok</label>
            <input
              id='lat'
              placeholder='47.473'
              {...register('lat')}
              className={cn({
                invalid: errors.lat,
              })}
            />
            {errors.lat && <p className='text-red-500 text-sm'>Hibás szélességi fok</p>}

            <label htmlFor='lon'>Hosszúsági fok</label>
            <input
              id='lon'
              placeholder='19.053'
              {...register('lon')}
              className={cn({
                invalid: errors.lon,
              })}
            />
            {errors.lon && <p className='text-red-500 text-sm'>Hibás hosszúsági fok</p>}

            <div className='flex mt-5 justify-between'>
              <button onClick={onCancel} className='btn-outline'>
                Mégse
              </button>
              <button type='submit'>Mentés</button>
            </div>
          </form>
        </Widget>
      </div>
    </>
  );
}
