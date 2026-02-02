import React from 'react';
import { Composition } from 'remotion';
import '../styles/globals.css';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="MyVideo"
                component={() => <div className="text-white text-4xl font-bold flex items-center justify-center h-full w-full bg-slate-900">Hello S2V-AI</div>}
                durationInFrames={300}
                fps={30}
                width={1920}
                height={1080}
            />
        </>
    );
};
