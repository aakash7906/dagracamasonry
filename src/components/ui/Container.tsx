import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          size === 'default' && 'max-w-7xl',
          size === 'narrow' && 'max-w-4xl',
          size === 'wide' && 'max-w-[1400px]',
          size === 'full' && 'max-w-full',
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
