import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/15 text-primary",
        glass: "glass border-white/10 text-foreground/90",
        outline: "border-border text-muted-foreground",
        teal: "border-brand-teal/30 bg-brand-teal/10 text-brand-teal",
        blue: "border-brand-blue/30 bg-brand-blue/10 text-brand-blue",
        violet: "border-brand-violet/30 bg-brand-violet/10 text-brand-violet",
        amber: "border-brand-amber/30 bg-brand-amber/10 text-brand-amber",
        rose: "border-brand-rose/30 bg-brand-rose/10 text-brand-rose",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
