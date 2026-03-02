import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Field } from './Field'
import { Input } from '../../atoms/Input'
import { Textarea } from '../../atoms/Textarea'

const meta = {
  title: 'molecules/Field',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Wrapper de campo de formulário com injeção automática de atributos ARIA.',
          '',
          '**Por que usar Field em vez de usar Input diretamente?**',
          '',
          'O `Field.Root` gera IDs automáticos e distribui via Context para todos os sub-componentes:',
          '- `Field.Label` recebe `htmlFor` automaticamente',
          '- `Field.Control` injeta `aria-labelledby`, `aria-describedby`, `aria-invalid` no filho',
          '- `Field.Description` e `Field.Error` recebem os IDs correspondentes',
          '',
          '**Sub-componentes:**',
          '- `<Field.Root>` — provider do contexto',
          '- `<Field.Label>` — label com suporte a asterisco de required',
          '- `<Field.Control>` — injeta ARIA no filho via `cloneElement`',
          '- `<Field.Description>` — texto de ajuda',
          '- `<Field.Error>` — mensagem de erro com `role="alert"`',
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
    <Field.Root style={{ maxWidth: 360 }}>
      <Field.Label>E-mail</Field.Label>
      <Field.Control>
        <input
          type="email"
          placeholder="voce@exemplo.com"
          style={{
            width: '100%',
            padding: '10px 14px',
            background: 'var(--color-background-input)',
            border: '1px solid transparent',
            borderRadius: 8,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </Field.Control>
      <Field.Description>Nunca compartilharemos seu e-mail.</Field.Description>
    </Field.Root>
  ),
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Todos os estados: normal, inválido, required, com hint.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 380 }}>
      <Field.Root>
        <Field.Label>Nome completo</Field.Label>
        <Field.Control>
          <Input label="Nome completo" />
        </Field.Control>
        <Field.Description>Como aparece no seu documento.</Field.Description>
      </Field.Root>

      <Field.Root required>
        <Field.Label>E-mail</Field.Label>
        <Field.Control>
          <Input label="E-mail" type="email" />
        </Field.Control>
        <Field.Description>Usado para login e notificações.</Field.Description>
      </Field.Root>

      <Field.Root invalid>
        <Field.Label>Senha</Field.Label>
        <Field.Control>
          <Input label="Senha" type="password" error="A senha deve ter ao menos 8 caracteres." />
        </Field.Control>
        <Field.Error>A senha deve ter ao menos 8 caracteres.</Field.Error>
      </Field.Root>
    </div>
  ),
}

// ── Com Input nativo ──────────────────────────

export const WithNativeInput: Story = {
  name: 'Uso / Input nativo',
  parameters: {
    docs: {
      description: {
        story:
          'Field.Control funciona com qualquer elemento que aceite `id`, `aria-*`. Aqui com `<input>` nativo.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <Field.Root required style={{ maxWidth: 360 }}>
      <Field.Label>CPF</Field.Label>
      <Field.Control>
        <input
          type="text"
          placeholder="000.000.000-00"
          style={{
            width: '100%',
            padding: '10px 14px',
            background: 'var(--color-background-input)',
            border: '1px solid transparent',
            borderRadius: 8,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 14,
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </Field.Control>
      <Field.Description>Digite apenas números.</Field.Description>
    </Field.Root>
  ),
}

// ── Com Textarea ──────────────────────────────

export const WithTextarea: Story = {
  name: 'Uso / Textarea',
  parameters: { controls: { disable: true } },
  render: () => (
    <Field.Root style={{ maxWidth: 400 }}>
      <Field.Label>Mensagem</Field.Label>
      <Field.Control>
        <Textarea label="Mensagem" minRows={4} />
      </Field.Control>
      <Field.Description>Máximo 500 caracteres.</Field.Description>
    </Field.Root>
  ),
}

// ── Validação dinâmica ────────────────────────

export const DynamicValidation: Story = {
  name: 'Uso / Validação dinâmica',
  parameters: {
    docs: {
      description: {
        story: 'Controla `invalid` dinamicamente baseado no valor do campo.',
      },
    },
    controls: { disable: true },
  },
  render: () => {
    const [value, setValue] = useState('')
    const isInvalid = value.length > 0 && !value.includes('@')

    return (
      <Field.Root invalid={isInvalid} required style={{ maxWidth: 360 }}>
        <Field.Label>E-mail</Field.Label>
        <Field.Control>
          <Input
            label="E-mail"
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            error={isInvalid ? 'Insira um e-mail válido.' : undefined}
          />
        </Field.Control>
        {!isInvalid && <Field.Description>Usaremos para enviar notificações.</Field.Description>}
        {isInvalid && <Field.Error>Insira um e-mail válido.</Field.Error>}
      </Field.Root>
    )
  },
}
