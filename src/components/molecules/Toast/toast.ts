/**
 * Toast store — observer singleton sem React Context.
 *
 * Inspirado na arquitetura do Sonner:
 * - API imperativa: `toast()`, `toast.success()`, `toast.error()`, etc.
 * - Nenhuma dependência de árvore React — funciona fora de componentes.
 * - `<Toaster>` subscreve ao store via `toastStore.subscribe()`.
 */

export type ToastSeverity = 'default' | 'success' | 'error' | 'warning' | 'info'
export type ToastPosition =
  | 'top-left'    | 'top-center'    | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

export interface ToastData {
  id: number
  message: string
  description?: string
  severity: ToastSeverity
  /** Duração em ms até auto-dismiss. `Infinity` para persistente. Padrão: 4000. */
  duration: number
  /** Se verdadeiro, exibe botão de fechar. */
  dismissible: boolean
  /** Ação opcional (ex: "Desfazer"). */
  action?: {
    label: string
    onClick: () => void
  }
  /** Indicador de loading (usado por toast.promise). */
  loading?: boolean
}

export type ToastOptions = Partial<
  Pick<ToastData, 'description' | 'duration' | 'dismissible' | 'action'>
>

/* ── Store interno ───────────────────────────── */

let _counter = 0
let _toasts: ToastData[] = []
const _listeners = new Set<(toasts: ToastData[]) => void>()

function _dispatch(toasts: ToastData[]) {
  _toasts = toasts
  _listeners.forEach((fn) => fn(toasts))
}

function _add(data: Omit<ToastData, 'id'>): number {
  const id = ++_counter
  _dispatch([{ ...data, id }, ..._toasts])
  return id
}

function _update(id: number, patch: Partial<ToastData>) {
  _dispatch(_toasts.map((t) => (t.id === id ? { ...t, ...patch } : t)))
}

function _remove(id: number) {
  _dispatch(_toasts.filter((t) => t.id !== id))
}

/* ── API pública ─────────────────────────────── */

function createToast(message: string, options?: ToastOptions & { severity?: ToastSeverity }): number {
  return _add({
    message,
    description: options?.description,
    severity: options?.severity ?? 'default',
    duration: options?.duration ?? 4000,
    dismissible: options?.dismissible ?? true,
    action: options?.action,
    loading: false,
  })
}

function success(message: string, options?: ToastOptions) {
  return createToast(message, { ...options, severity: 'success' })
}

function error(message: string, options?: ToastOptions) {
  return createToast(message, { ...options, severity: 'error', duration: options?.duration ?? 6000 })
}

function warning(message: string, options?: ToastOptions) {
  return createToast(message, { ...options, severity: 'warning' })
}

function info(message: string, options?: ToastOptions) {
  return createToast(message, { ...options, severity: 'info' })
}

function loading(message: string, options?: ToastOptions) {
  return _add({
    message,
    description: options?.description,
    severity: 'default',
    duration: Infinity,
    dismissible: false,
    action: options?.action,
    loading: true,
  })
}

/**
 * Exibe um toast de loading que se resolve automaticamente em sucesso ou erro.
 *
 * @example
 * toast.promise(fetch('/api/save'), {
 *   loading: 'Salvando...',
 *   success: 'Salvo com sucesso!',
 *   error: (err) => `Erro: ${err.message}`,
 * })
 */
function promise<T>(
  promiseFn: Promise<T>,
  messages: {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((err: unknown) => string)
  },
  options?: ToastOptions,
): Promise<T> {
  const id = _add({
    message: messages.loading,
    severity: 'default',
    duration: Infinity,
    dismissible: false,
    loading: true,
  })

  promiseFn
    .then((data) => {
      const msg = typeof messages.success === 'function' ? messages.success(data) : messages.success
      _update(id, {
        message: msg,
        severity: 'success',
        duration: options?.duration ?? 4000,
        dismissible: true,
        loading: false,
      })
      setTimeout(() => _remove(id), options?.duration ?? 4000)
    })
    .catch((err) => {
      const msg = typeof messages.error === 'function' ? messages.error(err) : messages.error
      _update(id, {
        message: msg,
        severity: 'error',
        duration: options?.duration ?? 6000,
        dismissible: true,
        loading: false,
      })
      setTimeout(() => _remove(id), options?.duration ?? 6000)
    })

  return promiseFn
}

function dismiss(id?: number) {
  if (id == null) {
    _dispatch([])
  } else {
    _remove(id)
  }
}

/* ── Store (para uso interno do Toaster) ─────── */

export const toastStore = {
  get toasts() { return _toasts },
  subscribe(listener: (toasts: ToastData[]) => void) {
    _listeners.add(listener)
    return () => _listeners.delete(listener)
  },
  dismiss: _remove,
}

/* ── Função principal exportada ──────────────── */

export const toast = Object.assign(createToast, {
  success,
  error,
  warning,
  info,
  loading,
  promise,
  dismiss,
})
