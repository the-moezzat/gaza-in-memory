import { toast } from "sonner";
import { create } from "zustand";

interface MemoryStore {
  memories: string[];
  addMemory: (memory: string) => void;
  removeMemory: (memory: string) => void;
  editMemory: (memory: string, index: number) => void;
}

const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],
  addMemory: (memory: string) => {
    set((state) => {
      if (state.memories.includes(memory)) {
        // Show toast notification
        if (typeof window !== "undefined") {
          // Assuming you're using a toast library like react-hot-toast
          // If not, you'll need to implement or import a toast function
          toast.error("You've already added this memory before.");
        }
        return { memories: state.memories };
      } else {
        return { memories: [...state.memories, memory] };
      }
    });
  },
  removeMemory: (memory: string) =>
    set((state) => ({
      memories: state.memories.filter((m) => m !== memory),
    })),
  editMemory: (memory: string, index: number) =>
    set((state) => ({
      memories: state.memories.map((m, i) => (i === index ? memory : m)),
    })),
}));

export default useMemoryStore;
