import { create } from 'zustand';
import type { Scene } from '../types/schema';

type AppPhase = 'topic' | 'plot' | 'editor';

interface ScriptState {
    // Navigation / Flow State
    currentPhase: AppPhase;
    setPhase: (phase: AppPhase) => void;

    // Data State
    generatedPlots: string[];
    setGeneratedPlots: (plots: string[]) => void;

    scenes: Scene[];
    updateScene: (index: number, updates: Partial<Scene>) => void;
    addScene: () => void;
    setAudioForScene: (index: number, audioUrl: string) => void;
}

// Initial Mock Data
const INITIAL_SCENES: Scene[] = [
    {
        id: 'scene-1',
        type: 'story_image',
        durationInFrames: 90, // 3 sec default
        script: "어느 맑은 가을 아침, 민수 할아버지는 오래된 사진첩을 꺼내 들었습니다.",
        imagePrompt: "Korean senior man sitting in a sunlit living room, holding an old photo album, warm atmosphere, cinematic lighting",
    },
    {
        id: 'scene-2',
        type: 'story_image',
        durationInFrames: 90,
        script: "그 사진 속에는 젊은 시절의 자신과, 이제는 곁에 없는 아내의 환한 미소가 담겨 있었습니다.",
        imagePrompt: "Close up shot of an old photograph showing a young korean couple smiling, vintage texture, nostalgic feeling",
    }
];

export const useScriptStore = create<ScriptState>((set) => ({
    currentPhase: 'topic', // Start at Topic Input
    setPhase: (phase) => set({ currentPhase: phase }),

    generatedPlots: [],
    setGeneratedPlots: (plots) => set({ generatedPlots: plots }),

    scenes: INITIAL_SCENES,

    updateScene: (index, updates) => set((state) => {
        const newScenes = [...state.scenes];
        newScenes[index] = { ...newScenes[index], ...updates };
        return { scenes: newScenes };
    }),

    addScene: () => set((state) => ({
        scenes: [
            ...state.scenes,
            {
                id: `scene-${Date.now()}`,
                type: 'story_image',
                durationInFrames: 90,
                script: "",
                imagePrompt: "",
            }
        ]
    })),

    setAudioForScene: (index, audioUrl) => set((state) => {
        const newScenes = [...state.scenes];
        newScenes[index] = { ...newScenes[index], audioUrl };
        return { scenes: newScenes };
    })
}));
