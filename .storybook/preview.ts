import type { Preview } from '@storybook/react-vite'
import { create } from 'storybook/theming'
import '@/tokens/tokens.css'

const blazeTheme = create({
  base: 'dark',

  colorPrimary:   '#f12c4c',
  colorSecondary: '#f12c4c',

  appBg:          '#0f1923',
  appContentBg:   '#1a242d',
  appPreviewBg:   '#0f1923',
  appBorderColor: 'rgba(255,255,255,0.07)',

  textColor:      '#f0f2f5',
  textMutedColor: '#8c9099',
})

const preview: Preview = {
  // Toolbar para trocar tema globalmente no Storybook
  globalTypes: {
    theme: {
      description: 'Tema dos componentes',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'dark',  icon: 'moon', title: 'Dark' },
          { value: 'light', icon: 'sun',  title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },

  // Valor padrão: dark
  globals: {
    theme: 'dark',
  },

  // Decorator que aplica data-theme no <html> da preview iframe
  decorators: [
    (Story, context) => {
      const theme = (context.globals['theme'] as string) ?? 'dark'
      document.documentElement.setAttribute('data-theme', theme)
      return Story()
    },
  ],

  parameters: {
    docs: {
      theme: blazeTheme,
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#0f1923' },
        { name: 'surface', value: '#1a242d' },
        { name: 'light',   value: '#f5f7fa' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
  },
}

export default preview