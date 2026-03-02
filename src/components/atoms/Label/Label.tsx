import styles from './Label.module.css'

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  required?: boolean
  disabled?: boolean
}

export function Label({
  children,
  required = false,
  disabled = false,
  ...props
}: LabelProps) {
  const classes = [
    styles.label,
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ')

  return (
    <label {...props} className={classes}>
      {children}
      {required && <span className={styles.required} aria-hidden="true">*</span>}
    </label>
  )
}
