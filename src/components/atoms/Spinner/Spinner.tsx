import styles from './Spinner.module.css'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface SpinnerProps {
  size?: SpinnerSize
  label?: string
  'aria-hidden'?: boolean | 'true' | 'false'
  className?: string
}

const SIZES: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

// viewBox 0 0 20 20, r=7, stroke=2
// circumference = 2π × 7 ≈ 43.98 → 75% arc ≈ 33, 25% gap ≈ 11
const DASHARRAY = '33 11'

export function Spinner({
  size = 'md',
  label = 'Carregando',
  'aria-hidden': ariaHidden,
  className,
}: SpinnerProps) {
  const px = SIZES[size]
  const isDecorative = ariaHidden === true || ariaHidden === 'true'

  const svg = (
    <svg
      aria-hidden="true"
      className={[styles.spinner, styles[size], className].filter(Boolean).join(' ')}
      viewBox="0 0 20 20"
      fill="none"
      width={px}
      height={px}
    >
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={DASHARRAY}
        strokeLinecap="round"
      />
    </svg>
  )

  if (isDecorative) return svg

  return (
    <span role="status" className={[styles.root, className].filter(Boolean).join(' ')}>
      <svg
        aria-hidden="true"
        className={[styles.spinner, styles[size]].filter(Boolean).join(' ')}
        viewBox="0 0 20 20"
        fill="none"
        width={px}
        height={px}
      >
        <circle
          cx="10"
          cy="10"
          r="7"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={DASHARRAY}
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </span>
  )
}
