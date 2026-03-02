export const typography = {
  family: {
    heading: 'var(--font-family-heading)',
    body: 'var(--font-family-body)',
    numeric: 'var(--font-family-numeric)',
    special: 'var(--font-family-special)',
  },
  size: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    xxl: 'var(--font-size-xxl)',
  },
  weight: {
    regular: 'var(--font-weight-regular)',
    medium: 'var(--font-weight-medium)',
    semibold: 'var(--font-weight-semibold)',
    bold: 'var(--font-weight-bold)',
    black: 'var(--font-weight-black)',
  },
} as const

export type TypographyToken = typeof typography
