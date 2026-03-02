import { createContext, useContext, useId, cloneElement } from 'react'
import styles from './Field.module.css'

/* ── Context ─────────────────────────────────── */

interface FieldContextValue {
  labelId: string
  controlId: string
  descriptionId: string
  errorId: string
  invalid: boolean
  required: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

function useFieldContext() {
  return useContext(FieldContext)
}

/* ── Hook público ────────────────────────────── */

/**
 * Retorna os IDs e flags ARIA do Field pai.
 * Use dentro de controles customizados para conectar label/hint/error automaticamente.
 */
export function useField() {
  const ctx = useFieldContext()
  if (!ctx) throw new Error('useField deve ser usado dentro de <Field.Root>')
  return ctx
}

/* ── Field.Root ──────────────────────────────── */

export interface FieldRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'> {
  children: React.ReactNode
  /** Marca o campo como inválido — propaga `aria-invalid` para o controle interno. */
  invalid?: boolean
  /** Marca o campo como obrigatório — propaga `aria-required` e indicador visual ao label. */
  required?: boolean
  /** id base para geração automática dos IDs derivados. Auto-gerado se omitido. */
  id?: string
}

function FieldRoot({
  children,
  invalid = false,
  required = false,
  id: externalId,
  className,
  ...props
}: FieldRootProps) {
  const autoId = useId()
  const base = externalId ?? autoId

  const ctx: FieldContextValue = {
    labelId: `${base}-label`,
    controlId: `${base}-control`,
    descriptionId: `${base}-description`,
    errorId: `${base}-error`,
    invalid,
    required,
  }

  return (
    <FieldContext.Provider value={ctx}>
      <div className={[styles.root, className].filter(Boolean).join(' ')} {...props}>
        {children}
      </div>
    </FieldContext.Provider>
  )
}

/* ── Field.Label ─────────────────────────────── */

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

function FieldLabel({ children, className, ...props }: FieldLabelProps) {
  const ctx = useFieldContext()
  return (
    <label
      id={ctx?.labelId}
      htmlFor={ctx?.controlId}
      className={[styles.label, ctx?.invalid ? styles.labelInvalid : '', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      {ctx?.required && (
        <span aria-hidden="true" className={styles.required}>
          {' '}*
        </span>
      )}
    </label>
  )
}

/* ── Field.Control ───────────────────────────── */

/**
 * Injeta automaticamente `id`, `aria-labelledby`, `aria-describedby`,
 * `aria-invalid` e `aria-required` no elemento filho via `cloneElement`.
 *
 * O filho deve aceitar esses props (Input, Textarea, select, input nativo, etc.)
 */
export interface FieldControlProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>
}

function FieldControl({ children }: FieldControlProps) {
  const ctx = useFieldContext()
  if (!ctx) return children

  const describedBy = [ctx.descriptionId, ctx.invalid ? ctx.errorId : undefined]
    .filter(Boolean)
    .join(' ')

  return cloneElement(children, {
    id: children.props.id ?? ctx.controlId,
    'aria-labelledby': ctx.labelId,
    'aria-describedby': describedBy || undefined,
    'aria-invalid': ctx.invalid || undefined,
    'aria-required': ctx.required || undefined,
  })
}

/* ── Field.Description ───────────────────────── */

export interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

function FieldDescription({ children, className, ...props }: FieldDescriptionProps) {
  const ctx = useFieldContext()
  return (
    <p
      id={ctx?.descriptionId}
      className={[styles.description, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </p>
  )
}

/* ── Field.Error ─────────────────────────────── */

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

function FieldError({ children, className, ...props }: FieldErrorProps) {
  const ctx = useFieldContext()
  return (
    <p
      id={ctx?.errorId}
      role="alert"
      className={[styles.error, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </p>
  )
}

/* ── Namespace export ────────────────────────── */

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
}

export type { FieldContextValue }
