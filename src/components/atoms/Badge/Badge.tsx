import styles from './Badge.module.css'

export type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'info'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends React.ComponentPropsWithRef<'span'> {
  label: string
  variant?: BadgeVariant
  size?: BadgeSize
  pill?: boolean
}

export function Badge({
  ref,
  label,
  variant = 'primary',
  size = 'md',
  pill = true,
  className,
  ...props
}: BadgeProps) {
  const classes = [
    styles.badge,
    styles[variant],
    styles[size],
    pill ? styles.pill : '',
    className,
  ].filter(Boolean).join(' ')

  return <span {...props} ref={ref} className={classes}>{label}</span>
}
