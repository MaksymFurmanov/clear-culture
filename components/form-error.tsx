import { ReactNode } from "react";

export default function FormError({children, color = "#ff0505"}: {
  children: ReactNode,
  color?: string
}) {
  return (
    <p style={{ color: color }}>
      {children}
    </p>
  );
}