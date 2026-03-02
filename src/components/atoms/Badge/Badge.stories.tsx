import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component used to indicate status, categories, or counts. Supports 5 color variants, 2 sizes, and pill or square shape.",
      },
    },
    a11y: { config: {} },
  },
  args: {
    label: "Badge",
    variant: "primary",
    size: "md",
    pill: true,
  },
  argTypes: {
    variant: {
      description: "Sets the semantic color of the badge.",
      control: "select",
      options: ["primary", "success", "error", "warning", "info"],
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      description: "Size of the badge.",
      control: "radio",
      options: ["sm", "md"],
      table: {
        defaultValue: { summary: "md" },
      },
    },
    pill: {
      description:
        "If `true`, applies full border-radius (pill shape). If `false`, uses slightly rounded corners (square shape).",
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    label: {
      description: "Text displayed inside the badge.",
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Styles ────────────────────────────────────

const labelStyle: React.CSSProperties = {
  color: "#8c9099",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "0 12px 8px 0",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const cellStyle: React.CSSProperties = {
  padding: "10px 16px",
};

// ── Default ───────────────────────────────────

export const Default: Story = {
  name: "Default",
  parameters: {
    docs: {
      description: {
        story:
          "Default state of the Badge component with all standard props applied.",
      },
    },
  },
};

// ── Overview ──────────────────────────────────

export const Overview: Story = {
  name: "Overview",
  parameters: {
    controls: { disable: true },
  },
  render: () => {
    const variants = [
      "primary",
      "success",
      "error",
      "warning",
      "info",
    ] as const;
    const sizes = ["sm", "md"] as const;

    return (
      <table style={{ borderCollapse: "collapse", fontFamily: "sans-serif" }}>
        <thead>
          <tr>
            <th style={labelStyle} />
            {variants.map((v) => (
              <th key={v} style={labelStyle}>
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => (
            <tr key={size}>
              <td style={labelStyle}>{size}</td>
              {variants.map((variant) => (
                <td key={variant} style={cellStyle}>
                  <Badge label={variant} variant={variant} size={size} />
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td style={labelStyle}>pill</td>
            {variants.map((variant) => (
              <td key={variant} style={cellStyle}>
                <Badge label={variant} variant={variant} size="md" pill />
              </td>
            ))}
          </tr>
          <tr>
            <td style={labelStyle}>square</td>
            {variants.map((variant) => (
              <td key={variant} style={cellStyle}>
                <Badge
                  label={variant}
                  variant={variant}
                  size="md"
                  pill={false}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  },
};

// ── Colors ────────────────────────────────────

export const ColorPrimary: Story = {
  name: "Colors / Primary",
  args: { variant: "primary" },
  parameters: {
    docs: {
      description: {
        story: "Main variant based on the platform brand color.",
      },
    },
  },
};

export const ColorSuccess: Story = {
  name: "Colors / Success",
  args: { variant: "success", label: "Completed" },
  parameters: {
    docs: {
      description: {
        story: "Indicates success, gain, or completion of an action.",
      },
    },
  },
};

export const ColorError: Story = {
  name: "Colors / Error",
  args: { variant: "error", label: "Failed" },
  parameters: {
    docs: {
      description: {
        story: "Indicates error, failure, or a critical state.",
      },
    },
  },
};

export const ColorWarning: Story = {
  name: "Colors / Warning",
  args: { variant: "warning", label: "Pending" },
  parameters: {
    docs: {
      description: {
        story: "Indicates alert, attention required, or a pending state.",
      },
    },
  },
};

export const ColorInfo: Story = {
  name: "Colors / Info",
  args: { variant: "info", label: "New" },
  parameters: {
    docs: {
      description: {
        story: "Indicates information, novelty, or a neutral highlight.",
      },
    },
  },
};

// ── Sizes ─────────────────────────────────────

export const SizeSmall: Story = {
  name: "Sizes / Small",
  args: { size: "sm", label: "Small" },
  parameters: {
    docs: {
      description: {
        story:
          "Compact size, ideal for use in tables, lists, and tight spaces.",
      },
    },
  },
};

export const SizeMedium: Story = {
  name: "Sizes / Medium",
  args: { size: "md", label: "Medium" },
  parameters: {
    docs: {
      description: {
        story: "Default size recommended for most use cases.",
      },
    },
  },
};

// ── Shape ─────────────────────────────────────

export const ShapePill: Story = {
  name: "Shape / Pill",
  args: { pill: true, label: "Pill" },
  parameters: {
    docs: {
      description: {
        story:
          "Fully rounded corners using the border-radius-pill token. Component default.",
      },
    },
  },
};

export const ShapeSquare: Story = {
  name: "Shape / Square",
  args: { pill: false, label: "Square" },
  parameters: {
    docs: {
      description: {
        story: "Slightly rounded corners using the border-radius-sm token.",
      },
    },
  },
};
