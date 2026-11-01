/** Small environment helpers shared by every script. */
import { siteConfig } from "../config/site.config";

export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fine pointer (mouse / trackpad) that can hover. */
export const hasFinePointer = (): boolean =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** One page at a time (phones / narrow windows). Mirrors the CSS breakpoint generated in theme.ts. */
export const singlePageQuery = (): MediaQueryList =>
  window.matchMedia(`(max-width: ${siteConfig.book.singlePageBreakpoint}px)`);

/** Lite mode (low-end devices): set on <html> at boot by main.ts. */
export const isLite = (): boolean => document.documentElement.classList.contains("lite");

/**
 * Decide whether to run in lite mode. "auto" picks it for devices that report
 * little memory / few CPU cores, or when the visitor asked to save data.
 */
export function detectLite(setting: boolean | "auto"): boolean {
  if (setting !== "auto") return setting;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
  const fewCores = (nav.hardwareConcurrency || 8) <= 4;
  return lowMemory || fewCores || !!nav.connection?.saveData;
}

export const clamp = (v: number, min: number, max: number): number => Math.min(max, Math.max(min, v));

export const nextFrame = (): Promise<void> => new Promise((r) => requestAnimationFrame(() => r()));

export function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): (...args: Parameters<T>) => void {
  let t: number | undefined;
  return (...args) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => fn(...args), ms);
  };
}

/** localStorage that never throws (private mode, blocked storage…). */
export const storage = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};
