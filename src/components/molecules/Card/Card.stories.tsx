import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardAction, CardFooter,
} from './Card'
import { Button } from '../../atoms/Button'
import { Badge } from '../../atoms/Badge'

const meta = {
  title: 'molecules/Card',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Container de conteúdo estruturado com sub-componentes compostos.',
          '',
          '**Sub-componentes:**',
          '- `<Card>` / `<CardHeader>` / `<CardTitle>` / `<CardDescription>`',
          '- `<CardContent>` / `<CardAction>` / `<CardFooter>`',
          '',
          '**Elemento semântico:** Todos os sub-componentes são `<div>` por padrão.',
          'Escolha o elemento adequado no contexto de uso (artigo, seção, etc.) via wrappers externos.',
          '',
          '**Interactive card:** use `interactive` + um `<a>` dentro de `CardContent` com CSS stretched-link',
          'para tornar o card inteiro clicável de forma acessível.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardHeader>
        <CardTitle>Saldo disponível</CardTitle>
        <CardDescription>Atualizado agora há pouco.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-numeric)' }}>
          R$ 1.234,56
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Sacar</Button>
        <Button size="sm" variant="outline">Depositar</Button>
      </CardFooter>
    </Card>
  ),
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Diferentes composições do Card.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {/* Card simples */}
      <Card style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Card básico</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 14 }}>
            Conteúdo do card sem footer.
          </p>
        </CardContent>
      </Card>

      {/* Com action */}
      <Card style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Com ação</CardTitle>
          <CardDescription>Subtítulo descritivo.</CardDescription>
          <CardAction>
            <Badge label="Novo" variant="primary" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 14 }}>
            Slot de ação no canto superior direito.
          </p>
        </CardContent>
      </Card>

      {/* Flush (sem padding no content) */}
      <Card style={{ width: 280 }}>
        <CardHeader>
          <CardTitle>Imagem full-bleed</CardTitle>
        </CardHeader>
        <CardContent flush>
          <img
            src="https://picsum.photos/seed/blaze/560/200"
            alt="Imagem ilustrativa"
            style={{ width: '100%', display: 'block' }}
          />
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">Ver mais</Button>
        </CardFooter>
      </Card>
    </div>
  ),
}

// ── Interactive ───────────────────────────────

export const Interactive: Story = {
  name: 'Variants / Interactive',
  parameters: {
    docs: {
      description: {
        story:
          'Card clicável com hover/focus via `interactive`. Link stretched cobre todo o card de forma acessível.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {[
        { title: 'Futebol ao vivo', desc: 'Brasil vs Argentina', badge: 'AO VIVO' },
        { title: 'Basquete NBA', desc: 'Lakers vs Celtics', badge: 'EM BREVE' },
        { title: 'Tênis Grand Slam', desc: 'Djokovic vs Alcaraz', badge: 'AMANHÃ' },
      ].map((item) => (
        <Card key={item.title} interactive style={{ width: 200 }}>
          <CardHeader>
            <CardTitle as="h4" style={{ fontSize: 14 }}>{item.title}</CardTitle>
            <CardAction>
              <Badge label={item.badge} variant={item.badge === 'AO VIVO' ? 'error' : 'primary'} size="sm" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 13 }}>{item.desc}</p>
            {/* Link stretched — cobre todo o card */}
            <a
              href="#"
              aria-label={item.title}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
              }}
              onClick={(e) => e.preventDefault()}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

// ── Estatísticas ──────────────────────────────

export const StatsCard: Story = {
  name: 'Padrões / Estatística',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {[
        { label: 'Apostas hoje', value: '1.284', trend: '+12%', color: 'var(--color-status-success)' },
        { label: 'Receita bruta', value: 'R$ 48.290', trend: '+5.3%', color: 'var(--color-status-success)' },
        { label: 'Cancelamentos', value: '37', trend: '-2%', color: 'var(--color-status-error)' },
      ].map((s) => (
        <Card key={s.label} style={{ minWidth: 180 }}>
          <CardContent>
            <p style={{ margin: '0 0 8px', fontSize: 12, color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {s.label}
            </p>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-numeric)', lineHeight: 1 }}>
              {s.value}
            </p>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: s.color, fontWeight: 600 }}>
              {s.trend} em relação a ontem
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
