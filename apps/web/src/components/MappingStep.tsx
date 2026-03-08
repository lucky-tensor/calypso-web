import React, { useState } from 'react';
import { useWizard } from '../WizardContext';
import { BusinessUnitDomain } from '@calypso/core';

/**
 * Mapping Step
 * Handles both Business Unit Discovery and Interaction Mapping.
 */
const MappingStep: React.FC = () => {
    const { data, addUnit, removeUnit, nextStep, prevStep } = useWizard();
    const [view, setView] = useState<'units' | 'flows'>('units');
    const [selectedDomain, setSelectedDomain] = useState<BusinessUnitDomain>('Sales');
    const [description, setDescription] = useState('');

    const domains: BusinessUnitDomain[] = ['Sales', 'HR', 'Engineering', 'Operations', 'Finance', 'Legal', 'Marketing'];

    const handleAdd = () => {
        if (description.length > 5) {
            addUnit(selectedDomain, description);
            setDescription('');
        }
    };

    const renderUnitsView = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
            {/* Unit Creation */}
            <div className="space-y-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-300 ml-1">Department / Domain</label>
                    <div className="flex flex-wrap gap-2">
                        {domains.map(d => (
                            <button
                                key={d}
                                onClick={() => setSelectedDomain(d)}
                                className={`px-4 py-2 rounded-lg border transition-all text-sm font-medium ${selectedDomain === d
                                    ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10'
                                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                                    }`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium text-slate-300 ml-1">Description of Operations</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={`What does the ${selectedDomain} team do?`}
                        rows={3}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-6 py-4 text-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-slate-700 resize-none"
                    />
                </div>

                <button
                    onClick={handleAdd}
                    disabled={description.length <= 5}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${description.length > 5
                        ? 'bg-primary text-white hover:bg-primary/80 shadow-lg shadow-primary/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    Add Business Unit
                </button>
            </div>

            {/* Units List */}
            <div className="space-y-4">
                <label className="text-sm font-medium text-slate-300 ml-1">Mapped Units ({data.units.length})</label>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {data.units.length === 0 ? (
                        <div className="border border-dashed border-slate-800 rounded-xl p-8 text-center text-slate-600 italic">
                            No units added yet.
                        </div>
                    ) : (
                        data.units.map(unit => (
                            <div key={unit.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 group hover:border-slate-700 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-primary font-mono text-xs uppercase tracking-tighter">{unit.domain}</span>
                                    <button
                                        onClick={() => removeUnit(unit.id)}
                                        className="text-slate-600 hover:text-red-400 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-slate-300 text-sm">{unit.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    const renderFlowsView = () => (
        <div className="animate-in fade-in duration-500">
            <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center bg-slate-900/20">
                <h3 className="text-xl font-semibold text-white mb-2">Interaction Mapping</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    Define how data moves between systems and units. (Flow designer coming in next iteration)
                </p>
                <div className="flex justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-700 font-mono text-xs italic">Unit A</div>
                    <div className="w-16 flex items-center"><div className="h-px bg-slate-800 w-full relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-r border-t border-slate-800 rotate-45" /></div></div>
                    <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-700 font-mono text-xs italic">Unit B</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="glass rounded-3xl p-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Milestone 1: Prototype</span>
                    <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
                        {view === 'units' ? 'Discovery' : 'Interaction'} <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-glow">& Mapping</span>
                    </h1>
                </div>

                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                        onClick={() => setView('units')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'units' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Units
                    </button>
                    <button
                        onClick={() => setView('flows')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${view === 'flows' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Flows
                    </button>
                </div>
            </header>

            {view === 'units' ? renderUnitsView() : renderFlowsView()}

            <div className="pt-12 flex justify-between border-t border-slate-800 mt-12">
                <button
                    onClick={prevStep}
                    className="px-8 py-4 text-slate-400 hover:text-white transition-colors"
                >
                    Back to Vision
                </button>
                <button
                    onClick={nextStep}
                    disabled={data.units.length === 0}
                    className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl ${data.units.length > 0
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    Establish Governance
                </button>
            </div>
        </div>
    );
};

export default MappingStep;

