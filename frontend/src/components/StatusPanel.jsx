import React from 'react';
import { Radio, Database, BrainCircuit, CheckCircle2, XCircle } from 'lucide-react';

const StatusPanel = ({ status }) => {
    const items = [
        {
            label: 'Model Loaded',
            ok: status?.model_loaded,
            desc: 'LSTM Neural Network Weights',
            icon: BrainCircuit
        },
        {
            label: 'Sequences Ready',
            ok: status?.sequences_ready,
            desc: 'MIDI Mappings & Vocabulary',
            icon: Database
        },
        {
            label: 'Training Status',
            ok: !status?.training,
            desc: status?.training ? 'Training in Progress...' : 'Idle / Ready',
            icon: Radio
        },
    ];

    return (
        <div className="glass p-6 rounded-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                System Status
            </h3>

            <div className="space-y-6">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${item.ok ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            <item.icon size={20} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-200">{item.label}</span>
                                {item.ok ? <CheckCircle2 size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusPanel;
