"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type TrackedEvent } from "@/lib/analytics";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  event: TrackedEvent;
  source: string;
  external?: boolean;
  children: ReactNode;
}

/** An <a> that records a click before the browser follows it. */
export function TrackedLink({ href, event, source, external, children, ...rest }: Props) {
  return (
    <a
      href={href}
      onClick={() => track(event, { source })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
