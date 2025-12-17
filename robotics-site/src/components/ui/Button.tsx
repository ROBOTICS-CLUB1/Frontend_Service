import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary/90',
  secondary:
    'bg-accent text-primary shadow-soft hover:shadow-lg hover:-translate-y-0.5 hover:bg-accent/90',
  ghost:
    'border border-slate-200 text-text-primary hover:border-accent hover:text-primary/90 hover:-translate-y-0.5',
}

export function Button({
  children,
  className,
  variant = 'primary',
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

