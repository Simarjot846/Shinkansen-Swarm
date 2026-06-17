import { useCallback, useRef } from "react";

export const useSynthAudio = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeSirenRef = useRef<{ stop: () => void } | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const CustomWindow = window as unknown as {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const AudioContextClass = CustomWindow.AudioContext || CustomWindow.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      } else {
        throw new Error("Web Audio API not supported");
      }
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // 1. Digital Click sound for buttons
  const playClick = useCallback(() => {
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio failed", e);
    }
  }, []);

  // 2. Futuristic warning beep
  const playWarningBeep = useCallback(() => {
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // 3. Siren sound loop (for disasters)
  const startSiren = useCallback(() => {
    try {
      const ctx = initAudio();
      
      // Stop existing if any
      if (activeSirenRef.current) {
        activeSirenRef.current.stop();
      }

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc1.type = "sawtooth";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(350, ctx.currentTime);
      osc2.frequency.setValueAtTime(352, ctx.currentTime); // Slight detune

      // Pitch sweep
      lfo.frequency.setValueAtTime(1.5, ctx.currentTime); // LFO Speed (1.5 Hz)
      lfoGain.gain.setValueAtTime(120, ctx.currentTime); // LFO Depth (+/- 120Hz)

      lfo.connect(lfoGain);
      lfoGain.connect(osc1.frequency);
      lfoGain.connect(osc2.frequency);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.2); // Fade in

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      lfo.start();
      osc1.start();
      osc2.start();

      activeSirenRef.current = {
        stop: () => {
          try {
            const now = ctx.currentTime;
            gainNode.gain.setValueAtTime(gainNode.gain.value, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5); // Fade out
            setTimeout(() => {
              osc1.stop();
              osc2.stop();
              lfo.stop();
            }, 600);
          } catch {
            // ignore
          }
          activeSirenRef.current = null;
        }
      };
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const stopSiren = useCallback(() => {
    if (activeSirenRef.current) {
      activeSirenRef.current.stop();
    }
  }, []);

  // 4. Drone Takeoff sound (rising hum)
  const playDroneLaunch = useCallback(() => {
    try {
      const ctx = initAudio();
      const now = ctx.currentTime;
      const duration = 2.0;

      // Base hum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + duration);

      // High pitch whirring (propellers)
      const oscProp = ctx.createOscillator();
      const gainProp = ctx.createGain();
      oscProp.type = "sawtooth";
      oscProp.frequency.setValueAtTime(200, now);
      oscProp.frequency.exponentialRampToValueAtTime(900, now + duration);

      // Pitch LFO for propellers
      const propLfo = ctx.createOscillator();
      const propLfoGain = ctx.createGain();
      propLfo.frequency.setValueAtTime(25, now); // 25Hz vibration
      propLfoGain.gain.setValueAtTime(15, now);
      propLfo.connect(propLfoGain);
      propLfoGain.connect(oscProp.frequency);

      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      gainProp.gain.setValueAtTime(0.0, now);
      gainProp.gain.linearRampToValueAtTime(0.02, now + 0.5);
      gainProp.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      oscProp.connect(gainProp);
      gain.connect(ctx.destination);
      gainProp.connect(ctx.destination);

      propLfo.start();
      osc.start();
      oscProp.start();

      osc.stop(now + duration);
      oscProp.stop(now + duration);
      propLfo.stop(now + duration);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // 5. Mitigation Success chime
  const playSuccessChime = useCallback(() => {
    try {
      const ctx = initAudio();
      const now = ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5 (Arpeggio)
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        
        gain.gain.setValueAtTime(0.0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.6);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.65);
      });
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return {
    playClick,
    playWarningBeep,
    startSiren,
    stopSiren,
    playDroneLaunch,
    playSuccessChime,
  };
};
