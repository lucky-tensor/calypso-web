import React from 'react';
import { useWizard } from './WizardContext';
import DiscoveryStep from './components/DiscoveryStep';
import MappingStep from './components/MappingStep';
import GovernanceStep from './components/GovernanceStep';
import ReviewStep from './components/ReviewStep';




/**
 * Main Application Shell
 * 
 * Orchestrates the rendering of wizard steps based on the global state.
 * Implements the focus-mode layout as per Calypso standards.
 */
function App() {
    const { currentStep } = useWizard();

    const renderStep = () => {
        switch (currentStep) {
            case 'Discovery':
                return <DiscoveryStep />;
            case 'Mapping':
                return <MappingStep />;
            case 'Governance':
                return <GovernanceStep />;
            case 'Review':
                return <ReviewStep />;
            case 'Complete':
                return <div className="text-white">Generation Complete!</div>;
            default:
                return <DiscoveryStep />;
        }
    };


    return (
        <main className="focus-container">
            <div className="w-full max-w-4xl mx-auto">
                {renderStep()}
            </div>

            {/* Progress Indicator */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                {['Discovery', 'Mapping', 'Governance', 'Review'].map((step) => (
                    <div
                        key={step}
                        className={`h-1.5 w-12 rounded-full transition-all duration-500 ${currentStep === step ? 'bg-primary w-24' : 'bg-slate-800'
                            }`}
                    />
                ))}
            </div>
        </main>
    );
}

export default App;


