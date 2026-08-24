import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardWrapperVariants = cva(
  "relative rounded-2xl border p-6 transition-all duration-300 backdrop-blur-md overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "border-[hsl(var(--border))] bg-[hsl(var(--card))/0.8] hover:border-[hsl(var(--primary)/0.5)] glow-hover-green",
        interactive:
          "border-[hsl(var(--border))] bg-[hsl(var(--card))/0.7] cursor-pointer hover:border-[hsl(var(--primary))] hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
        neon:
          "border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--card))] shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_2px_hsl(var(--primary)/0.45)] hover:border-[hsl(var(--primary))]",
        gradient:
          "border-[hsl(var(--primary)/0.25)] bg-gradient-to-br from-[hsl(var(--card))] via-[hsl(var(--accent)/0.3)] to-[hsl(var(--card))] hover:border-[hsl(var(--primary)/0.6)] glow-hover-green",
        flat:
          "border-transparent bg-[hsl(var(--secondary)/0.5)] hover:bg-[hsl(var(--secondary)/0.8)]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

export interface CardWrapperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof cardWrapperVariants> {
  icon?: React.ReactNode
  badge?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  glowAccent?: boolean
}


const InteractiveCardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  (
    {
      className,
      variant,
      padding,
      icon,
      badge,
      title,
      description,
      action,
      glowAccent = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardWrapperVariants({ variant, padding, className }),
          glowAccent && "border-[hsl(var(--primary))] shadow-[0_0_25px_hsl(var(--primary)/0.25)]"
        )}
        {...props}
      >
        {/* Subtle decorative glow orb in background */}
        <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[hsl(var(--primary)/0.08)] blur-2xl pointer-events-none group-hover:bg-[hsl(var(--primary)/0.18)] transition-colors duration-500" />

        {(icon || badge || title || action) && (
          <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="p-2.5 rounded-xl bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)] transition-transform duration-300 group-hover:scale-110">
                    {icon}
                  </div>
                )}
                <div>
                  {title && (
                    <h3 className="text-lg font-bold tracking-tight text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
                      {title}
                    </h3>
                  )}
                  {badge && <div className="mt-1">{badge}</div>}
                </div>
              </div>
              {description && (
                <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed pt-1">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)

InteractiveCardWrapper.displayName = "InteractiveCardWrapper"

export { InteractiveCardWrapper, cardWrapperVariants }
