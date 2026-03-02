import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input with floating label. The label starts centered and floats to the top on focus or when a value is present. Supports error state and an optional suffix slot.',
      },
    },
    a11y: { config: {} },
  },
  args: {
    label: 'Endereço de Email',
    type: 'text',
    disabled: false,
  },
  argTypes: {
    label: {
      description: 'Label text — acts as the floating placeholder.',
      control: 'text',
    },
    type: {
      description: 'Native input type.',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'search', 'url'],
      table: { defaultValue: { summary: 'text' } },
    },
    error: {
      description: 'Error message displayed below the input. Also turns the border and label red.',
      control: 'text',
    },
    disabled: {
      description: 'When `true`, the input is non-interactive and visually dimmed.',
      control: 'boolean',
      table: { defaultValue: { summary: 'false' } },
    },
    suffix: {
      description: 'Node rendered on the right side of the input (icon, button, etc.).',
      control: false,
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: { description: { story: 'Empty input. Click to see the label float.' } },
  },
}

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: 'Overview',
  parameters: {
    docs: { description: { story: 'Main states at a glance.' } },
    controls: { disable: true },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px', fontFamily: 'sans-serif' }}>
      <Input label="Endereço de Email" />
      <Input label="Endereço de Email" defaultValue="usuario@blaze.com" />
      <Input label="Senha" type="password" defaultValue="secret" />
      <Input label="Endereço de Email" error="Email inválido" defaultValue="usuario" />
      <Input label="Endereço de Email" disabled />
    </div>
  ),
}

// ── States ────────────────────────────────────

export const StateWithValue: Story = {
  name: 'States / With value',
  args: { label: 'Endereço de Email', defaultValue: 'usuario@blaze.com' },
  parameters: {
    docs: { description: { story: 'Label floated — input has a pre-filled value.' } },
  },
}

export const StateError: Story = {
  name: 'States / Error',
  args: { label: 'Endereço de Email', defaultValue: 'usuario', error: 'Insira um email válido.' },
  parameters: {
    docs: { description: { story: 'Error state with message below the input.' } },
  },
}

export const StateDisabled: Story = {
  name: 'States / Disabled',
  args: { label: 'Endereço de Email', disabled: true },
  parameters: {
    docs: { description: { story: 'Non-interactive input.' } },
  },
}

// ── Suffix ────────────────────────────────────

export const WithSuffix: Story = {
  name: 'Usage / With suffix',
  parameters: {
    docs: { description: { story: 'Password input with show/hide toggle — suffix slot in use.' } },
    controls: { disable: true },
  },
  render: () => {
    const [show, setShow] = useState(false)
    const EyeIcon = () => (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: 'pointer' }}
        onClick={() => setShow(v => !v)}
      >
        {show ? (
          <>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </>
        ) : (
          <>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </>
        )}
      </svg>
    )
    return (
      <div style={{ width: '320px' }}>
        <Input
          label="Senha"
          type={show ? 'text' : 'password'}
          suffix={<EyeIcon />}
        />
      </div>
    )
  },
}
