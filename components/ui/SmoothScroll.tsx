"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.7,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {/* CORRECCIÓN: Usamos 'as any' para evitar el conflicto de tipos con React 18 */}
      {children as any}
    </ReactLenis>
  );
}
