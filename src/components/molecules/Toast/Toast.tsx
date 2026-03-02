import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { toastStore, toast as toastFn } from './toast'
import type { ToastData, ToastPosition } from './toast'
import styles from './Toast.module.css'

/* ── Ícones ──────────────────────────────────── */

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
      <path fillRule="evenodd" d="M18 10A8 8 0 1 1 2 10a8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 16, height: 16 }}>
      <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  )
}

// Ícone de loading (spinner simples)
function LoadingIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ width: 16, height: 16, animation: 'toast-spin 0.7s linear infinite' }}
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2.5" strokeDasharray="33 11" strokeLinecap="round" />
    </svg>
  )
}

/* ── ToastItem ───────────────────────────────── */

const ICONS = {
  default:  null,
  success:  <CheckIcon />,
  error:    <ErrorIcon />,
  warning:  <AlertIcon />,
  info:     <InfoIcon />,
}

interface ToastItemProps {
  toast: ToastData
  index: number
  /** Máximo de toasts visíveis ao mesmo tempo. */
  visibleCount: number
  onDismiss: (id: number) => void
}

function ToastItem({ toast, index, visibleCount, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pausedRef = useRef(false)
  const remainingRef = useRef(toast.duration)
  const startedAtRef = useRef<number>(0)

  // Entrada: delay mínimo para acionar a animação CSS
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  const startTimer = useCallback(() => {
    if (toast.duration === Infinity || toast.loading) return
    startedAtRef.current = Date.now()
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(toast.id), 300) // aguarda animação de saída
    }, remainingRef.current)
  }, [toast.duration, toast.loading, toast.id, onDismiss])

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
      remainingRef.current -= Date.now() - startedAtRef.current
      pausedRef.current = true
    }
  }, [])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [startTimer, toast.loading])

  // role semântico: 'alert' para erros/warnings, 'status' para outros
  const role = toast.severity === 'error' || toast.severity === 'warning' ? 'alert' : 'status'

  const isHidden = index >= visibleCount
  const cssVars = {
    '--toast-index': index,
    '--toast-count': Math.min(visibleCount, 3),
  } as React.CSSProperties

  return (
    <div
      role={role}
      aria-live={role === 'status' ? 'polite' : undefined}
      aria-atomic="true"
      className={[
        styles.toast,
        styles[toast.severity],
        visible ? styles.enter : styles.exit,
        isHidden ? styles.stacked : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={cssVars}
      onMouseEnter={pauseTimer}
      onMouseLeave={() => { pausedRef.current = false; startTimer() }}
    >
      {/* Ícone */}
      <span className={[styles.icon, toast.loading ? styles.iconLoading : ''].filter(Boolean).join(' ')}>
        {toast.loading ? <LoadingIcon /> : ICONS[toast.severity]}
      </span>

      {/* Texto */}
      <div className={styles.body}>
        <span className={styles.message}>{toast.message}</span>
        {toast.description && (
          <span className={styles.description}>{toast.description}</span>
        )}
      </div>

      {/* Ação */}
      {toast.action && (
        <button
          type="button"
          className={styles.actionBtn}
          onClick={() => {
            toast.action?.onClick()
            onDismiss(toast.id)
          }}
        >
          {toast.action.label}
        </button>
      )}

      {/* Fechar */}
      {toast.dismissible && (
        <button
          type="button"
          aria-label="Fechar notificação"
          className={styles.closeBtn}
          onClick={() => {
            setVisible(false)
            setTimeout(() => onDismiss(toast.id), 300)
          }}
        >
          <XIcon />
        </button>
      )}
    </div>
  )
}

/* ── Toaster ─────────────────────────────────── */

export interface ToasterProps {
  /** Posição na tela. Padrão: 'bottom-right'. */
  position?: ToastPosition
  /** Máximo de toasts visíveis ao mesmo tempo (os demais ficam empilhados). Padrão: 3. */
  visibleToasts?: number
  /** Elemento DOM onde o portal será renderizado. Padrão: document.body. */
  container?: HTMLElement
}

export function Toaster({
  position = 'bottom-right',
  visibleToasts = 3,
  container,
}: ToasterProps) {
  const [toasts, setToasts] = useState<ToastData[]>(() => toastStore.toasts)

  useEffect(() => {
    return toastStore.subscribe(setToasts)
  }, [])

  const handleDismiss = useCallback((id: number) => {
    toastStore.dismiss(id)
  }, [])

  if (toasts.length === 0) return null

  const [posY, posX] = position.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right']

  const posClass = [
    posY === 'top' ? styles.top : styles.bottom,
    posX === 'left' ? styles.left : posX === 'center' ? styles.center : styles.right,
  ].join(' ')

  const viewport = (
    <div
      aria-label="Notificações"
      className={[styles.viewport, posClass].join(' ')}
    >
      {toasts.slice(0, visibleToasts + 2).map((t, index) => (
        <ToastItem
          key={t.id}
          toast={t}
          index={index}
          visibleCount={visibleToasts}
          onDismiss={handleDismiss}
        />
      ))}
    </div>
  )

  const target = container ?? (typeof document !== 'undefined' ? document.body : null)
  if (!target) return viewport

  return createPortal(viewport, target)
}

/* Re-exporta toast e tipos para conveniência */
export { toastFn as toast }
export type { ToastData, ToastPosition }
