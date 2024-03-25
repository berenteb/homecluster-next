import { HTMLAttributes } from 'react';

import { cn } from '@/utils/common.utils.ts';

export function Widget({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-white/50 dark:bg-slate-900/50 backdrop-blur-md p-20 rounded-lg shadow-md flex-1', className)}
      {...props}
    />
  );
}
