import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './Label'

const meta = {
  title: 'atoms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Form label component. Associates with an input via `htmlFor` and supports required and disabled states.',
      },
    },
    a11y: { config: {} },
  },
  args: {
    children: 'Email',
    required: false,
    disabled: false,
  },
  argTypes: {
    children: {
      description: 'Label text content.',
      control: 'text',
    },
    htmlFor: {
      description: 'Associates the label with an input element by its `id`.',
      control: 'text',
    },
    required: {
      description: 'When `true`, renders a red asterisk after the text.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      description: 'When `true`, the label uses muted color to match a disabled input.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// ── Styles ────────────────────────────────────

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
  padding: '10px 0',
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
    docs: {
      description: {
        story: 'Default state of the Label component.',
      },
    },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: {
        story: 'All states at a glance.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={rowStyle}>
        <span style={captionStyle}>default</span>
        <Label>Email address</Label>
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>required</span>
        <Label required>Email address</Label>
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>disabled</span>
        <Label disabled>Email address</Label>
      </div>
      <div style={rowStyle}>
        <span style={captionStyle}>req + dis</span>
        <Label required disabled>Email address</Label>
      </div>
    </div>
  ),
}

// ── States ────────────────────────────────────

export const StateRequired: Story = {
  name: 'States / Required',
  args: { required: true, children: 'Email address' },
  parameters: {
    docs: {
      description: {
        story: 'Shows a red asterisk to signal the field is mandatory.',
      },
    },
  },
}

export const StateDisabled: Story = {
  name: 'States / Disabled',
  args: { disabled: true, children: 'Email address' },
  parameters: {
    docs: {
      description: {
        story: 'Muted appearance to match a disabled input.',
      },
    },
  },
}

// ── With input ────────────────────────────────

export const WithInput: Story = {
  name: 'Usage / With input',
  parameters: {
    docs: {
      description: {
        story: 'Typical usage: `htmlFor` linking the label to an input.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'sans-serif' }}>
      <Label htmlFor="email-example" required>Email address</Label>
      <input
        id="email-example"
        type="email"
        placeholder="you@example.com"
        style={{
          background: 'var(--color-background-input)',
          border: '1px solid var(--color-background-tertiary)',
          borderRadius: '6px',
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          padding: '8px 12px',
          outline: 'none',
          width: '240px',
        }}
      />
    </div>
  ),
}
