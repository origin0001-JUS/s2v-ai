import React from 'react';
import { Player } from '@remotion/player';
import { Sequence, Audio, AbsoluteFill, Img, useCurrentFrame, interpolate } from 'remotion';
import { useScriptStore } from '../../store/useScriptStore';
import type { Scene } from '../../types/schema';

// Component for a single scene
const SceneSequence: React.FC<{ scene: Scene }> = ({ scene }) => {
    const frame = useCurrentFrame();

    // Simple fade in effect
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: "clamp"
    });

    return (
        <AbsoluteFill className="bg-stone-50 items-center justify-center">
            {/* Background Image or Placeholder */}
            {scene.imageUrl ? (
                <Img src={scene.imageUrl} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
                <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-stone-300">
                    {scene.imagePrompt ? "Wait for Image Generation..." : "No Image"}
                </div>
            )}

            {/* Subtitle / Script Overlay */}
            <div style={{ opacity }} className="z-10 absolute bottom-20 px-20 text-center w-full">
                <div className="bg-black/60 p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-3xl font-serif text-white leading-relaxed font-medium shadow-black drop-shadow-md">
                        {scene.script}
                    </p>
                </div>
            </div>

            {/* Audio Track */}
            {scene.audioUrl && <Audio src={scene.audioUrl} />}
        </AbsoluteFill>
    );
};


const PreviewComposition: React.FC = () => {
    const { scenes } = useScriptStore();

    let currentFrame = 0;

    return (
        <AbsoluteFill className="bg-black">
            {scenes.map((scene) => {
                const startFrame = currentFrame;
                const duration = scene.durationInFrames;
                currentFrame += duration;

                return (
                    <Sequence
                        key={scene.id}
                        from={startFrame}
                        durationInFrames={duration}
                    >
                        <SceneSequence scene={scene} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    )
}

export const RemotionPlayerWrapper: React.FC = () => {
    const { scenes } = useScriptStore();
    const totalDuration = scenes.reduce((acc, scene) => acc + scene.durationInFrames, 0);

    return (
        <div className="flex flex-col h-full bg-stone-900 text-stone-50">
            {/* Header */}
            <div className="h-14 flex items-center px-6 border-b border-stone-800">
                <h3 className="text-sm font-bold text-stone-400 tracking-wider">LIVE PREVIEW</h3>
            </div>

            {/* Player Container */}
            <div className="flex-1 flex flex-col">
                <div className="aspect-video w-full bg-black shadow-2xl relative">
                    <Player
                        component={PreviewComposition}
                        durationInFrames={Math.max(totalDuration, 30)} // Min duration 1 sec
                        compositionWidth={1920}
                        compositionHeight={1080}
                        fps={30}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        controls
                    />
                </div>

                {/* Timeline / Status (Placeholder) */}
                <div className="flex-1 p-6">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs text-stone-500 mb-2">
                                <span>Status</span>
                                <span className="text-emerald-500">Ready to Render</span>
                            </div>
                            <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-emerald-500 rounded-full"></div>
                            </div>
                        </div>

                        <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700/50">
                            <h4 className="text-xs font-bold text-stone-400 mb-2">RENDER SETTINGS</h4>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="flex flex-col">
                                    <span className="text-stone-500">Resolution</span>
                                    <span className="text-stone-300">1080p (HD)</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-stone-500">Format</span>
                                    <span className="text-stone-300">MP4 (H.264)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-stone-800 bg-stone-900 z-10">
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg shadow-orange-900/20 hover:scale-[1.02] transition-transform active:scale-95">
                    EXPORT VIDEO
                </button>
            </div>
        </div>
    );
};
