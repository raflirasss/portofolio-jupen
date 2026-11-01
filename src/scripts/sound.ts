/**
 * Paper sound effects, synthesised with the Web Audio API — no audio files to
 * download. Filtered noise bursts make convincing page rustles and thumps.
 *
 * Sound is on by default (siteConfig.sound.defaultOn) and every click plays a
 * soft paper "tap" (siteConfig.sound.clickSound). The mute button in the
 * corner toggles everything; the visitor's choice is remembered.
 */
import { siteConfig } from "../config/site.config";
import { storage } from "./motion";

type SoundName = "flip" | "open" | "close" | "tap";

const STORAGE_KEY = "storybook:sound";

export class SoundFX {
  private ctx: AudioContext | null = null;
  private noise: AudioBuffer | null = null;
  private enabled: boolean;
  private toggle: HTMLButtonElement | null;

  constructor() {
    const saved = storage.get(STORAGE_KEY);
    this.enabled = siteConfig.sound.enabled && (saved === null ? siteConfig.sound.defaultOn : saved === "on");
    this.toggle = document.querySelector<HTMLButtonElement>("[data-sound-toggle]");
    this.toggle?.addEventListener("click", () => this.setEnabled(!this.enabled));
    this.syncToggle();

    if (siteConfig.sound.clickSound) {
      // Capture phase, so it fires even if a component stops propagation.
      document.addEventListener(
        "click",
        (e) => {
          if (this.toggle && e.target instanceof Node && this.toggle.contains(e.target)) return;
          this.play("tap");
        },
        true,
      );
    }
  }

  get isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    storage.set(STORAGE_KEY, on ? "on" : "off");
    this.syncToggle();
    if (on) this.play("tap");
  }

  private syncToggle(): void {
    if (!this.toggle) return;
    // aria-pressed = "sound is on"; the label says what a press will do.
    this.toggle.setAttribute("aria-pressed", String(this.enabled));
    const label = this.enabled ? "Mute sound effects" : "Unmute sound effects";
    this.toggle.setAttribute("aria-label", label);
    this.toggle.title = label;
  }

  /** Audio contexts may only start after a user gesture; this is always called from one. */
  private ensureContext(): AudioContext | null {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
      const length = this.ctx.sampleRate * 1.2;
      this.noise = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** A burst of band-passed noise with a frequency sweep. */
  private rustle(at: number, dur: number, from: number, to: number, gain: number, q = 0.9): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = q;
    filter.frequency.setValueAtTime(from, at);
    filter.frequency.exponentialRampToValueAtTime(to, at + dur);
    const amp = ctx.createGain();
    const peak = gain * siteConfig.sound.volume;
    amp.gain.setValueAtTime(0.0001, at);
    amp.gain.exponentialRampToValueAtTime(peak, at + dur * 0.25);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(filter).connect(amp).connect(ctx.destination);
    src.start(at, Math.random() * 0.5, dur + 0.05);
  }

  /** A tiny pitched "tick" — gives the tap its crisp start. */
  private blip(at: number, from: number, to: number, dur: number, gain: number): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(from, at);
    osc.frequency.exponentialRampToValueAtTime(to, at + dur);
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(gain * siteConfig.sound.volume, at);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    osc.connect(amp).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  private thump(at: number, gain: number): void {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, at);
    osc.frequency.exponentialRampToValueAtTime(48, at + 0.18);
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(gain * siteConfig.sound.volume, at);
    amp.gain.exponentialRampToValueAtTime(0.0001, at + 0.22);
    osc.connect(amp).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + 0.25);
  }

  play(name: SoundName, delay = 0): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    switch (name) {
      case "flip":
        this.rustle(t, 0.32, 2600, 900, 0.5);
        this.rustle(t + 0.12, 0.26, 4200, 1500, 0.22, 1.4);
        break;
      case "open":
        this.rustle(t, 0.5, 1800, 500, 0.45);
        this.thump(t + 0.42, 0.5);
        break;
      case "close":
        this.rustle(t, 0.35, 1400, 500, 0.35);
        this.thump(t + 0.3, 0.7);
        break;
      case "tap":
        // Soft paper tap: a short rustle plus a quiet woody tick.
        this.rustle(t, 0.07, 3200, 1800, 0.22, 1.6);
        this.blip(t, 900, 520, 0.05, 0.12);
        break;
    }
  }
}
