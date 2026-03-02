import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input with floating label. Grows automatically as the user types (CSS grid trick, no JS measurement). Supports error state, hint text, character count, and manual resize.',
      },
    },
    a11y: { config: {} },
  },
  args: {
    label: 'Mensagem',
    disabled: false,
    autoResize: true,
    minRows: 3,
    showCharCount: false,
  },
  argTypes: {
    label: {
      description: 'Label text — acts as the floating placeholder.',
      control: 'text',
    },
    error: {
      description: 'Error message displayed below the textarea. Turns border and label red.',
      control: 'text',
    },
    hint: {
      description: 'Hint text shown below the textarea when there is no error.',
      control: 'text',
    },
    minRows: {
      description: 'Minimum number of visible rows.',
      control: { type: 'number', min: 1, max: 20 },
      table: { defaultValue: { summary: '3' } },
    },
    maxRows: {
      description: 'Maximum rows before the textarea scrolls instead of growing.',
      control: { type: 'number', min: 1, max: 30 },
    },
    autoResize: {
      description: 'When `true`, the textarea grows with its content (CSS grid trick).',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    resize: {
      description: 'CSS `resize` handle. Ignored when `autoResize` is true.',
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    showCharCount: {
      description: 'Displays a live character counter in the bottom-right corner.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    maxLength: {
      description: 'Maximum number of characters. Shown in the counter when `showCharCount` is true.',
      control: { type: 'number' },
    },
    disabled: {
      description: 'When `true`, the textarea is non-interactive and visually dimmed.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// ── Styles ────────────────────────────────────

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '360px',
  fontFamily: 'sans-serif',
}

const labelStyle: React.CSSProperties = {
  color: '#8c9099',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '8px',
}

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: { description: { story: 'Empty textarea. Click to see the label float.' } },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Main states at a glance.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={wrapperStyle}>
      <Textarea label="Mensagem" />
      <Textarea label="Mensagem" defaultValue="Olá, estou entrando em contato para..." />
      <Textarea label="Mensagem" error="Campo obrigatório." />
      <Textarea label="Mensagem" hint="Máximo de 500 caracteres." maxLength={500} showCharCount />
      <Textarea label="Mensagem" disabled />
    </div>
  ),
}

// ── States ────────────────────────────────────

export const StateWithValue: Story = {
  name: 'States / With value',
  args: { label: 'Mensagem', defaultValue: 'Olá, estou entrando em contato para...' },
  parameters: {
    docs: { description: { story: 'Label floated — textarea has a pre-filled value.' } },
  },
}

export const StateError: Story = {
  name: 'States / Error',
  args: { label: 'Mensagem', defaultValue: 'texto inválido', error: 'Campo obrigatório.' },
  parameters: {
    docs: { description: { story: 'Error state with message below the textarea.' } },
  },
}

export const StateWithHint: Story = {
  name: 'States / With hint',
  args: { label: 'Bio', hint: 'Descreva-se em poucas palavras.' },
  parameters: {
    docs: { description: { story: 'Hint text is shown when there is no error.' } },
  },
}

export const StateDisabled: Story = {
  name: 'States / Disabled',
  args: { label: 'Mensagem', disabled: true },
  parameters: {
    docs: { description: { story: 'Non-interactive textarea.' } },
  },
}

// ── Features ──────────────────────────────────

export const CharCount: Story = {
  name: 'Features / Character count',
  args: { label: 'Comentário', showCharCount: true, maxLength: 280, minRows: 3 },
  parameters: {
    docs: {
      description: {
        story:
          'Live counter with `aria-live="polite"` — screen readers announce the count as the user types.',
      },
    },
    controls: { disable: true },
  },
}

export const MaxRows: Story = {
  name: 'Features / Max rows',
  args: { label: 'Log', minRows: 3, maxRows: 6, defaultValue: 'Linha 1\nLinha 2\nLinha 3' },
  parameters: {
    docs: {
      description: {
        story: 'Textarea grows up to `maxRows`, then scrolls. Type more lines to see it in action.',
      },
    },
  },
}

export const ManualResize: Story = {
  name: 'Features / Manual resize',
  args: { label: 'Notas', autoResize: false, resize: 'vertical', minRows: 4 },
  parameters: {
    docs: {
      description: {
        story: 'When `autoResize` is disabled, the user can drag the resize handle manually.',
      },
    },
  },
}

// ── Usage ─────────────────────────────────────

export const Controlled: Story = {
  name: 'Usage / Controlled',
  parameters: {
    docs: {
      description: {
        story: 'Controlled textarea wired to external state — value and onChange fully controlled.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState('')
    const MAX = 200
    return (
      <div style={{ width: '360px' }}>
        <Textarea
          label="Comentário"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX}
          showCharCount
          hint="Seja objetivo e respeitoso."
          minRows={3}
          maxRows={8}
        />
      </div>
    )
  },
}

export const WithOverviewLabel: Story = {
  name: 'Usage / Min rows comparison',
  parameters: {
    docs: { description: { story: 'Same component with different `minRows` values.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={wrapperStyle}>
      {([1, 2, 3, 5] as const).map((rows) => (
        <div key={rows}>
          <p style={labelStyle}>minRows={rows}</p>
          <Textarea label="Mensagem" minRows={rows} />
        </div>
      ))}
    </div>
  ),
}
