import styles from './Card.module.css'

/* ── Card.Root ───────────────────────────────── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Habilita efeitos hover/focus e cursor pointer.
   * Use quando o card inteiro é clicável (ex: card de produto com link stretched).
   */
  interactive?: boolean
  children: React.ReactNode
}

export function Card({ interactive = false, children, className, ...props }: CardProps) {
  return (
    <div
      className={[styles.card, interactive ? styles.interactive : '', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Card.Header ─────────────────────────────── */

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}

/* ── Card.Title ──────────────────────────────── */

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
  /** Nível semântico do heading. Padrão: 3. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

export function CardTitle({ children, as: Tag = 'h3', className, ...props }: CardTitleProps) {
  return (
    <Tag className={[styles.title, className].filter(Boolean).join(' ')} {...(props as React.HTMLAttributes<HTMLElement>)}>
      {children}
    </Tag>
  )
}

/* ── Card.Description ────────────────────────── */

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function CardDescription({ children, className, ...props }: CardDescriptionProps) {
  return (
    <p className={[styles.description, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  )
}

/* ── Card.Content ────────────────────────────── */

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  /** Remove o padding interno. Útil para imagens full-bleed ou tabelas. */
  flush?: boolean
}

export function CardContent({ children, flush = false, className, ...props }: CardContentProps) {
  return (
    <div
      className={[styles.content, flush ? styles.flush : '', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Card.Action ─────────────────────────────── */

/**
 * Slot para ações no header (ex: menu de opções, botão de editar).
 * Posicionado no canto superior direito via CSS.
 */
export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardAction({ children, className, ...props }: CardActionProps) {
  return (
    <div className={[styles.action, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}

/* ── Card.Footer ─────────────────────────────── */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div className={[styles.footer, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
