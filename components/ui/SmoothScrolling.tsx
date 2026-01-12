"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        // LERP: 0.15
        // El estándar de oro en UX moderna.
        // 0.32 es muy brusco. 0.15 es suave como mantequilla pero se detiene donde quieres.
        lerp: 0.15,

        // WHEEL MULTIPLIER: 1.2
        // Ni muy lento (1.0) ni muy rápido (1.5).
        // Permite recorrer la web sin cansar el dedo, pero sin saltos violentos.
        wheelMultiplier: 1.2,

        // TOUCH MULTIPLIER: 1.5
        // Ajustado para que en móviles se sienta nativo (iOS feel).
        touchMultiplier: 1.5,

        // Infinite: False (Por si acaso, esto evita loops raros)
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
