import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  ref,
  children,
  variant = 'primary',
  size = 'md',
  // Explicit default prevents accidental form submission when inside a <form>
  type = 'button',
  disabled = false,
  onClick,
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
  ].join(' ')

  return (
    <button
      {...props}
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
