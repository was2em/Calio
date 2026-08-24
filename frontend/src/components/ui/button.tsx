import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-md hover:brightness-110 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
        neon:
          "bg-[#84ff00] text-[#06180c] shadow-[0_0_15px_rgba(132,255,0,0.4)] hover:bg-[#96ff26] hover:shadow-[0_0_25px_rgba(132,255,0,0.6)] border border-[#84ff00]/50 font-bold",
        avocado:
          "bg-[#4b7012] text-white shadow-md hover:bg-[#588315] hover:shadow-[0_4px_15px_rgba(75,112,18,0.4)] font-bold",
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-500 hover:shadow-red-500/25",
        outline:
          "border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))]",
        secondary:
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-sm hover:bg-[hsl(var(--secondary)/0.8)] border border-[hsl(var(--border))]",
        ghost: "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.12)] hover:text-[hsl(var(--primary))]",
        link: "text-[hsl(var(--primary))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-7 text-base font-bold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

