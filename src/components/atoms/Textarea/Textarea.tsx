import { useId, useState } from 'react'
import styles from './Textarea.module.css'

export interface TextareaProps
  extends Omit<React.ComponentPropsWithRef<'textarea'>, 'placeholder' | 'rows'> {
  label: string
  error?: string
  hint?: string
  minRows?: number
  maxRows?: number
  autoResize?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  showCharCount?: boolean
}

export function Textarea({
  ref,
  label,
  error,
  hint,
  minRows = 3,
  maxRows,
  autoResize = true,
  resize,
  showCharCount = false,
  disabled = false,
  maxLength,
  defaultValue,
  value,
  onChange,
  onFocus,
  onBlur,
  id: externalId,
  ...props
}: TextareaProps) {
  const autoId = useId()
  const id = externalId ?? autoId
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const countId = `${id}-count`

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState(String(defaultValue ?? ''))

  const currentValue = isControlled ? String(value ?? '') : internalValue
  const hasValue = currentValue.length > 0

  const [focused, setFocused] = useState(false)
  const floated = focused || hasValue

  const charCount = currentValue.length

  const wrapperClasses = [
    styles.wrapper,
    autoResize ? styles.autoResize : '',
    error ? styles.hasError : '',
    focused ? styles.focused : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  const describedBy = [hint ? hintId : '', error ? errorId : '', showCharCount ? countId : '']
    .filter(Boolean)
    .join(' ') || undefined

  const cssVars = {
    '--min-rows': minRows,
    ...(maxRows ? { '--max-rows': maxRows } : {}),
    ...(resize ? { '--textarea-resize': resize } : {}),
  } as React.CSSProperties

  return (
    <div className={styles.root}>
      <div
        className={wrapperClasses}
        style={cssVars}
        {...(autoResize ? { 'data-replicated-value': currentValue } : {})}
      >
        <label
          htmlFor={id}
          className={[styles.label, floated ? styles.floated : ''].filter(Boolean).join(' ')}
        >
          {label}
        </label>

        <textarea
          {...props}
          ref={ref}
          id={id}
          className={styles.textarea}
          disabled={disabled}
          maxLength={maxLength}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
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
        />
      </div>

      <div className={styles.footer}>
        <span>
          {hint && !error && (
            <span id={hintId} className={styles.hint}>
              {hint}
            </span>
          )}
          {error && (
            <span id={errorId} role="alert" className={styles.error}>
              {error}
            </span>
          )}
        </span>

        {showCharCount && (
          <span id={countId} className={styles.charCount} aria-live="polite">
            {maxLength ? `${charCount}/${maxLength}` : charCount}
          </span>
        )}
      </div>
    </div>
  )
}
