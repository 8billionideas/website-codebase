"use client";

import { useSyncExternalStore } from "react";
import type { LevelMode } from "@/lib/year-grade";

// Site-wide "Years / Grades" choice, shared by every component that calls useLevelMode()
// and remembered in localStorage. The server (and the first client render) always uses
// "years"; React then switches to the saved value straight after hydration.

const STORAGE_KEY = "8bi-level-mode";
const listeners = new Set<() => void>();
// Used when localStorage is unavailable (private mode, blocked storage) so the toggle still works.
let memoryMode: LevelMode | null = null;

function read(): LevelMode {
  if (memoryMode) return memoryMode;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "grades" ? "grades" : "years";
  } catch {
    return "years";
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Keep other open tabs in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      memoryMode = null;
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function setLevelMode(mode: LevelMode) {
  memoryMode = mode;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Storage unavailable: the in-memory value still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function useLevelMode(): [LevelMode, (mode: LevelMode) => void] {
  const mode = useSyncExternalStore(subscribe, read, () => "years" as LevelMode);
  return [mode, setLevelMode];
}
