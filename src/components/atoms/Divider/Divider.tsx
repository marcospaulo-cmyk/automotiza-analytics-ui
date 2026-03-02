import styles from './Divider.module.css'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps {
  orientation?: DividerOrientation
  decorative?: boolean
  label?: string
  className?: string
}

export function Divider({
  orientation = 'horizontal',
  decorative = true,
  label,
  className,
}: DividerProps) {
  // Horizontal with text label
  if (label && orientation === 'horizontal') {
    return (
      <div
        role={decorative ? 'presentation' : 'separator'}
        aria-label={!decorative ? label : undefined}
        aria-hidden={decorative ? true : undefined}
        className={[styles.divider, styles.withLabel, className].filter(Boolean).join(' ')}
      >
        <span aria-hidden="true" className={styles.labelText}>
          {label}
        </span>
      </div>
    )
  }

  // Vertical
  if (orientation === 'vertical') {
    return (
      <div
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={!decorative ? 'vertical' : undefined}
        aria-hidden={decorative ? true : undefined}
        className={[styles.divider, styles.vertical, className].filter(Boolean).join(' ')}
      />
    )
  }

  // Horizontal (default) — <hr> has implicit role="separator"
  return (
    <hr
      aria-hidden={decorative ? true : undefined}
      className={[styles.divider, className].filter(Boolean).join(' ')}
    />
  )
}
