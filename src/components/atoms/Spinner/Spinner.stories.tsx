import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'

const meta = {
  title: 'atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'SVG arc spinner with `role="status"` for standalone use. Pass `aria-hidden={true}` when the spinner is decorative and the loading context is communicated by a parent element (e.g., a Button with a label).',
      },
    },
    a11y: { config: {} },
  },
  args: {
    size: 'md',
    label: 'Carregando',
  },
  argTypes: {
    size: {
      description: 'Controls the rendered dimensions of the spinner.',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      table: { defaultValue: { summary: 'md' } },
    },
    label: {
      description:
        'Screen-reader-only text announced via `role="status"`. Ignored when `aria-hidden={true}`.',
      control: 'text',
      table: { defaultValue: { summary: 'Carregando' } },
    },
    'aria-hidden': {
      description:
        'When `true`, the spinner is purely decorative. Use inside a Button or other element that already communicates the loading state.',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// ── Styles ────────────────────────────────────

const labelStyle: React.CSSProperties = {
  color: '#8c9099',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

const cellStyle: React.CSSProperties = {
  padding: '12px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
}

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Standalone spinner with `role="status"`. Screen readers announce "Carregando" when it appears.',
      },
    },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'All sizes at a glance.' } },
    controls: { disable: true },
  },
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', fontFamily: 'sans-serif' }}>
        {sizes.map((size) => (
          <div key={size} style={cellStyle}>
            <Spinner size={size} />
            <span style={labelStyle}>{size}</span>
          </div>
        ))}
      </div>
    )
  },
}

// ── Sizes ─────────────────────────────────────

export const SizeXs: Story = {
  name: 'Sizes / xs — 12px',
  args: { size: 'xs' },
  parameters: { docs: { description: { story: 'Inline use, tight spaces.' } } },
}

export const SizeSm: Story = {
  name: 'Sizes / sm — 16px',
  args: { size: 'sm' },
  parameters: { docs: { description: { story: 'Default for use inside Button.' } } },
}

export const SizeMd: Story = {
  name: 'Sizes / md — 20px',
  args: { size: 'md' },
  parameters: { docs: { description: { story: 'Default standalone size.' } } },
}

export const SizeLg: Story = {
  name: 'Sizes / lg — 24px',
  args: { size: 'lg' },
  parameters: { docs: { description: { story: 'Section-level loading.' } } },
}

export const SizeXl: Story = {
  name: 'Sizes / xl — 32px',
  args: { size: 'xl' },
  parameters: { docs: { description: { story: 'Full-page loading overlays.' } } },
}

// ── Colors ────────────────────────────────────

export const Colors: Story = {
  name: 'Colors',
  parameters: {
    docs: {
      description: {
        story:
          'Spinner uses `currentColor` — it inherits the CSS `color` of its parent. No color prop needed.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <div style={cellStyle}>
        <Spinner size="lg" />
        <span style={labelStyle}>primary text</span>
      </div>
      <div style={{ ...cellStyle, color: 'var(--color-brand-primary)' }}>
        <Spinner size="lg" />
        <span style={labelStyle}>brand</span>
      </div>
      <div style={{ ...cellStyle, color: 'var(--color-status-success)' }}>
        <Spinner size="lg" />
        <span style={labelStyle}>success</span>
      </div>
      <div style={{ ...cellStyle, color: 'var(--color-text-muted)' }}>
        <Spinner size="lg" />
        <span style={labelStyle}>muted</span>
      </div>
    </div>
  ),
}

// ── Usage ─────────────────────────────────────

export const InButton: Story = {
  name: 'Usage / Inside Button (aria-hidden)',
  parameters: {
    docs: {
      description: {
        story:
          'When inside a Button that already communicates the loading state via its label, pass `aria-hidden={true}` so screen readers don\'t double-announce.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <button
        disabled
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '4px',
          background: 'var(--color-brand-primary)',
          color: '#fff',
          border: 'none',
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
          cursor: 'not-allowed',
          opacity: 0.8,
        }}
        aria-label="Salvando..."
      >
        <Spinner size="sm" aria-hidden={true} />
        Salvando...
      </button>

      <button
        disabled
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '4px',
          background: 'transparent',
          color: 'var(--color-brand-primary)',
          border: '1px solid var(--color-brand-primary)',
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 600,
          cursor: 'not-allowed',
          opacity: 0.8,
        }}
        aria-label="Carregando..."
      >
        <Spinner size="sm" aria-hidden={true} />
        Carregando...
      </button>
    </div>
  ),
}

export const Standalone: Story = {
  name: 'Usage / Standalone (role="status")',
  parameters: {
    docs: {
      description: {
        story:
          'Spinner with `role="status"` and a custom `label`. Screen readers will announce the label when the component mounts.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <Spinner size="lg" label="Buscando resultados" />
      <Spinner size="lg" label="Enviando arquivo" />
    </div>
  ),
}
