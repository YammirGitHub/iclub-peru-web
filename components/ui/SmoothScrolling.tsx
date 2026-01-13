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
        // LERP: Cuanto más bajo, más "pesado/suave".
        // 0.1 es el estándar de Apple. 0.15 puede sentirse lento.
        lerp: 0.1,

        // DURACIÓN: Alternativa a lerp, controla cuánto tarda en frenar.
        duration: 1.2,

        // WHEEL MULTIPLIER: Sensibilidad de la rueda
        wheelMultiplier: 1, // 1.2 a veces se siente artificial, 1 es 1:1 nativo

        // TOUCH MULTIPLIER: CRÍTICO PARA MÓVIL
        // 2 es demasiado sensible. 1 o 0 (desactivar en touch) es mejor.
        // Apple NO usa smooth scroll JS en móviles, usa el nativo.
        // Poner touchMultiplier: 0 hace que en iPhone se sienta nativo (perfecto)
        // y en PC se sienta suave.
        touchMultiplier: 0,

        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        // smoothTouch: false, // Desactivar en móvil para 100% nativo feel
        syncTouch: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
