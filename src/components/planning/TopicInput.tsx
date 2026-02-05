import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GoogleAIService } from '../../services/google_ai';

interface TopicInputProps {
    onNext: (plots: string[]) => void;
}

export const TopicInput: React.FC<TopicInputProps> = ({ onNext }) => {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setIsGenerating(true);
        // Call AI Service to generate plots
        const plotOptions = await GoogleAIService.generatePlotOptions(topic);
        setIsGenerating(false);
        onNext(plotOptions); // Pass data to next step
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8">
            <div className="max-w-xl w-full text-center space-y-10">

                {/* Brand / Logo Area */}
                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20 mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">
                        어떤 이야기를 <br /> 들려주시겠어요?
                    </h1>
                    <p className="text-lg text-stone-500">
                        할아버지, 할머니를 위한 따뜻한 이야기를 만들어 드립니다.
                    </p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100 flex items-center p-4">
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="예: '옛날 시골 장터', '잃어버린 강아지'"
                            className="flex-1 text-xl font-medium text-stone-800 placeholder-stone-300 bg-transparent border-none focus:ring-0 px-4"
                            disabled={isGenerating}
                        />
                        <button
                            type="submit"
                            disabled={isGenerating || !topic.trim()}
                            className={`p-4 rounded-xl flex items-center gap-2 font-bold transition-all ${isGenerating || !topic.trim()
                                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                    : 'bg-stone-900 text-white hover:scale-105 hover:bg-black shadow-lg'
                                }`}
                        >
                            {isGenerating ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    생각하는 중...
                                </span>
                            ) : (
                                <>
                                    <span>시작하기</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Examples */}
                <div className="flex flex-wrap justify-center gap-3">
                    {['어린 시절의 추억', '가족 여행', '첫사랑', '손주에게 해주고 싶은 말'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setTopic(tag)}
                            className="px-4 py-2 bg-white border border-stone-200 rounded-full text-stone-500 text-sm hover:border-amber-400 hover:text-amber-600 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
