import { ReactNode } from "react";

export function Alert({ children }: { children: ReactNode }) {
  return <p className="alert">{children}</p>;
}
