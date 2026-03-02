import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<React.ComponentPropsWithRef<'input'>, 'onChange' | 'type'> {
  children?: React.ReactNode
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  ref,
  children,
  disabled = false,
  onChange,
  ...props
}: CheckboxProps) {
  const wrapperClasses = [
    styles.wrapper,
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ')

  return (
    <label className={wrapperClasses}>
      <input
        {...props}
        ref={ref}
        type="checkbox"
        className={styles.input}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.box} aria-hidden="true">
        <svg className={styles.check} viewBox="0 0 12 9" fill="none">
          <path
            d="M1 4L4.5 7.5L11 1"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children && <span className={styles.label}>{children}</span>}
    </label>
  )
}
