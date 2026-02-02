export type Genre = 'drama' | 'history' | 'fairy_tale';
export type EpisodeStatus = 'planning' | 'scripting' | 'generating' | 'done';
export type SceneType = 'intro_video' | 'story_image';

export interface CharacterProfile {
    id: string; // Add ID for easier reference
    name: string;
    basePrompt: string; // "Korean senior man, kindly face, wearing grey sweater..."
    seed?: number; // 일관성 유지를 위한 시드
    referenceImageUrls: string[]; // 일관성 참조용 이미지
}

export interface Scene {
    id: string;
    type: SceneType;
    durationInFrames: number; // Remotion uses frames, but spec said seconds. We'll store frames (30fps basis)
    script: string; // 나레이션 대사
    imageUrl?: string; // 생성된 이미지 URL (story_image)
    videoUrl?: string; // 생성된 비디오 URL (intro_video)
    imagePrompt: string; // AI 생성 프롬프트
    audioUrl?: string; // TTS output URL
}

export interface Episode {
    id: string; // spec says EpisodeOutline[] in Series, but Episode here needs ID
    seriesId: string;
    episodeNumber: number;
    title: string;
    status: EpisodeStatus;
    scenes: Scene[];
}

export interface Series {
    id: string;
    title: string;
    genre: Genre;
    mainCharacter: CharacterProfile;
    episodes: Episode[]; // Use full Episode type or Outline? Let's use Episode for simplicity in MVP
    createdAt: string;
}
