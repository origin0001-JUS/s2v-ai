import { MainLayout } from './components/layout/MainLayout';
import { ScriptEditor } from './components/editor/ScriptEditor';
import { RemotionPlayerWrapper } from './components/preview/RemotionPlayer';

function App() {
  return (
    <MainLayout rightPanel={<RemotionPlayerWrapper />}>
      <ScriptEditor />
    </MainLayout>
  );
}

export default App;
