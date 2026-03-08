import React from 'react';
import { useWizard } from '../WizardContext';

/**
 * Discovery Step
 * Captures project name and high-level vision.
 */
const DiscoveryStep: React.FC = () => {
    const { data, setProjectName, setVision, nextStep } = useWizard();

    const isComplete = data.projectName.length > 2 && data.vision.length > 10;

    return (
        <div className="glass rounded-3xl p-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Milestone 1: Prototype</span>
                <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
                    Define your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-glow">Vision</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                    Every great enterprise starts with a clear objective. Tell us what you&apos;re building.
                </p>
            </header>

            <div className="space-y-10">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-300 ml-1">Project Name</label>
                    <input
                        type="text"
                        value={data.projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g. Calypso Web"
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-6 py-4 text-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-700"
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-300 ml-1">The Mission</label>
                    <textarea
                        value={data.vision}
                        onChange={(e) => setVision(e.target.value)}
                        placeholder="What is the core value proposition of this application?"
                        rows={4}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-6 py-4 text-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-700 resize-none"
                    />
                </div>

                <div className="pt-6 flex justify-end">
                    <button
                        onClick={nextStep}
                        disabled={!isComplete}
                        className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl ${isComplete
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        Begin Discovery
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscoveryStep;
