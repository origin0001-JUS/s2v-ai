import React from 'react';
import type { ReactNode } from 'react';
import { BookOpen, Clapperboard, Home, Settings, User } from 'lucide-react';

interface MainLayoutProps {
    children: ReactNode; // Main Content (Editor)
    rightPanel: ReactNode; // Right Panel (Preview)
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, rightPanel }) => {
    return (
        <div className="flex h-screen bg-stone-50 overflow-hidden text-stone-800 font-sans">
            {/* 1. Navigation Sidebar (Collapsed) */}
            <aside className="w-16 bg-stone-900 flex flex-col items-center py-6 gap-6 z-10 shadow-xl">
                <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20">
                    <BookOpen className="text-white w-6 h-6" />
                </div>

                <nav className="flex flex-col gap-4 mt-4 w-full px-2">
                    <NavIcon icon={<Home />} label="Home" active />
                    <NavIcon icon={<User />} label="Characters" />
                    <NavIcon icon={<Clapperboard />} label="Render" />
                </nav>

                <div className="mt-auto">
                    <NavIcon icon={<Settings />} label="Settings" />
                </div>
            </aside>

            {/* 2. Main Workspace (Split View) */}
            <main className="flex-1 flex overflow-hidden">
                {/* Left: Script / Story Editor */}
                <section className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300">
                    <div className="max-w-4xl mx-auto p-8 lg:p-12">
                        {children}
                    </div>
                </section>

                {/* Right: Preview / Inspector */}
                <aside className="w-[480px] bg-white border-l border-stone-200 flex flex-col shadow-2xl z-10">
                    {rightPanel}
                </aside>
            </main>
        </div>
    );
};

const NavIcon = ({ icon, label, active }: { icon: ReactNode, label: string, active?: boolean }) => (
    <button className={`p-3 rounded-xl transition-all group relative flex justify-center ${active ? 'bg-stone-800 text-amber-500' : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'}`}>
        {icon}
        <span className="absolute left-14 bg-stone-900 text-stone-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-stone-800 pointer-events-none">
            {label}
        </span>
    </button>
);
