import React from 'react';
import { useWizard } from '../WizardContext';

/**
 * Review Step
 * Summarize all gathered information before triggering generation.
 */
const ReviewStep: React.FC = () => {
    const { data, prevStep, nextStep } = useWizard();

    const [generating, setGenerating] = React.useState(false);
    const [result, setResult] = React.useState<string | null>(null);

    const handleCommit = async () => {
        setGenerating(true);
        try {
            const token = localStorage.getItem('calypso_token');
            const res = await fetch('/api/wizard/generate', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.status === 'complete') {
                setResult(data.content);
                // In a real app we'd navigate to a success page
                setTimeout(() => nextStep(), 2000);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setGenerating(false);
        }
    };

    if (result) {
        return (
            <div className="glass rounded-3xl p-12 w-full animate-in zoom-in duration-500 text-center">
                <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-green-400">
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">PRD Generated Successfully</h2>
                <p className="text-slate-400 mb-8">The architectural blueprint has been committed to the repository.</p>
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-left font-mono text-xs text-slate-500 max-h-48 overflow-y-auto custom-scrollbar">
                    {result}
                </div>
            </div>
        );
    }

    return (
        <div className="glass rounded-3xl p-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
                <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Milestone 1: Prototype</span>
                <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
                    Final <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent text-glow">Review</span>
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                    Double check the architectural blueprint before we commit it to the repository.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <section>
                        <h3 className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mb-2">Project Vision</h3>
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <h4 className="text-white font-bold mb-2">{data.projectName || 'Untitled Project'}</h4>
                            <p className="text-slate-300 text-sm italic">&quot;{data.vision || 'No vision provided.'}&quot;</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-slate-500 font-mono text-[10px] uppercase tracking-widest mb-2">Business Units</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.units.map(u => (
                                <span key={u.id} className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs text-primary font-medium">
                                    {u.domain}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-6 border-dashed">
                    <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        {generating ? (
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <h3 className="text-white font-bold">{generating ? 'Generating PRD...' : 'Ready for Generation'}</h3>
                        <p className="text-slate-500 text-xs mt-2 max-w-[200px] mx-auto">
                            The agent will now process this interaction map and generate your `prd.md`.
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-12 flex justify-between border-t border-slate-800 mt-12">
                <button
                    onClick={prevStep}
                    disabled={generating}
                    className="px-8 py-4 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                >
                    Back to Governance
                </button>
                <button
                    onClick={handleCommit}
                    disabled={generating}
                    className={`px-12 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl ${generating
                        ? 'bg-slate-800 text-slate-600'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20'
                        }`}
                >
                    {generating ? 'Processing...' : 'Commit & Generate PRD'}
                </button>
            </div>
        </div>
    );
};


export default ReviewStep;
