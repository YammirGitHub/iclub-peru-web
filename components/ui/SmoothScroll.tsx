// components/ui/SmoothScroll.tsx
"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12, // EL PUNTO DULCE: Rápido pero con inercia de lujo.
        duration: 1.2, // Duración perfecta para sentir el peso.
        smoothWheel: true,
        wheelMultiplier: 1, // 1:1 con el dedo/mouse, sin aceleración falsa.
      }}
      // IMPORTANTE: Pasamos children aquí con "as any" para arreglar el error de tipos y mostrar tu web
      children={children as any}
    />
  );
}
