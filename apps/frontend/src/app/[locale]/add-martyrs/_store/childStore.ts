import { create } from "zustand";

type Child = {
  id: number;
  name: string;
  age: number;
  gender: string;
  status: "alive" | "dead" | "wounded";
  dod?: Date; // Date of Death, optional
  cause?: string; // Cause of death, optional
};

interface ChildState {
  children: Child[];
  addChild: (child: Child) => void;
  removeChild: (child: Child) => void;
  updateChild: (child: Child) => void;
}

export const useChildStore = create<ChildState>()((set) => ({
  children: [],
  addChild: (child) =>
    set((state) => ({
      children: [...state.children, child],
    })),
  removeChild: (child) =>
    set((state) => ({
      children: state.children.filter((c) => c.id !== child.id),
    })),
  updateChild: (child) =>
    set((state) => ({
      children: state.children.map((c) => (c.id === child.id ? child : c)),
    })),
}));
