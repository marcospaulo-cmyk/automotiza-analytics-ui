import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, useEffect } from 'react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Placeholder de carregamento com animação shimmer (wave) ou pulse.',
          '',
          '**Acessibilidade:** Skeletons individuais recebem `aria-hidden="true"` — são puramente visuais.',
          'Envolva o container de carregamento com `aria-busy="true"` e `aria-label` descritivo para screen readers.',
          '',
          '**Reduced motion:** A animação wave é automaticamente substituída por um pulse suave quando',
          '`prefers-reduced-motion: reduce` está ativo.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    width: { control: 'text', description: 'Largura (CSS ou número em px).' },
    height: { control: 'text', description: 'Altura (CSS ou número em px).' },
    radius: {
      control: 'select',
      options: ['default', 'pill', 'circle'],
      description: 'Raio de borda.',
    },
    animation: {
      control: 'select',
      options: ['wave', 'pulse', false],
      description: 'Tipo de animação.',
    },
    lines: { control: { type: 'number', min: 1, max: 10 }, description: 'Número de linhas.' },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { width: 240, height: 20 },
  parameters: {
    docs: { description: { story: 'Wave shimmer padrão.' } },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Todos os formatos e animações.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'sans-serif', maxWidth: 400 }}>
      <section>
        <p style={{ color: '#8c9099', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Wave (padrão)</p>
        <Skeleton height={20} />
      </section>

      <section>
        <p style={{ color: '#8c9099', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Pulse</p>
        <Skeleton height={20} animation="pulse" />
      </section>

      <section>
        <p style={{ color: '#8c9099', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Formas</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Skeleton width={48} height={48} radius="circle" />
          <Skeleton width={120} height={32} radius="pill" />
          <Skeleton width={80} height={32} radius="default" />
        </div>
      </section>

      <section>
        <p style={{ color: '#8c9099', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Multi-linha</p>
        <Skeleton lines={3} height={16} />
      </section>
    </div>
  ),
}

// ── Card layout ───────────────────────────────

export const CardLayout: Story = {
  name: 'Padrão / Card',
  parameters: {
    docs: {
      description: { story: 'Exemplo de skeleton de card com avatar, título e corpo.' },
    },
    controls: { disable: true },
  },
  render: () => (
    <div
      aria-busy="true"
      aria-label="Carregando card"
      style={{
        padding: 20,
        background: 'var(--color-background-elevated)',
        borderRadius: 12,
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton width={40} height={40} radius="circle" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton height={14} width="60%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>
      <Skeleton height={140} radius="default" />
      <Skeleton lines={3} height={14} />
    </div>
  ),
}

// ── Controlled (simulated load) ───────────────

export const SimulatedLoad: Story = {
  name: 'Padrão / Carregamento simulado',
  parameters: {
    docs: {
      description: {
        story: 'Skeleton substituído por conteúdo real após 2s (simula fetch de dados).',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 2000)
      return () => clearTimeout(t)
    }, [])

    return (
      <div style={{ width: 280, fontFamily: 'sans-serif' }}>
        {loading ? (
          <div aria-busy="true" aria-label="Carregando perfil" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Skeleton width={64} height={64} radius="circle" />
            <Skeleton height={18} width="70%" />
            <Skeleton lines={3} height={14} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f12c4c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 24 }}>JS</div>
            <p style={{ color: 'var(--color-text-primary)', fontWeight: 600, margin: 0 }}>João Silva</p>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              Desenvolvedor front-end apaixonado por design systems e boas práticas de acessibilidade.
            </p>
          </div>
        )}
      </div>
    )
  },
}
