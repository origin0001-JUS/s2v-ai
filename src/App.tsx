// import { useEffect } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { RemotionPlayerWrapper } from './components/preview/RemotionPlayer.tsx';
import { ScriptEditor } from './components/editor/ScriptEditor';
import { TopicInput } from './components/planning/TopicInput';
import { PlotSelector } from './components/planning/PlotSelector';
import { useScriptStore } from './store/useScriptStore';

function App() {
  const { currentPhase, setPhase, generatedPlots, setGeneratedPlots } = useScriptStore();

  const handleTopicSubmit = (plots: string[]) => {
    setGeneratedPlots(plots);
    setPhase('plot');
  };

  const handlePlotSelect = (selectedPlot: string) => {
    console.log("Selected Plot:", selectedPlot);
    // In a real app, we would initialize scenes based on the plot here.
    setPhase('editor');
  };

  return (
    <div className="h-screen w-full bg-white text-stone-900">
      {currentPhase === 'topic' && (
        <TopicInput onNext={handleTopicSubmit} />
      )}

      {currentPhase === 'plot' && (
        <PlotSelector
          plots={generatedPlots}
          onSelect={handlePlotSelect}
          onBack={() => setPhase('topic')}
        />
      )}

      {currentPhase === 'editor' && (
        <MainLayout
          leftPanel={<ScriptEditor />}
          rightPanel={<RemotionPlayerWrapper />}
        />
      )}
    </div>
  );
}

export default App;
