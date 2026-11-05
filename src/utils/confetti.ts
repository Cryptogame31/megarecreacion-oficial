import confetti from 'canvas-confetti';

export const triggerPartyConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f43f5e', '#06b6d4', '#eab308'],
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ec4899', '#10b981', '#a855f7'],
    });
  }, 250);
};

export const createWhatsAppUrl = (message: string, useSecondPhone = false) => {
  const phone = useSecondPhone ? '573163048505' : '573197188973';
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};