import confetti from "canvas-confetti";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", gain = 0.3) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

function sweep(freqStart: number, freqEnd: number, duration: number, type: OscillatorType = "sine", gain = 0.25) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + duration);
    g.gain.setValueAtTime(gain, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export const sfx = {
  click() {
    playTone(800, 0.06, "sine", 0.15);
  },

  correct() {
    playTone(523, 0.12, "sine", 0.3);
    setTimeout(() => playTone(659, 0.15, "sine", 0.3), 80);
    setTimeout(() => playTone(784, 0.2, "sine", 0.25), 160);
  },

  incorrect() {
    sweep(300, 150, 0.25, "sawtooth", 0.15);
  },

  complete() {
    playTone(523, 0.15, "sine", 0.3);
    setTimeout(() => playTone(659, 0.15, "sine", 0.3), 120);
    setTimeout(() => playTone(784, 0.15, "sine", 0.3), 240);
    setTimeout(() => playTone(1047, 0.3, "sine", 0.3), 360);

    setTimeout(() => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 200);
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
    }, 500);
  },

  streak() {
    [0, 60, 120, 180].forEach((delay, i) => {
      setTimeout(() => playTone(600 + i * 150, 0.12, "sine", 0.2), delay);
    });
  },
};

export const haptic = {
  light() {
    try { navigator.vibrate?.(10); } catch {}
  },
  medium() {
    try { navigator.vibrate?.(25); } catch {}
  },
  heavy() {
    try { navigator.vibrate?.(50); } catch {}
  },
  success() {
    try { navigator.vibrate?.([15, 30, 15]); } catch {}
  },
  error() {
    try { navigator.vibrate?.([50, 30, 50]); } catch {}
  },
};

export function tapClick() {
  sfx.click();
  haptic.light();
}

export function tapCorrect() {
  sfx.correct();
  haptic.success();
}

export function tapIncorrect() {
  sfx.incorrect();
  haptic.error();
}

export function tapComplete() {
  sfx.complete();
  haptic.heavy();
}

export function tapStreak() {
  sfx.streak();
  haptic.success();
}
