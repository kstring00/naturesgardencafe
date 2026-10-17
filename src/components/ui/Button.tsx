import { Children, cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

/* Hover is a color change only. No lift, no magnetism. */
const base =
  "inline-flex items-center justify-center rounded-full font-semibold leading-none select-none " +
  "transition-colors duration-200 min-h-12 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-trigo text-tinta hover:bg-trigo-deep hover:text-blanco",
  secondary: "border-2 border-tinta text-tinta bg-transparent hover:bg-tinta hover:text-blanco",
  quiet: "text-tinta underline decoration-trigo decoration-2 underline-offset-4 hover:text-verde",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", asChild = false, className = "", children, ...rest }: ButtonProps) {
  const cls = buttonClass(variant, size, className);
  if (asChild) {
    const child = Children.only(children) as ReactElement<{ className?: string }>;
    if (isValidElement(child)) {
      return cloneElement(child, { className: `${cls} ${child.props.className ?? ""}`.trim() });
    }
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
