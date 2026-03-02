import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const blazeTheme = create({
  base: 'dark',

  // Branding
  brandTitle: 'Blaze Squad UI',
  brandUrl:   'https://github.com/blaze-squad',
  brandTarget: '_blank',

  // ── Chrome (manager shell) ───────────────────
  colorPrimary:   '#f12c4c',
  colorSecondary: '#f12c4c',

  // Background
  appBg:           '#0f1923',
  appContentBg:    '#1a242d',
  appPreviewBg:    '#0f1923',
  appBorderColor:  'rgba(255,255,255,0.07)',
  appBorderRadius: 8,

  // Texto
  textColor:         '#f0f2f5',
  textMutedColor:    '#8c9099',
  textInverseColor:  '#0f1923',

  // Toolbar
  barTextColor:      '#8c9099',
  barHoverColor:     '#f0f2f5',
  barSelectedColor:  '#f12c4c',
  barBg:             '#1a242d',

  // Inputs do painel Controls
  inputBg:           '#252f38',
  inputBorder:       'rgba(255,255,255,0.08)',
  inputTextColor:    '#f0f2f5',
  inputBorderRadius: 6,

  // Botões
  buttonBg:          '#252f38',
  buttonBorder:      'rgba(255,255,255,0.08)',
  booleanBg:         '#252f38',
  booleanSelectedBg: '#f12c4c',
})

addons.setConfig({
  theme: blazeTheme,
})
