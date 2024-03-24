import { HTMLAttributes } from 'react';

import { cn } from '@/utils/common.utils.ts';

export function Widget({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-white backdrop-blur-md bg-opacity-50 p-5 rounded-lg shadow-md flex-1', className)}
      {...props}
    />
  );
}
