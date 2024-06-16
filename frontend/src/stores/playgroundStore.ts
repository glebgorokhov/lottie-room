import type { Animation } from "@lottiefiles/lottie-types";
import { get as radashGet, set as radashSet } from "radash";
import { create } from "zustand";

import type { Message } from "../../../types/messages.ts";

export type PlaygroundStoreState = {
  playgroundId: string;
  json: Animation | null;
  initialJSON: Animation | null;
  messages: Message[];
  selectedLayers: string[];
  setPlaygroundId: (id: string) => void;
  setJSON: (json: Animation | null) => void;
  setInitialJSON: (initialJSON: Animation | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateProp: (key: string, value: any) => void;
  deleteArrayItem: (key: string, index: number) => void;
  selectLayer: (key: string) => void;
  clearSelectedLayers: () => void;
};

const usePlaygroundStore = create<PlaygroundStoreState>((set) => ({
  playgroundId: "",
  json: null,
  initialJSON: null,
  selectedLayers: [],
  messages: [],
  setPlaygroundId: (id: string) =>
    set({
      playgroundId: id,
    }),
  setJSON: (json: Animation | null) =>
    set({
      json,
    }),
  setInitialJSON: (initialJSON: Animation | null) => set({ initialJSON }),
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateProp: (key, value) =>
    set((state) => ({
      json: state.json ? radashSet(state.json, key, value) : null,
    })),
  deleteArrayItem: (key: string, index) =>
    set((state) => ({
      json: state.json
        ? radashSet(
            state.json,
            key,
            (radashGet(state.json, key) as any[]).filter((_, i) => i !== index)
          )
        : null,
    })),
  selectLayer: (key: string) =>
    set((state) => ({
      selectedLayers: state.selectedLayers.includes(key)
        ? state.selectedLayers.filter((k) => k !== key)
        : [...state.selectedLayers, key],
    })),
  clearSelectedLayers: () => set({ selectedLayers: [] }),
}));

export default usePlaygroundStore;
