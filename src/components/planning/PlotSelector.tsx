import React, { useState } from 'react';
import { BookOpen, Check } from 'lucide-react';

interface PlotSelectorProps {
    plots: string[];
    onSelect: (selectedPlot: string) => void;
    onBack: () => void;
}

export const PlotSelector: React.FC<PlotSelectorProps> = ({ plots, onSelect, onBack }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-stone-50 p-8 flex flex-col items-center">
            <header className="w-full max-w-5xl flex justify-between items-center mb-12">
                <button
                    onClick={onBack}
                    className="text-stone-400 hover:text-stone-600"
                >
                    ← 다시 입력하기
                </button>
                <div className="text-stone-400 text-sm font-medium">STEP 2 of 3</div>
            </header>

            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                    마음에 드는 이야기를 선택해주세요
                </h2>
                <p className="text-stone-500">
                    AI가 제안한 3가지 줄거리입니다. 가장 끌리는 것을 골라주세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
                {plots.map((plot, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative group cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 flex flex-col ${selectedIndex === index
                            ? 'bg-white border-amber-500 shadow-xl shadow-amber-500/10 scale-[1.02]'
                            : 'bg-white border-stone-100 hover:border-amber-200 hover:shadow-lg'
                            }`}
                    >
                        {/* Fake Cover Art */}
                        <div className={`w-full aspect-[3/4] rounded-xl mb-6 flex items-center justify-center text-4xl mb-6 transition-colors ${selectedIndex === index ? 'bg-amber-50 text-amber-500' : 'bg-stone-100 text-stone-300 group-hover:bg-amber-50 group-hover:text-amber-300'
                            }`}>
                            <BookOpen className="w-12 h-12" />
                        </div>

                        <h3 className="font-bold text-stone-800 text-lg mb-4 line-clamp-2">
                            옵션 {index + 1}
                        </h3>
                        <p className="text-stone-500 text-sm leading-relaxed flex-1 overflow-y-auto max-h-[200px] mb-8">
                            {JSON.parse(plot).synopsis || plot}
                            {/* Assuming JSON string or plain text. Will adjust parsing logic later if needed */}
                        </p>

                        <div className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${selectedIndex === index
                            ? 'bg-amber-500 text-white'
                            : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200'
                            }`}>
                            {selectedIndex === index ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Check className="w-5 h-5" /> 선택됨
                                </span>
                            ) : (
                                "이걸로 만들기"
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12">
                <button
                    onClick={() => selectedIndex !== null && onSelect(plots[selectedIndex])}
                    disabled={selectedIndex === null}
                    className={`px-10 py-4 rounded-full text-lg font-bold transition-all ${selectedIndex !== null
                        ? 'bg-stone-900 text-white shadow-xl hover:scale-105'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        }`}
                >
                    다음 단계로 이동 →
                </button>
            </div>
        </div>
    );
};
