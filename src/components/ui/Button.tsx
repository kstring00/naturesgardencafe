import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold leading-none " +
  "transition-[transform,background-color,box-shadow,color] duration-200 ease-out select-none " +
  "active:scale-[0.97] disabled:opacity-50 min-h-12";

const variants: Record<Variant, string> = {
  primary:
    "bg-dorado text-tinta shadow-[0_8px_24px_-10px_rgba(185,135,42,0.7)] " +
    "hover:bg-dorado-deep hover:text-crema hover:shadow-[0_12px_28px_-10px_rgba(185,135,42,0.8)]",
  secondary:
    "border-2 border-tinta/80 text-tinta bg-transparent hover:bg-tinta hover:text-crema",
  ghost: "text-tinta underline decoration-dorado decoration-2 underline-offset-4 hover:text-oliva",
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
  /** Render the class onto the single child (e.g. a Link or <a>) instead of a <button>. */
  asChild?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = buttonClass(variant, size, className);
  if (asChild) {
    const child = Children.only(children) as ReactElement<{ className?: string }>;
    if (isValidElement(child)) {
      return cloneElement(child, {
        className: `${cls} ${child.props.className ?? ""}`.trim(),
      });
    }
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
