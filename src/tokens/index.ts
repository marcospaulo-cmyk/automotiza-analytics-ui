export * from '@/tokens/color/color'
export * from '@/tokens/typography/typography'
export * from '@/tokens/border/border'
export * from '@/tokens/layout/layout'
export * from '@/tokens/shadow/shadow'

import { colors } from '@/tokens/color/color'
import { typography } from '@/tokens/typography/typography'
import { border } from '@/tokens/border/border'
import { layout } from '@/tokens/layout/layout'
import { shadow } from '@/tokens/shadow/shadow'

export const tokens = {
  colors,
  typography,
  border,
  layout,
  shadow,
} as const

export type Tokens = typeof tokens
