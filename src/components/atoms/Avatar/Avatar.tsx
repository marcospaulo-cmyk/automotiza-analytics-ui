import { useState, useEffect, useRef } from 'react'
import styles from './Avatar.module.css'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type ImageStatus = 'idle' | 'loading' | 'loaded' | 'error'

/* ── Hooks internos ──────────────────────────── */

/**
 * Rastreia o status de carregamento de uma URL de imagem.
 * Usa new Image() para detectar carga/erro antes do render.
 * Padrão Radix/Radix Themes useImageLoadingStatus.
 */
function useImageStatus(src?: string): ImageStatus {
  const [status, setStatus] = useState<ImageStatus>(src ? 'loading' : 'idle')
  const srcRef = useRef(src)

  useEffect(() => {
    if (!src) { setStatus('idle'); return }
    if (srcRef.current !== src) {
      setStatus('loading')
      srcRef.current = src
    }

    let cancelled = false
    const img = new Image()
    img.onload  = () => { if (!cancelled) setStatus('loaded') }
    img.onerror = () => { if (!cancelled) setStatus('error') }
    img.src = src

    return () => { cancelled = true }
  }, [src])

  return status
}

/* ── Utilidades ──────────────────────────────── */

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Hash determinístico baseado no nome COMPLETO (não nas iniciais),
 * gerando uma matiz HSL estável para o fallback de cor.
 */
function hashNameColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // força 32-bit
  }
  const h = ((Math.abs(hash) % 360) + 360) % 360
  // Saturação e luminosidade fixas para legibilidade do texto branco
  return `hsl(${h}, 38%, 32%)`
}

/* ── Icon fallback SVG ───────────────────────── */

function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 12c2.67 0 4.8-2.13 4.8-4.8S14.67 2.4 12 2.4 7.2 4.53 7.2 7.2 9.33 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  )
}

/* ── Props ───────────────────────────────────── */

export interface AvatarProps {
  /** URL da imagem. */
  src?: string
  /**
   * Nome completo do usuário.
   * Usado para: iniciais no fallback + cor determinística + aria-label.
   */
  name?: string
  /** Texto alternativo. Padrão: valor de `name`. */
  alt?: string
  /** Tamanho do avatar. Padrão: 'md'. */
  size?: AvatarSize
  /**
   * Função de render customizada para a imagem.
   * Use para integração com `next/image` ou outros componentes otimizados.
   *
   * @example
   * // Next.js
   * renderImage={({ src, alt, className }) => (
   *   <Image src={src} alt={alt} className={className} fill sizes="64px" />
   * )}
   */
  renderImage?: (props: { src: string; alt: string; className: string }) => React.ReactNode
  /**
   * Atraso (ms) antes de exibir o fallback.
   * Evita flash do fallback em conexões rápidas. Padrão: 0.
   */
  delayMs?: number
  className?: string
  ref?: React.Ref<HTMLSpanElement>
}

/* ── Componente ──────────────────────────────── */

export function Avatar({
  ref,
  src,
  name = '',
  alt,
  size = 'md',
  renderImage,
  delayMs = 0,
  className,
}: AvatarProps) {
  const status = useImageStatus(src)
  const [fallbackReady, setFallbackReady] = useState(delayMs === 0)

  useEffect(() => {
    if (delayMs > 0) {
      const t = setTimeout(() => setFallbackReady(true), delayMs)
      return () => clearTimeout(t)
    }
  }, [delayMs])

  const altText = alt ?? name
  const initials = name ? getInitials(name) : ''
  const bgColor  = name ? hashNameColor(name) : undefined

  // Sequência de fallback: image → initials → icon
  const imageVisible = src && status === 'loaded'
  const showFallback = !imageVisible && fallbackReady

  return (
    <span
      ref={ref}
      role={altText ? 'img' : undefined}
      aria-label={altText || undefined}
      className={[styles.root, styles[size], className].filter(Boolean).join(' ')}
    >
      {/* Camada de imagem — renderizada mas escondida até carregar */}
      {src && (
        <>
          {renderImage ? (
            <span
              aria-hidden="true"
              className={[styles.imageWrapper, imageVisible ? '' : styles.hidden]
                .filter(Boolean)
                .join(' ')}
            >
              {renderImage({ src, alt: altText, className: styles.image })}
            </span>
          ) : (
            <img
              src={src}
              alt={altText}
              aria-hidden="true"
              className={[styles.image, imageVisible ? '' : styles.hidden]
                .filter(Boolean)
                .join(' ')}
            />
          )}
        </>
      )}

      {/* Fallback: iniciais ou ícone genérico */}
      {showFallback && (
        <span
          aria-hidden="true"
          className={[styles.fallback, !initials ? styles.iconFallback : '']
            .filter(Boolean)
            .join(' ')}
          style={initials ? { backgroundColor: bgColor } : undefined}
        >
          {initials ? initials : <PersonIcon className={styles.personIcon} />}
        </span>
      )}
    </span>
  )
}
