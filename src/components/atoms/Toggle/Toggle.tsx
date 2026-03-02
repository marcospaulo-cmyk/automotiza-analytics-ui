import { useState } from 'react'
import clsx from 'clsx'
import styles from './Toggle.module.css'

export interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  name?: string
  value?: string
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  className?: string
  ref?: React.Ref<HTMLButtonElement>
}

export const Toggle = ({
  ref,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  name,
  value = 'on',
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className,
}: ToggleProps) => {
  const isControlled = controlledChecked !== undefined
  const [internalChecked, setInternalChecked] = useState(defaultChecked)

  const checked = isControlled ? controlledChecked! : internalChecked

  const toggleState = checked ? 'checked' : 'unchecked'

  const wrapperClassName = clsx(
    styles.wrapper,
    disabled && styles.disabled,
    className,
  )

  const syncInternalState = (next: boolean) => {
    if (!isControlled) setInternalChecked(next)
  }

  const handleClick = () => {
    if (disabled) return
    const next = !checked
    syncInternalState(next)
    onChange?.(next)
  }

  return (
    <span className={wrapperClassName}>
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onClick={handleClick}
        className={styles.button}
        data-state={toggleState}
      >
        <span className={styles.track} data-state={toggleState}>
          <span className={styles.thumb} />
        </span>
      </button>

      {name && <input type="hidden" name={name} value={checked ? value : 'off'} />}
    </span>
  )
}