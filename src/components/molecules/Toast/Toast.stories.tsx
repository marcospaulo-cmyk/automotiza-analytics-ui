import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from './Toaster'
import { toast } from './toast'
import { Button } from '../../atoms/Button'

const meta = {
  title: 'molecules/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Sistema de notificações imperativo — sem React Context, sem props drilling.',
          '',
          '**Setup:** adicione `<Toaster />` uma vez no root da aplicação:',
          '```tsx',
          '// app/layout.tsx (Next.js) ou main.tsx (Vite)',
          "import { Toaster } from '@blaze-squad/ui'",
          '',
          'export default function RootLayout({ children }) {',
          '  return (',
          '    <html>',
          '      <body>',
          '        {children}',
          '        <Toaster position="bottom-right" />',
          '      </body>',
          '    </html>',
          '  )',
          '}',
          '```',
          '',
          '**Uso:**',
          '```tsx',
          "import { toast } from '@blaze-squad/ui'",
          '',
          "toast('Mensagem simples')",
          "toast.success('Aposta registrada!')",
          "toast.error('Falha ao processar', { description: 'Tente novamente.' })",
          "toast.promise(salvarAposta(), {",
          "  loading: 'Salvando...',",
          "  success: 'Aposta salva!',",
          "  error: 'Erro ao salvar.',",
          '})',
          '```',
          '',
          '**Acessibilidade:**',
          '- `error` / `warning` → `role="alert"` (interrupto)',
          '- outros → `role="status"` com `aria-live="polite"`',
        ].join('\n'),
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Wrapper que inclui o Toaster localmente para o Storybook
const WithToaster = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <Toaster position="bottom-right" />
  </>
)

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: {
      description: { story: 'Dispare cada tipo de toast clicando nos botões.' },
    },
    controls: { disable: true },
  },
  render: () => (
    <WithToaster>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontFamily: 'sans-serif' }}>
        <Button size="sm" onClick={() => toast('Mensagem padrão')}>
          Default
        </Button>
        <Button size="sm" onClick={() => toast.success('Aposta registrada com sucesso!')}>
          Success
        </Button>
        <Button size="sm" onClick={() => toast.error('Falha ao processar pagamento.', { description: 'Verifique seus dados.' })}>
          Error
        </Button>
        <Button size="sm" onClick={() => toast.warning('Saldo baixo. Recarregue sua conta.')}>
          Warning
        </Button>
        <Button size="sm" onClick={() => toast.info('Nova versão disponível.')}>
          Info
        </Button>
        <Button
          size="sm"
          onClick={() =>
            toast.success('Aposta salva!', {
              action: {
                label: 'Desfazer',
                onClick: () => toast.info('Aposta desfeita.'),
              },
            })
          }
        >
          Com ação
        </Button>
        <Button size="sm" variant="outline" onClick={() => toast.dismiss()}>
          Fechar todos
        </Button>
      </div>
    </WithToaster>
  ),
}

// ── Promise ───────────────────────────────────

export const Promise: Story = {
  name: 'Uso / toast.promise',
  parameters: {
    docs: {
      description: {
        story: 'Loading → Success automático. Clique "Falhar" para ver o estado de erro.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    function fakeRequest(shouldFail: boolean) {
      return new globalThis.Promise<{ id: number }>((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) reject(new Error('Timeout'))
          else resolve({ id: Math.floor(Math.random() * 1000) })
        }, 2000)
      })
    }

    return (
      <WithToaster>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            size="sm"
            onClick={() =>
              toast.promise(fakeRequest(false), {
                loading: 'Processando aposta...',
                success: (data) => `Aposta #${data.id} registrada!`,
                error: 'Falha ao processar.',
              })
            }
          >
            Simular sucesso
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              toast.promise(fakeRequest(true), {
                loading: 'Processando aposta...',
                success: 'Aposta registrada!',
                error: (err) => `Erro: ${(err as Error).message}`,
              })
            }
          >
            Simular erro
          </Button>
        </div>
      </WithToaster>
    )
  },
}

// ── Posições ──────────────────────────────────

export const Positions: Story = {
  name: 'Uso / Posições',
  parameters: { controls: { disable: true } },
  render: () => {
    const positions = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right',
    ] as const

    return (
      <WithToaster>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {positions.map((pos) => (
            <Button
              key={pos}
              size="sm"
              variant="outline"
              onClick={() => toast.info(`Position: ${pos}`, { duration: 2000 })}
            >
              {pos}
            </Button>
          ))}
        </div>
        {/* Renderiza um Toaster por posição para a demonstração */}
        {positions.map((pos) => (
          <Toaster key={pos} position={pos} visibleToasts={1} />
        ))}
      </WithToaster>
    )
  },
}

// ── Com descrição ────────────────────────────

export const WithDescription: Story = {
  name: 'Uso / Com descrição',
  parameters: { controls: { disable: true } },
  render: () => (
    <WithToaster>
      <Button
        size="sm"
        onClick={() =>
          toast.error('Transação recusada', {
            description: 'Saldo insuficiente. Recarregue sua conta para continuar.',
            duration: 8000,
          })
        }
      >
        Disparar com descrição
      </Button>
    </WithToaster>
  ),
}
