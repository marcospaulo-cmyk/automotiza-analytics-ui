import styles from './Skeleton.module.css'

export type SkeletonAnimation = 'wave' | 'pulse' | false

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Largura do skeleton. Padrão: 100%. */
  width?: string | number
  /** Altura do skeleton. Padrão: 1em. */
  height?: string | number
  /** Raio das bordas. Use 'circle' para avatares. */
  radius?: 'default' | 'pill' | 'circle'
  /** Tipo de animação. 'wave' = shimmer translacional; 'pulse' = fade. Padrão: 'wave'. */
  animation?: SkeletonAnimation
  /**
   * Cria múltiplas linhas em pilha.
   * A última linha recebe 70% de largura por padrão para imitar parágrafo real.
   */
  lines?: number
}

export function Skeleton({
  width,
  height,
  radius = 'default',
  animation = 'wave',
  lines,
  className,
  style,
  ...props
}: SkeletonProps) {
  // Modo multi-linha
  if (lines && lines > 1) {
    return (
      <span className={styles.group} aria-hidden="true" role="presentation">
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton
            key={i}
            width={i === lines - 1 ? '70%' : width}
            height={height}
            radius={radius}
            animation={animation}
            className={className}
            style={i === lines - 1 ? undefined : style}
          />
        ))}
      </span>
    )
  }

  const cssVars = {
    '--sk-width': width != null ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    '--sk-height': height != null ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  } as React.CSSProperties

  const classes = [
    styles.root,
    radius === 'pill' ? styles.pill : radius === 'circle' ? styles.circle : undefined,
    animation === 'wave' ? styles.wave : animation === 'pulse' ? styles.pulse : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      aria-hidden="true"
      role="presentation"
      className={classes}
      style={{ ...cssVars, ...style }}
      {...props}
    />
  )
}
