export const colors = {
  brand: {
    primary: 'var(--color-brand-primary)',
    hover: 'var(--color-brand-hover)',
    accent: 'var(--color-brand-accent)',
  },
  background: {
    main: 'var(--color-background-main)',
    secondary: 'var(--color-background-secondary)',
    tertiary: 'var(--color-background-tertiary)',
    input: 'var(--color-background-input)',
    navbarMobile: 'var(--color-background-navbar-mobile)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    link: 'var(--color-text-link)',
  },
  status: {
    success: 'var(--color-status-success)',
    error: 'var(--color-status-error)',
    warning: 'var(--color-status-warning)',
    vip: 'var(--color-status-vip)',
  },
  verticals: {
    sports: 'var(--color-verticals-sports)',
    casino: 'var(--color-verticals-casino)',
  },
} as const

export type ColorToken = typeof colors
