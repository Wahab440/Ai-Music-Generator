import React, { useState, useEffect } from 'react';
import { musicApi } from './services/api';
import ControlsPanel from './components/ControlsPanel';
import MusicPlayer from './components/MusicPlayer';
import StatusPanel from './components/StatusPanel';
import { Sparkles, Github, ExternalLink, Activity } from 'lucide-react';

function App() {
    const [status, setStatus] = useState(null);
    const [currentFile, setCurrentFile] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [training, setTraining] = useState(false);

    useEffect(() => {
        fetchStatus();
        const interval = setInterval(fetchStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchStatus = async () => {
        try {
            const { data } = await musicApi.getStatus();
            setStatus(data);
        } catch (error) {
            console.error('Failed to fetch status', error);
        }
    };

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            const { data } = await musicApi.generate({ length: 200 });
            setCurrentFile(data.file);
            fetchStatus();
        } catch (error) {
            console.error('Generation failed', error);
            alert('Generation failed: ' + (error.response?.data?.detail || error.message));
        } finally {
            setGenerating(false);
        }
    };

    const handleTrain = async () => {
        setTraining(true);
        try {
            await musicApi.train();
            fetchStatus();
            alert('Training started in background.');
        } catch (error) {
            console.error('Training failed', error);
            alert('Training failed: ' + (error.response?.data?.detail || error.message));
        } finally {
            setTraining(false);
        }
    };

    return (
        <div className="min-h-screen bg-dashboard text-white p-4 md:p-8">
            {/* Header */}
            <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit">
                        <Sparkles size={14} className="text-accent" />
                        <span className="text-xs font-bold text-accent uppercase tracking-tighter">AI-Powered Melodies</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Audio<span className="text-accent">Gen</span> AI
                    </h1>
                    <p className="text-gray-400 max-w-md">
                        Train deep learning models on MIDI datasets and generate unique musical compositions with a single click.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-3 bg-gray-800/50 hover:bg-gray-800 rounded-xl transition-all border border-gray-700">
                        <Github size={20} />
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 font-medium">v1.2.0 Stable</span>
                        <span className="text-sm font-bold flex items-center gap-1 text-accent">
                            GPU Accelerated <ExternalLink size={12} />
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Controls & Status */}
                <div className="lg:col-span-4 space-y-8">
                    <ControlsPanel
                        onGenerate={handleGenerate}
                        onTrain={handleTrain}
                        generating={generating}
                        training={training}
                    />
                    <StatusPanel status={status} />
                </div>

                {/* Right Column - Player & Visualization */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="h-full">
                        <MusicPlayer currentFile={currentFile} />
                    </div>

                    <div className="glass p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                <Activity size={20} className="text-secondary" />
                                Neural Activity
                            </h3>
                            <div className="flex gap-2">
                                <div className="px-2 py-1 bg-gray-800 rounded text-xs">LSTM</div>
                                <div className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-500">TRANSFORMER</div>
                            </div>
                        </div>
                        <div className="aspect-[16/6] bg-gray-900/50 rounded-xl relative overflow-hidden flex items-end px-4 py-2 gap-1 border border-gray-800/50">
                            {[...Array(60)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-gradient-to-t from-accent/40 to-secondary/10 rounded-t-sm"
                                    style={{ height: `${Math.sin(i * 0.2) * 30 + 50}%` }}
                                />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.2em]">Real-time sequence projection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between gap-4 text-gray-500 text-sm">
                <p>&copy; 2024 AudioGen AI. Experimental Deep Learning Project.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-accent transition-colors">Documentation</a>
                    <a href="#" className="hover:text-accent transition-colors">Safety Guidelines</a>
                    <a href="#" className="hover:text-accent transition-colors">Terms of Use</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
