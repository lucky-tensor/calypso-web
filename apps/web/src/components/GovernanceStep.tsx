import React from 'react';
import { useWizard } from '../WizardContext';

/**
 * Governance Step
 * Define agent access to discovered data types.
 */
const GovernanceStep: React.FC = () => {
    const { nextStep, prevStep } = useWizard();

    // Inferred data types from units/flows
    const dataTypes = ['Customer Records', 'Employee PII', 'Internal Logs', 'Financial State'];

    return (
        <div className="glass rounded-3xl p-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Milestone 1: Prototype</span>
                <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
                    Agent <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent text-glow">Governance</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                    Define the agent&apos;s permission boundaries. Control what data can be queried or fused.
                </p>
            </header>

            <div className="space-y-6">
                {dataTypes.map(type => (
                    <div key={type} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-all">
                        <div>
                            <h3 className="text-white font-medium mb-1">{type}</h3>
                            <p className="text-slate-500 text-xs">Access level for automated agents.</p>
                        </div>
                        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                            {['Blocked', 'Query', 'Fuse'].map(perm => (
                                <button
                                    key={perm}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${perm === 'Query' ? 'bg-slate-800 text-white' : 'text-slate-600 hover:text-slate-400'
                                        }`}
                                >
                                    {perm}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-12 flex justify-between border-t border-slate-800 mt-12">
                <button
                    onClick={prevStep}
                    className="px-8 py-4 text-slate-400 hover:text-white transition-colors"
                >
                    Back to Mapping
                </button>
                <button
                    onClick={nextStep}
                    className="px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20"
                >
                    Review PRD
                </button>
            </div>
        </div>
    );
};

export default GovernanceStep;
