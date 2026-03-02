import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Alert, AlertTitle, AlertDescription } from './Alert'

const meta = {
  title: 'atoms/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Mensagem de feedback contextual com quatro níveis de severidade.',
          '',
          '**Acessibilidade (WAI-ARIA):**',
          '- `error` e `warning` → `role="alert"` (anuncia imediatamente, interrupto)',
          '- `info` e `success` → `role="status"` com `aria-live="polite"` (anuncia na próxima pausa)',
          '',
          '**Sub-componentes:** `<AlertTitle>` e `<AlertDescription>` para estrutura semântica.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: { control: 'boolean' },
  },
  args: {
    severity: 'info',
    dismissible: false,
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: { severity: 'info' },
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Informação</AlertTitle>
      <AlertDescription>Este é um alerta informativo com título e descrição.</AlertDescription>
    </Alert>
  ),
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Todas as severidades com título e descrição.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <Alert severity="info">
        <AlertTitle>Manutenção agendada</AlertTitle>
        <AlertDescription>O sistema ficará indisponível dia 15/03 das 02h às 04h.</AlertDescription>
      </Alert>
      <Alert severity="success">
        <AlertTitle>Pagamento aprovado</AlertTitle>
        <AlertDescription>Sua transação foi processada com sucesso.</AlertDescription>
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Sessão expirando</AlertTitle>
        <AlertDescription>Sua sessão expira em 5 minutos. Salve seu trabalho.</AlertDescription>
      </Alert>
      <Alert severity="error">
        <AlertTitle>Falha no envio</AlertTitle>
        <AlertDescription>Não foi possível enviar o formulário. Tente novamente.</AlertDescription>
      </Alert>
    </div>
  ),
}

// ── Dismissible ───────────────────────────────

export const Dismissible: Story = {
  name: 'Estados / Dismissível',
  parameters: {
    docs: { description: { story: 'Com botão de fechar. Gerencie a visibilidade externamente.' } },
    controls: { disable: true },
  },
  render: () => {
    const [visible, setVisible] = useState(true)
    return visible ? (
      <Alert severity="warning" dismissible onDismiss={() => setVisible(false)} style={{ maxWidth: 480 }}>
        <AlertTitle>Aviso importante</AlertTitle>
        <AlertDescription>Você tem faturas em atraso. Regularize para continuar.</AlertDescription>
      </Alert>
    ) : (
      <button
        type="button"
        onClick={() => setVisible(true)}
        style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#8c9099', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
      >
        Mostrar alerta novamente
      </button>
    )
  },
}

// ── Severities ────────────────────────────────

export const Severities: Story = {
  name: 'Variants / Severidades',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      {(['info', 'success', 'warning', 'error'] as const).map((s) => (
        <Alert key={s} severity={s}>
          <AlertDescription>Alerta de severidade <strong>{s}</strong>.</AlertDescription>
        </Alert>
      ))}
    </div>
  ),
}

// ── Custom icon ───────────────────────────────

export const CustomIcon: Story = {
  name: 'Variants / Ícone customizado',
  parameters: { controls: { disable: true } },
  render: () => (
    <Alert
      severity="info"
      icon={
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ width: 18, height: 18 }}>
          <path d="M10 2a6 6 0 0 0-6 6v.5a.5.5 0 0 1-1 0V8a7 7 0 1 1 14 0v.5a.5.5 0 0 1-1 0V8a6 6 0 0 0-6-6ZM5 15a5 5 0 0 1 10 0v.5A1.5 1.5 0 0 1 13.5 17h-7A1.5 1.5 0 0 1 5 15.5V15Z" />
        </svg>
      }
      style={{ maxWidth: 480 }}
    >
      <AlertTitle>Novo recurso disponível</AlertTitle>
      <AlertDescription>Experimente o novo painel de análise de apostas em tempo real.</AlertDescription>
    </Alert>
  ),
}

// ── No icon ───────────────────────────────────

export const NoIcon: Story = {
  name: 'Variants / Sem ícone',
  parameters: { controls: { disable: true } },
  render: () => (
    <Alert severity="error" icon={false} style={{ maxWidth: 480 }}>
      <AlertTitle>Erro de autenticação</AlertTitle>
      <AlertDescription>Credenciais inválidas. Verifique e tente novamente.</AlertDescription>
    </Alert>
  ),
}
