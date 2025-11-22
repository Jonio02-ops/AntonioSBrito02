import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PlayDisplay } from './components/PlayDisplay';
import { LoadingCurtain } from './components/LoadingCurtain';
import { AppState, PlayRequest, PlayResponse } from './types';
import { generatePlayScript } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [playData, setPlayData] = useState<PlayResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGeneratePlay = async (request: PlayRequest) => {
    setAppState(AppState.GENERATING);
    setErrorMsg(null);
    
    try {
      const response = await generatePlayScript(request);
      setPlayData(response);
      setAppState(AppState.SHOWING_RESULT);
    } catch (err: any) {
      setErrorMsg(err.message || "Ocorreu um erro inesperado.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setPlayData(null);
    setAppState(AppState.IDLE);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-drama-900 via-drama-800 to-drama-900 text-gray-100 selection:bg-gold-500 selection:text-black font-sans pb-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background decoration */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 relative z-10">
        
        {appState === AppState.ERROR && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p>{errorMsg}</p>
            <button onClick={handleReset} className="ml-auto underline text-sm hover:text-white">Tentar novamente</button>
          </div>
        )}

        {appState === AppState.IDLE && (
          <div className="animate-fade-in-up">
            <InputForm onSubmit={handleGeneratePlay} isLoading={false} />
          </div>
        )}

        {appState === AppState.GENERATING && (
          <div className="py-12">
            <LoadingCurtain />
          </div>
        )}

        {appState === AppState.SHOWING_RESULT && playData && (
          <PlayDisplay play={playData} onReset={handleReset} />
        )}

      </main>
      
      <footer className="text-center text-drama-100/30 text-sm py-8 mt-8">
        <p>&copy; {new Date().getFullYear()} Dramas Psicossociais. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;