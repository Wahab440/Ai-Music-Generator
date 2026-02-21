import React from 'react';
import { Music, Play, Settings, Activity } from 'lucide-react';

const ControlsPanel = ({ onGenerate, onTrain, generating, training }) => {
    return (
        <div className="glass p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
                <Settings className="text-accent" size={24} />
                <h2 className="text-xl font-semibold">Generation Settings</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Sequence Length</label>
                    <input
                        type="range"
                        min="50"
                        max="500"
                        defaultValue="200"
                        className="w-full accent-accent bg-gray-800 rounded-lg h-2"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Model Type</label>
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm focus:ring-accent focus:border-accent">
                        <option>LSTM (Primary)</option>
                        <option disabled>Transformer (Coming Soon)</option>
                        <option disabled>GAN (Coming Soon)</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={onGenerate}
                    disabled={generating}
                    className="flex-1 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                    <Music className={`group-hover:rotate-12 transition-transform ${generating ? 'animate-spin' : ''}`} size={20} />
                    {generating ? 'Generating...' : 'Generate Music'}
                </button>

                <button
                    onClick={onTrain}
                    disabled={training}
                    className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                    <Activity size={20} />
                    {training ? 'Training...' : 'Train Model'}
                </button>
            </div>
        </div>
    );
};

export default ControlsPanel;
