import { create } from 'zustand';

export type Settings = {
    wakeLock: boolean,
    retainMusic: boolean,
    soundsPlaying: string[]
}

const saveSettings = (settings: Settings) => {
    localStorage.setItem('tts:settings', JSON.stringify(settings));
}

type SettingsContextData = {
    settings: Settings,
    updateSettings: (settings: Partial<Settings>) => void
}

const defaultSettings: Settings = {
    wakeLock: false,
    retainMusic: false,
    soundsPlaying: []
}

const retrieveSettings = () => {
    const str = localStorage.getItem('tts:settings');

    return str ? JSON.parse(str) : defaultSettings;
}

const useSettingsStore = create<SettingsContextData>((set) => ({
    settings: retrieveSettings(),
    updateSettings: (_settings: Partial<Settings>) => set((state) => {
        saveSettings({
            ...state.settings,
            ..._settings
        });
        return {
            settings: {
                ...state.settings,
                ..._settings
            }
        };
    })
}));

export default function useSettings() {
    const store = useSettingsStore((state) => state);

    return store;
}