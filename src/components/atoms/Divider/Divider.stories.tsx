import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta = {
  title: 'atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Visual separator between content sections. Horizontal uses `<hr>` (semantic or decorative). Vertical uses a `<div>` with correct `aria-orientation`. Pass `decorative={false}` when the separation is semantically meaningful to screen readers.',
      },
    },
    a11y: { config: {} },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  argTypes: {
    orientation: {
      description: 'Direction of the separator line.',
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
    decorative: {
      description:
        'When `true` (default), the element is hidden from screen readers (`aria-hidden`). Set to `false` for semantically meaningful separations.',
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    label: {
      description:
        'Text rendered in the middle of the divider (horizontal only). E.g., "ou", "and", "—".',
      control: 'text',
    },
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: { story: 'Horizontal decorative divider. Invisible to screen readers.' },
    },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'All variants at a glance.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '360px', fontFamily: 'sans-serif' }}>
      <div>
        <p style={{ color: '#8c9099', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>horizontal</p>
        <Divider />
      </div>

      <div>
        <p style={{ color: '#8c9099', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>with label</p>
        <Divider label="ou" />
      </div>

      <div>
        <p style={{ color: '#8c9099', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>vertical (in flex row)</p>
        <div style={{ display: 'flex', alignItems: 'center', height: '40px', gap: '16px' }}>
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Esportes</span>
          <Divider orientation="vertical" />
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Casino</span>
          <Divider orientation="vertical" />
          <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Ao vivo</span>
        </div>
      </div>
    </div>
  ),
}

// ── Orientation ───────────────────────────────

export const OrientationHorizontal: Story = {
  name: 'Orientation / Horizontal',
  args: { orientation: 'horizontal' },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: { description: { story: 'Full-width horizontal line using `<hr>`.' } },
  },
}

export const OrientationVertical: Story = {
  name: 'Orientation / Vertical',
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', height: '48px', gap: '16px' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>Esquerda</span>
        <Story />
        <span style={{ color: 'var(--color-text-secondary)' }}>Direita</span>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Vertical line using `<div>` with `align-self: stretch`. Requires a flex or grid parent.',
      },
    },
  },
}

// ── With label ────────────────────────────────

export const WithLabel: Story = {
  name: 'With label / "ou"',
  args: { label: 'ou' },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Horizontal divider with text in the center, useful for login/auth flows.',
      },
    },
  },
}

export const WithLabelCustom: Story = {
  name: 'With label / custom text',
  args: { label: 'Novidades desta semana' },
  decorators: [
    (Story) => (
      <div style={{ width: '480px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: { description: { story: 'Longer label text with lines filling the remaining space.' } },
  },
}

// ── Decorative vs semantic ────────────────────

export const Decorative: Story = {
  name: 'A11y / Decorative (default)',
  args: { decorative: true },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '`decorative={true}` (default): `aria-hidden="true"` is applied. Screen readers skip this element entirely.',
      },
    },
  },
}

export const Semantic: Story = {
  name: 'A11y / Semantic separator',
  args: { decorative: false },
  decorators: [
    (Story) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          '`decorative={false}`: no `aria-hidden`. Screen readers announce "separator" — use only when the separation is meaningful to the document structure.',
      },
    },
  },
}
