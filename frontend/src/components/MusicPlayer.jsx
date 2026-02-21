import React from 'react';
import { Download, Play, Pause, Volume2, Music4 } from 'lucide-react';
import { musicApi } from '../services/api';

const MusicPlayer = ({ currentFile }) => {
    if (!currentFile) {
        return (
            <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 h-full min-h-[300px]">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-2">
                    <Music4 size={32} className="text-gray-500" />
                </div>
                <div>
                    <h3 className="text-lg font-medium">No Music Generated</h3>
                    <p className="text-gray-400 text-sm max-w-[200px]">Adjust settings and click generate to create new melodies.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass p-6 rounded-2xl flex flex-col gap-6 h-full border-l-4 border-l-accent">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Play className="text-accent" size={24} fill="currentColor" />
                    Generated Track
                </h2>
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full uppercase tracking-wider font-bold">Ready</span>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="w-full h-32 bg-gray-800/50 rounded-xl overflow-hidden relative flex items-center justify-center">
                    {/* Simple Waveform Placeholder */}
                    <div className="flex items-center gap-1">
                        {[...Array(24)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 bg-accent rounded-full animate-pulse`}
                                style={{ height: `${Math.random() * 60 + 20}%`, animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <Volume2 size={16} />
                    <div className="flex-1 h-1 bg-gray-800 rounded-full">
                        <div className="w-2/3 h-full bg-accent rounded-full" />
                    </div>
                </div>

                <div className="flex gap-4">
                    <a
                        href={musicApi.getDownloadUrl(currentFile)}
                        download
                        className="flex-1 bg-white hover:bg-gray-100 text-black font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Download size={20} />
                        Download MIDI
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
