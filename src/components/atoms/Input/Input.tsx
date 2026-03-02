import { useId, useState } from 'react'
import styles from './Input.module.css'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'search' | 'url'

export interface InputProps extends Omit<React.ComponentPropsWithRef<'input'>, 'type' | 'placeholder' | 'size'> {
  label: string
  type?: InputType
  error?: string
  suffix?: React.ReactNode
}

export function Input({
  ref,
  label,
  type = 'text',
  error,
  suffix,
  disabled = false,
  defaultValue,
  value,
  onChange,
  onFocus,
  onBlur,
  id: externalId,
  ...props
}: InputProps) {
  const autoId = useId()
  const id = externalId ?? autoId
  const errorId = `${id}-error`

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')

  const currentValue = isControlled ? value : internalValue
  const hasValue = String(currentValue ?? '').length > 0

  const [focused, setFocused] = useState(false)

  /**
   * Autofill detection via CSS animation trick.
   * When the browser autofills the input, the :-webkit-autofill animation fires
   * before any React onChange event — keeping the label correctly floated.
   */
  const [autofilled, setAutofilled] = useState(false)

  const floated = focused || hasValue || autofilled

  const wrapperClasses = [
    styles.wrapper,
    error ? styles.hasError : '',
    focused ? styles.focused : '',
    disabled ? styles.disabled : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={styles.root}>
      <div className={wrapperClasses}>
        <label
          htmlFor={id}
          className={[styles.label, floated ? styles.floated : ''].filter(Boolean).join(' ')}
        >
          {label}
        </label>

        <input
          {...props}
          ref={ref}
          id={id}
          type={type}
          className={styles.input}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          value={isControlled ? value : internalValue}
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value)
            onChange?.(e)
          }}
          onFocus={(e) => {
            setFocused(true)
            onFocus?.(e)
          }}
          onBlur={(e) => {
            setFocused(false)
            onBlur?.(e)
          }}
          onAnimationStart={(e) => {
            // 'onAutoFillStart' fires when the browser applies autofill
            // 'onAutoFillCancel' fires when autofill is cleared
            setAutofilled(e.animationName === 'onAutoFillStart')
          }}
        />

        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>

      {error && (
        <span id={errorId} role="alert" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}
