import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox control. Supports checked and disabled states. Accepts optional inline label via `children`.',
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
      description: 'Initial checked state (uncontrolled).',
      control: 'boolean',
    },
    disabled: {
      description: 'When `true`, the checkbox is non-interactive and visually dimmed.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      description: 'Optional inline label rendered next to the checkbox.',
      control: 'text',
    },
    onChange: {
      description: 'Callback fired with the new `checked` boolean.',
      action: 'changed',
    },
  },
} satisfies Meta<typeof Checkbox>

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
  width: '80px',
  flexShrink: 0,
}

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: { description: { story: 'Unchecked checkbox without inline label.' } },
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
        <span style={captionStyle}>unchecked</span>
        <Checkbox />
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>checked</span>
        <Checkbox defaultChecked />
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>disabled</span>
        <Checkbox disabled />
        <Checkbox disabled defaultChecked />
      </div>
    </div>
  ),
}

// ── States ────────────────────────────────────

export const StateChecked: Story = {
  name: 'States / Checked',
  args: { defaultChecked: true },
  parameters: {
    docs: { description: { story: 'Checked state with brand red fill and white checkmark.' } },
  },
}

export const StateDisabled: Story = {
  name: 'States / Disabled',
  args: { disabled: true },
  parameters: {
    docs: { description: { story: 'Non-interactive. Preserves visual state.' } },
  },
}

// ── With label ────────────────────────────────

export const WithLabel: Story = {
  name: 'Usage / With inline label',
  parameters: {
    docs: { description: { story: 'Inline label via `children` — matches the Blaze form pattern.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'sans-serif' }}>
      <Checkbox defaultChecked>Código (opcional)</Checkbox>
      <Checkbox>
        Ao se inscrever você concorda com os{' '}
        <a href="#" style={{ color: 'var(--color-brand-primary)' }}>Termos de Serviço</a>
      </Checkbox>
    </div>
  ),
}
