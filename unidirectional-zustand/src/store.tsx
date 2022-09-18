import create from 'zustand';

interface ApplicationState {
  email: string;
  gdpr: boolean;
  name: string;
  names?: string[];
  profession: string;
  running: boolean;
  seconds: number;
  onToggle: () => void;
  onToggleGdpr: () => void;
  onIncrement: () => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setProfession: (profession: string) => void;
}

let namesRequest: Promise<{ names: string[] }>;

export const useApplicationState = create<ApplicationState>((set, get) => ({
  seconds: 0,
  running: false,
  names: undefined,
  name: '',
  email: '',
  profession: '',
  gdpr: false,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setProfession: (profession) => set({ profession }),
  onToggleGdpr: () => {
    set((state) => ({
      gdpr: !state.gdpr,
    }));
  },
  onToggle: () => {
    set((state) => ({
      running: !state.running,
    }));
  },
  onIncrement: async () => {
    if (get().running) {
      set((state) => ({
        seconds: state.seconds + 0.1,
      }));
    }
    if (get().seconds > 2.0 && !get().names) {
      namesRequest ||= fetch('/names.json').then((res) => res.json());
      set({ names: (await namesRequest).names });
    }
  },
}));

window.setInterval(() => useApplicationState.getState().onIncrement(), 100);
