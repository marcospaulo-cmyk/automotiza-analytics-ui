export const border = {
  radius: {
    default: 'var(--border-radius-default)',
    pill: 'var(--border-radius-pill)',
    circle: 'var(--border-radius-circle)',
  },
  width: {
    thin: 'var(--border-width-thin)',
    activeIndicator: 'var(--border-width-active-indicator)',
  },
  color: {
    default: 'var(--border-color-default)',
  },
} as const

export type BorderToken = typeof border
