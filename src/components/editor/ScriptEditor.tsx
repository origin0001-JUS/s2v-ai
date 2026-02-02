import React, { useState } from 'react';
import { Mic, RefreshCcw, Lock } from 'lucide-react';
import { GoogleAIService } from '../../services/google_ai';

export const ScriptEditor: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-serif font-bold text-stone-900 mb-2">돌아온 탕자</h1>
                <div className="flex gap-2 text-sm text-stone-500">
                    <span className="px-2 py-0.5 bg-stone-200 rounded text-stone-600 font-medium">Drama</span>
                    <span>•</span>
                    <span>Last edited 2 mins ago</span>
                </div>
            </header>

            {/* Character Sheet (Consistency) */}
            <div className="flex items-center gap-4 p-5 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 shadow-md bg-stone-200">
                    {/* Placeholder for Character Face */}
                    <div className="w-full h-full flex items-center justify-center text-stone-400 text-xs">No Img</div>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-stone-800 text-lg">주인공 (김철수)</h4>
                    <p className="text-sm text-stone-500">"따뜻한 미소의 70대 한국 남성"</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg transition-colors">
                        <Lock className="w-3 h-3" /> Lock Face
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-lg transition-colors">
                        <RefreshCcw className="w-3 h-3" /> Regenerate
                    </button>
                </div>
            </div>

            {/* Script Rows */}
            <div className="space-y-6">
                <SceneRow
                    index={1}
                    script="어느 맑은 가을 아침, 민수 할아버지는 오래된 사진첩을 꺼내 들었습니다."
                    prompt="Korean senior man sitting in a sunlit living room, holding an old photo album, warm atmosphere, cinematic lighting"
                />
                <SceneRow
                    index={2}
                    script="그 사진 속에는 젊은 시절의 자신과, 이제는 곁에 없는 아내의 환한 미소가 담겨 있었습니다."
                    prompt="Close up shot of an old photograph showing a young korean couple smiling, vintage texture, nostalgic feeling"
                />

                {/* New Scene Placeholder */}
                <div className="border-2 border-dashed border-stone-200 rounded-xl p-6 flex items-center justify-center text-stone-400 hover:border-amber-400 hover:text-amber-500 cursor-pointer transition-all">
                    + Add Next Scene
                </div>
            </div>
        </div>
    );
};

const SceneRow = ({ index, script, prompt }: { index: number, script: string, prompt: string }) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleTTS = async () => {
        setIsGenerating(true);
        const result = await GoogleAIService.generateTTS(script);
        if (result) {
            setAudioUrl(result);
            new Audio(result).play();
        } else {
            alert("TTS generation failed. Please check your API Key.");
        }
        setIsGenerating(false);
    };

    return (
        <div className="group relative flex gap-6 p-6 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-lg transition-all">
            <div className="absolute -left-3 top-6 w-6 h-6 bg-stone-900 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md z-10">
                {index}
            </div>

            {/* Script Input */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-stone-400 tracking-wider">NARRATION</span>
                    <button
                        onClick={handleTTS}
                        disabled={isGenerating}
                        className={`p-1.5 rounded-full transition-colors flex items-center gap-2 ${isGenerating ? 'text-amber-500 bg-amber-50' : 'text-stone-400 hover:text-amber-600 hover:bg-amber-50'}`}
                        title="Regenerate Audio"
                    >
                        {isGenerating ? <div className="animate-spin text-xs">↻</div> : <Mic className="w-3.5 h-3.5" />}
                        {audioUrl && <span className="text-xs text-emerald-500 font-bold">Ready</span>}
                    </button>
                </div>
                <textarea
                    className="w-full h-32 text-xl font-serif leading-relaxed text-stone-800 bg-transparent border-none resize-none focus:ring-0 p-0 placeholder-stone-300"
                    defaultValue={script}
                />
            </div>

            {/* Visual Prompt Input */}
            <div className="w-[280px] flex flex-col gap-3">
                <div className="aspect-video bg-stone-100 rounded-lg overflow-hidden border border-stone-100 group-hover:border-amber-200 transition-colors relative">
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300 text-sm">
                        AI Generated Image
                    </div>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 group-hover:border-amber-200 transition-colors">
                    <p className="text-[10px] font-bold text-stone-400 mb-1">PROMPT</p>
                    <textarea
                        className="w-full text-xs text-stone-500 bg-transparent border-none focus:ring-0 p-0 resize-none h-16 leading-relaxed"
                        defaultValue={prompt}
                    />
                </div>
            </div>
        </div>
    )
}
