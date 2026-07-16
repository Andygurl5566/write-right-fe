// src/utils/celebrate.js
import confetti from "canvas-confetti";

export function celebrate() {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = [
    "#2563eb", // blue
    "#22c55e", // green
    "#facc15", // gold
    "#ffffff", // white
  ];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 80,
      origin: { x: 0 },
      colors,
      shapes: ["circle", "square"],
    });

    confetti({
      particleCount: 4,
      angle: 120,
      spread: 80,
      origin: { x: 1 },
      colors,
      shapes: ["circle", "square"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  confetti({
    particleCount: 120,
    spread: 110,
    startVelocity: 55,
    origin: { y: 0.6 },
    colors,
    scalar: 1.2,
  });
}