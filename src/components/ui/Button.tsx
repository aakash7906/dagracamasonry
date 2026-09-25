import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-amber-600 text-white shadow hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-stone-300 bg-background shadow-sm hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-100',
        secondary:
          'bg-stone-100 text-stone-900 shadow-sm hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700',
        ghost: 'hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-100',
        link: 'text-amber-600 underline-offset-4 hover:underline dark:text-amber-400',
        masonry:
          'bg-stone-900 text-amber-400 border border-amber-500/30 hover:border-amber-500 hover:bg-stone-800 hover:shadow-lg hover:shadow-amber-500/10 dark:bg-stone-950 dark:text-amber-400 dark:border-amber-500/40',
      },
      size: {
        default: 'h-10 px-5 py-2.5',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8 text-base font-semibold',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
