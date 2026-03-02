import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './Avatar'

const meta = {
  title: 'atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Exibe foto, iniciais ou ícone genérico de um usuário, nessa ordem de prioridade.',
          '',
          '**Fallback inteligente:** `src` → `name` (iniciais com cor determinística) → ícone genérico.',
          '',
          '**Next.js:** Use `renderImage` para passar `next/image` e aproveitar otimizações (lazy, blur, CDN):',
          '```tsx',
          'import Image from "next/image"',
          '<Avatar',
          '  src="/user.jpg"',
          '  name="Ana Lima"',
          '  renderImage={({ src, alt, className }) => (',
          '    <Image src={src} alt={alt} className={className} fill sizes="40px" />',
          '  )}',
          '/>',
          '```',
          '',
          '**Acessibilidade:** O root recebe `role="img"` e `aria-label` com o nome/alt.',
          'Elementos internos são `aria-hidden`.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    src: { control: 'text' },
    name: { control: 'text' },
    alt: { control: 'text' },
    delayMs: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: {
    size: 'md',
    name: 'João Silva',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// ── Helpers de layout ─────────────────────────

const row = (label: string, children: React.ReactNode) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
    <span style={{ color: '#8c9099', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', width: 80, flexShrink: 0 }}>{label}</span>
    {children}
  </div>
)

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { name: 'João Silva' },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Todos os tamanhos e estados de fallback.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {row('sizes', (
        <>
          <Avatar size="xs" name="Ana Lima" />
          <Avatar size="sm" name="Ana Lima" />
          <Avatar size="md" name="Ana Lima" />
          <Avatar size="lg" name="Ana Lima" />
          <Avatar size="xl" name="Ana Lima" />
        </>
      ))}
      {row('com foto', (
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?img=3"
          name="Carlos Motta"
        />
      ))}
      {row('iniciais', (
        <>
          <Avatar size="md" name="Ana Lima" />
          <Avatar size="md" name="Carlos Motta" />
          <Avatar size="md" name="Rafaela" />
        </>
      ))}
      {row('sem nome', (
        <Avatar size="md" />
      ))}
    </div>
  ),
}

// ── Sizes ─────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Avatar size={s} name="Maria Beatriz" />
          <span style={{ color: '#8c9099', fontSize: 11 }}>{s}</span>
        </div>
      ))}
    </div>
  ),
}

// ── Fallback colors ───────────────────────────

export const FallbackColors: Story = {
  name: 'Estados / Cores determinísticas',
  parameters: {
    docs: {
      description: {
        story: 'Cor gerada por hash do nome completo — sempre igual para o mesmo nome.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {[
        'Ana Lima', 'Carlos Motta', 'Rafaela Santos', 'Bruno Alves',
        'Fernanda Cruz', 'Diego Nunes', 'Juliana Prado', 'Thiago Rocha',
      ].map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Avatar name={name} size="md" />
          <span style={{ color: '#8c9099', fontSize: 10, textAlign: 'center', maxWidth: 56 }}>{name.split(' ')[0]}</span>
        </div>
      ))}
    </div>
  ),
}

// ── With image ────────────────────────────────

export const WithImage: Story = {
  name: 'Estados / Com imagem',
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'Fernanda Cruz',
    size: 'lg',
  },
}

// ── Broken image → fallback ───────────────────

export const BrokenImage: Story = {
  name: 'Estados / Imagem quebrada → fallback',
  args: {
    src: 'https://broken-url.example.com/avatar.jpg',
    name: 'Diego Nunes',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Quando `src` falha ao carregar, exibe automaticamente as iniciais.',
      },
    },
  },
}

// ── Group stack ───────────────────────────────

export const GroupStack: Story = {
  name: 'Padrão / Avatar Group',
  parameters: {
    docs: {
      description: { story: 'Stack de avatares com overlap — padrão comum em listas de membros.' },
    },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex' }}>
      {[
        { name: 'Ana Lima',      src: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Carlos Motta', src: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Rafaela S.',   src: undefined },
        { name: 'Bruno Alves',  src: undefined },
      ].map((u, i) => (
        <div
          key={u.name}
          style={{
            marginLeft: i === 0 ? 0 : -10,
            zIndex: 4 - i,
            borderRadius: '50%',
            outline: '2px solid var(--color-background-default)',
          }}
        >
          <Avatar src={u.src} name={u.name} size="sm" />
        </div>
      ))}
    </div>
  ),
}

// ── Next.js render prop ───────────────────────

export const RenderImageProp: Story = {
  name: 'Integração / renderImage (Next.js)',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstração do prop `renderImage`. Em produção, substitua o `<img>` por `<Image>` do next/image.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <Avatar
      src="https://i.pravatar.cc/150?img=8"
      name="Juliana Prado"
      size="lg"
      renderImage={({ src, alt, className }) => (
        // Simula como seria um next/image com fill
        <img src={src} alt={alt} className={className} style={{ objectFit: 'cover' }} />
      )}
    />
  ),
}
