import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './Toggle'

const meta = {
  title: 'atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Toggle switch for boolean settings. Renders a `<button role="switch">` — correctly announced by screen readers as "switch, on/off" (not "checkbox").',
          '',
          '**Labeling:** Always provide an accessible label via one of:',
          '- Wrapping in `<label>Text <Toggle /></label>`',
          '- `htmlFor` + `id` pair: `<label htmlFor="x">Text</label><Toggle id="x" />`',
          '- `aria-label` prop when no visible label is needed',
        ].join('\n'),
      },
    },
    a11y: { config: {} },
  },
  args: {
    disabled: false,
  },
  argTypes: {
    checked: {
      description: 'Controlled checked state.',
      control: 'boolean',
    },
    defaultChecked: {
      description: 'Initial checked state for uncontrolled usage.',
      control: 'boolean',
    },
    disabled: {
      description: 'When `true`, the switch is non-interactive and visually dimmed.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    onChange: {
      description: 'Callback fired with the new `checked` boolean when toggled.',
      action: 'changed',
    },
    'aria-label': {
      description: 'Accessible label when no visible `<label>` is present.',
      control: 'text',
    },
    name: {
      description: '`name` attribute for native form participation (via hidden `<input>`).',
      control: 'text',
    },
    value: {
      description: 'Value submitted when checked. Defaults to `"on"`.',
      control: 'text',
      table: { defaultValue: { summary: 'on' } },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

// ── Styles ────────────────────────────────────

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '8px 0',
}

const captionStyle: React.CSSProperties = {
  color: '#8c9099',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  width: '64px',
  flexShrink: 0,
}

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { defaultChecked: false, 'aria-label': 'Toggle demo' },
  parameters: {
    docs: { description: { story: 'Uncontrolled switch in its default off state.' } },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'All states at a glance.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={rowStyle}>
        <span style={captionStyle}>off</span>
        <Toggle defaultChecked={false} aria-label="Demo switch off" />
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>on</span>
        <Toggle defaultChecked aria-label="Demo switch on" />
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>disabled</span>
        <Toggle disabled defaultChecked={false} aria-label="Demo switch disabled off" />
        <Toggle disabled defaultChecked aria-label="Demo switch disabled on" />
      </div>
    </div>
  ),
}

// ── States ────────────────────────────────────

export const StateDisabled: Story = {
  name: 'States / Disabled',
  args: { disabled: true, 'aria-label': 'Disabled switch' },
  parameters: {
    docs: { description: { story: 'Non-interactive. Preserves visual state but blocks interaction.' } },
  },
}

// ── Controlled ────────────────────────────────

export const Controlled: Story = {
  name: 'Usage / Controlled',
  parameters: {
    docs: {
      description: {
        story: 'Controlled switch wired to local state, labeled via `<label>` wrapping.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'sans-serif',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <Toggle checked={on} onChange={setOn} />
        <span style={{ color: '#8c9099', fontSize: '13px' }}>
          Dinheiro Promocional:{' '}
          <strong style={{ color: on ? '#f12c4c' : '#bcbfc7' }}>
            {on ? 'ativo' : 'inativo'}
          </strong>
        </span>
      </label>
    )
  },
}

export const WithHtmlFor: Story = {
  name: 'Usage / htmlFor + id',
  parameters: {
    docs: {
      description: {
        story:
          'Explicit `<label htmlFor>` + `id` association — preferred when label and switch are not siblings.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const [on, setOn] = useState(false)
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: 'sans-serif',
        }}
      >
        <label
          htmlFor="notif-toggle"
          style={{ color: 'var(--color-text-secondary)', fontSize: '14px', cursor: 'pointer' }}
        >
          Notificações por email
        </label>
        <Toggle id="notif-toggle" checked={on} onChange={setOn} />
      </div>
    )
  },
}
