import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta = {
  title: 'atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Basic button component following the Design System. Supports 2 visual variants, 3 sizes, and a disabled state.',
      },
    },
    a11y: { config: {} },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    children: {
      description: 'Content inside the button. Accepts text, icons, or any React node.',
      control: 'text',
    },
    variant: {
      description:
        'Visual variant of the button. `primary` uses a filled brand background; `outline` uses a transparent background with a colored border.',
      control: 'radio',
      options: ['primary', 'outline'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      description: 'Controls the vertical and horizontal size of the button.',
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      description: 'When `true`, the button is non-interactive and visually dimmed.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description: 'Callback fired when the button is clicked.',
      action: 'clicked',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ── Styles ────────────────────────────────────

const labelStyle: React.CSSProperties = {
  color: '#8c9099',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '0 16px 8px 0',
  textAlign: 'left',
  whiteSpace: 'nowrap',
}

const cellStyle: React.CSSProperties = {
  padding: '10px 16px',
  verticalAlign: 'middle',
}

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: 'Default state of the Button component with all standard props applied.',
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
        story: 'All variants and sizes at a glance. Use this as a visual regression reference.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const variants = ['primary', 'outline'] as const
    const sizes = ['sm', 'md', 'lg'] as const

    return (
      <table style={{ borderCollapse: 'collapse', fontFamily: 'sans-serif' }}>
        <thead>
          <tr>
            <th style={labelStyle} />
            {variants.map(v => (
              <th key={v} style={labelStyle}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map(size => (
            <tr key={size}>
              <td style={labelStyle}>{size}</td>
              {variants.map(variant => (
                <td key={variant} style={cellStyle}>
                  <Button variant={variant} size={size}>Button</Button>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={labelStyle}>disabled</td>
            {variants.map(variant => (
              <td key={variant} style={cellStyle}>
                <Button variant={variant} size="md" disabled>Button</Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    )
  },
}

// ── Variants ──────────────────────────────────

export const VariantPrimary: Story = {
  name: 'Variants / Primary',
  args: { variant: 'primary' },
  parameters: {
    docs: {
      description: {
        story: 'Filled brand background with light text. Use for the main call-to-action on a page.',
      },
    },
  },
}

export const VariantOutline: Story = {
  name: 'Variants / Outline',
  args: { variant: 'outline' },
  parameters: {
    docs: {
      description: {
        story: 'Transparent background with a colored border. Use for secondary actions alongside a primary button.',
      },
    },
  },
}

// ── Sizes ─────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Sizes / Small',
  args: { size: 'sm', children: 'Small' },
  parameters: {
    docs: {
      description: {
        story: 'Compact size, ideal for toolbars, tables, and tight spaces.',
      },
    },
  },
}

export const SizeMedium: Story = {
  name: 'Sizes / Medium',
  args: { size: 'md', children: 'Medium' },
  parameters: {
    docs: {
      description: {
        story: 'Default size recommended for most use cases.',
      },
    },
  },
}

export const SizeLarge: Story = {
  name: 'Sizes / Large',
  args: { size: 'lg', children: 'Large' },
  parameters: {
    docs: {
      description: {
        story: 'Larger size for prominent CTAs, hero sections, or touch-friendly interfaces.',
      },
    },
  },
}

// ── States ────────────────────────────────────

export const StateDisabled: Story = {
  name: 'States / Disabled',
  args: { disabled: true, children: 'Disabled' },
  parameters: {
    docs: {
      description: {
        story: 'Non-interactive state. The button is visually dimmed and ignores all click events.',
      },
    },
  },
}