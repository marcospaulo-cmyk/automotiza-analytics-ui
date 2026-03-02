import type { Meta, StoryObj } from '@storybook/react-vite'
import { SimpleGrid, Stack, Container } from './Grid'

const meta = {
  title: 'molecules/Grid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Primitivas de layout baseadas em CSS Grid e Flexbox sem JS.',
          '',
          '**Componentes:**',
          '- `<SimpleGrid>` — grade responsiva com `cols` por breakpoint',
          '- `<Stack>` — coluna ou linha com gap uniforme',
          '- `<Container>` — wrapper de largura máxima centrado',
          '',
          '**`cols` responsivo:**',
          '```tsx',
          '<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} gap={24}>',
          '  {items.map(i => <Card key={i.id} />)}',
          '</SimpleGrid>',
          '```',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Helpers visuais ───────────────────────────

const Box = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      background: 'var(--color-background-elevated)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 8,
      padding: '16px 12px',
      color: 'var(--color-text-secondary)',
      fontSize: 13,
      textAlign: 'center',
      fontFamily: 'var(--font-family-body)',
      ...style,
    }}
  >
    {children}
  </div>
)

// ── SimpleGrid Default ────────────────────────

export const SimpleGridDefault: Story = {
  name: 'SimpleGrid / Default (3 colunas)',
  parameters: { controls: { disable: true } },
  render: () => (
    <SimpleGrid cols={3} gap={16}>
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i}>Col {i + 1}</Box>
      ))}
    </SimpleGrid>
  ),
}

// ── SimpleGrid Responsivo ─────────────────────

export const SimpleGridResponsive: Story = {
  name: 'SimpleGrid / Responsivo',
  parameters: {
    docs: {
      description: {
        story: 'Redimensione a tela para ver as colunas mudarem: 1 → 2 → 3 → 4.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i}>Item {i + 1}</Box>
      ))}
    </SimpleGrid>
  ),
}

// ── SimpleGrid auto-fill ──────────────────────

export const SimpleGridAutoFill: Story = {
  name: 'SimpleGrid / Auto-fill (minColWidth)',
  parameters: {
    docs: {
      description: {
        story:
          'Grade automática — colunas com mínimo de 180px. Adicione mais itens e a grade se adapta.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <SimpleGrid minColWidth="180px" gap={16} autoFlow="auto-fill">
      {Array.from({ length: 7 }, (_, i) => (
        <Box key={i}>Item {i + 1}</Box>
      ))}
    </SimpleGrid>
  ),
}

// ── Stack vertical ────────────────────────────

export const StackVertical: Story = {
  name: 'Stack / Vertical (padrão)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack gap={12} style={{ maxWidth: 300 }}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

// ── Stack horizontal ──────────────────────────

export const StackHorizontal: Story = {
  name: 'Stack / Horizontal',
  parameters: { controls: { disable: true } },
  render: () => (
    <Stack direction="row" gap={12} align="center" wrap>
      {['Futebol', 'Basquete', 'Tênis', 'eSports', 'Vôlei'].map((s) => (
        <Box key={s} style={{ padding: '8px 16px', flexShrink: 0 }}>{s}</Box>
      ))}
    </Stack>
  ),
}

// ── Container ────────────────────────────────

export const ContainerDefault: Story = {
  name: 'Container / Default',
  parameters: {
    docs: {
      description: {
        story: 'Centraliza conteúdo com `max-width: var(--layout-width-max-container)` e padding lateral.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 0', width: '100%' }}>
      <Container px={24}>
        <Box style={{ textAlign: 'left' }}>
          Conteúdo dentro do Container (max-width: 1072px, padding: 24px)
        </Box>
      </Container>
    </div>
  ),
}

// ── Composição ────────────────────────────────

export const Composition: Story = {
  name: 'Composição / Container + SimpleGrid + Stack',
  parameters: {
    docs: {
      description: {
        story: 'Combinação típica em uma página real.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <Container px={24}>
      <Stack gap={24}>
        <Box style={{ textAlign: 'left', padding: '12px 16px' }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Eventos em destaque</strong>
        </Box>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} gap={16}>
          {['Futebol · Br vs AR', 'NBA · Lakers vs Cel', 'Tennis · Wimbledon'].map((t) => (
            <Box key={t} style={{ padding: 20 }}>
              <Stack gap={8} align="flex-start">
                <span style={{ fontSize: 12, color: 'var(--color-brand-primary)', fontWeight: 700 }}>AO VIVO</span>
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{t}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>Odds: 2.15 / 3.40 / 2.80</span>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  ),
}
