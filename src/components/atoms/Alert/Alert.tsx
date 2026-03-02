import styles from './Alert.module.css'

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error'

/* ── Ícones inline (sem dependência externa) ─── */

const icons: Record<AlertSeverity, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  ),
}

/* ── Sub-componentes ─────────────────────────── */

export function AlertTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={[styles.title, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  )
}

export function AlertDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={[styles.description, className].filter(Boolean).join(' ')} {...props}>
      {children}
    </p>
  )
}

/* ── Alert principal ─────────────────────────── */

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Severidade do alerta.
   * Automaticamente seleciona `role`:
   * - 'error' | 'warning' → `role="alert"` (interrompe screen readers imediatamente)
   * - 'info' | 'success'  → `role="status"` (anuncia na próxima pausa)
   */
  severity?: AlertSeverity
  /**
   * Slot de ícone. Se omitido, usa o ícone padrão da severidade.
   * Passe `false` para suprimir o ícone completamente.
   */
  icon?: React.ReactNode | false
  /** Exibe botão de fechar. */
  dismissible?: boolean
  /** Chamado quando o usuário clica em fechar. */
  onDismiss?: () => void
  children?: React.ReactNode
}

export function Alert({
  severity = 'info',
  icon,
  dismissible = false,
  onDismiss,
  children,
  className,
  ...props
}: AlertProps) {
  // WAI-ARIA: 'alert' interrompe screen readers (erros/avisos urgentes);
  // 'status' anuncia sem interromper (info/sucesso).
  const role = severity === 'error' || severity === 'warning' ? 'alert' : 'status'

  const resolvedIcon = icon === false ? null : (icon ?? icons[severity])

  return (
    <div
      role={role}
      aria-live={role === 'status' ? 'polite' : undefined}
      className={[styles.root, styles[severity], className].filter(Boolean).join(' ')}
      {...props}
    >
      {resolvedIcon && <span className={styles.icon}>{resolvedIcon}</span>}

      <div className={styles.content}>{children}</div>

      {dismissible && (
        <button
          type="button"
          aria-label="Fechar alerta"
          onClick={onDismiss}
          className={styles.dismiss}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      )}
    </div>
  )
}
