import styles from './Grid.module.css'

/* ── Tipos compartilhados ────────────────────── */

export type SpacingToken = 0 | 2 | 4 | 6 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64

/** Valor responsivo: número fixo ou mapa de breakpoints. */
export type ResponsiveValue<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T }

function resolveGap(value?: SpacingToken | string): string | undefined {
  if (value == null) return undefined
  if (typeof value === 'string') return value
  return `${value}px`
}

/* ── SimpleGrid ──────────────────────────────── */

/**
 * Grade CSS responsiva com número de colunas configurável por breakpoint.
 *
 * @example
 * <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} gap={24}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </SimpleGrid>
 */

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de colunas por breakpoint.
   * Número fixo → mesma quantidade em todos os tamanhos.
   * Objeto → responsive: { base, sm, md, lg, xl }.
   */
  cols?: ResponsiveValue<number>
  /** Gap uniforme (px ou token). */
  gap?: SpacingToken | string
  /** Gap horizontal. Sobrescreve `gap` para o eixo X. */
  gapX?: SpacingToken | string
  /** Gap vertical. Sobrescreve `gap` para o eixo Y. */
  gapY?: SpacingToken | string
  /**
   * Estratégia de auto-fill:
   * - 'auto-fill': mantém colunas vazias ao final (grid não encolhe)
   * - 'auto-fit': colunas vazias são colapsadas (itens esticam)
   * Padrão: 'auto-fill'
   */
  autoFlow?: 'auto-fill' | 'auto-fit'
  /** Largura mínima de coluna quando `cols` não é definido. Ex: '200px'. */
  minColWidth?: string
  children: React.ReactNode
}

export function SimpleGrid({
  cols,
  gap,
  gapX,
  gapY,
  autoFlow = 'auto-fill',
  minColWidth,
  children,
  className,
  style,
  ...props
}: SimpleGridProps) {
  const resolvedGap = resolveGap(gap)
  const resolvedGapX = resolveGap(gapX) ?? resolvedGap
  const resolvedGapY = resolveGap(gapY) ?? resolvedGap

  // Colunas responsivas via CSS custom properties + classes
  let colsStyle: React.CSSProperties = {}
  let colsClass = ''

  if (typeof cols === 'number') {
    colsStyle = {
      '--sg-cols': cols,
      '--sg-cols-sm': cols,
      '--sg-cols-md': cols,
      '--sg-cols-lg': cols,
      '--sg-cols-xl': cols,
    } as React.CSSProperties
    colsClass = styles.colsFixed
  } else if (cols && typeof cols === 'object') {
    colsStyle = {
      '--sg-cols': cols.base ?? 1,
      '--sg-cols-sm': cols.sm ?? cols.base ?? 1,
      '--sg-cols-md': cols.md ?? cols.sm ?? cols.base ?? 1,
      '--sg-cols-lg': cols.lg ?? cols.md ?? cols.sm ?? cols.base ?? 1,
      '--sg-cols-xl': cols.xl ?? cols.lg ?? cols.md ?? cols.sm ?? cols.base ?? 1,
    } as React.CSSProperties
    colsClass = styles.colsFixed
  } else if (minColWidth) {
    colsStyle = {
      '--sg-min-col': minColWidth,
      '--sg-auto-flow': autoFlow,
    } as React.CSSProperties
    colsClass = styles.colsAuto
  }

  const cssVars = {
    '--sg-gap-x': resolvedGapX,
    '--sg-gap-y': resolvedGapY,
    ...colsStyle,
  } as React.CSSProperties

  return (
    <div
      className={[styles.grid, colsClass, className].filter(Boolean).join(' ')}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Stack ───────────────────────────────────── */

/**
 * Layout em coluna (ou linha) com gap uniforme.
 * Abstração de `display:flex` com direção e gap configuráveis.
 */

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direção do eixo. Padrão: 'column'. */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  /** Espaçamento entre filhos (px). Padrão: 16. */
  gap?: SpacingToken | string
  /** Alinhamento do eixo cruzado. */
  align?: React.CSSProperties['alignItems']
  /** Justificação do eixo principal. */
  justify?: React.CSSProperties['justifyContent']
  /** Permite quebra de linha. */
  wrap?: boolean
  children: React.ReactNode
}

export function Stack({
  direction = 'column',
  gap = 16,
  align,
  justify,
  wrap = false,
  children,
  className,
  style,
  ...props
}: StackProps) {
  const cssVars = {
    '--stack-direction': direction,
    '--stack-gap': resolveGap(gap),
    '--stack-align': align,
    '--stack-justify': justify,
    '--stack-wrap': wrap ? 'wrap' : 'nowrap',
  } as React.CSSProperties

  return (
    <div
      className={[styles.stack, className].filter(Boolean).join(' ')}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Container ───────────────────────────────── */

/**
 * Wrapper de largura máxima com padding lateral e centralização.
 * Usa o token `--layout-width-max-container` por padrão.
 */

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Largura máxima. Padrão: token `--layout-width-max-container` (1072px).
   * Valores: 'sm' (640px), 'md' (768px), 'lg' (1024px), 'xl' (1280px), 'full' (100%)
   * ou qualquer valor CSS.
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | string
  /** Padding horizontal (px). Padrão: 16. */
  px?: SpacingToken | string
  children: React.ReactNode
}

const containerWidths: Record<string, string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  full: '100%',
}

export function Container({
  maxWidth,
  px = 16,
  children,
  className,
  style,
  ...props
}: ContainerProps) {
  const maxW = maxWidth
    ? containerWidths[maxWidth] ?? maxWidth
    : 'var(--layout-width-max-container)'

  const cssVars = {
    '--container-max-width': maxW,
    '--container-px': resolveGap(px),
  } as React.CSSProperties

  return (
    <div
      className={[styles.container, className].filter(Boolean).join(' ')}
      style={{ ...cssVars, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
