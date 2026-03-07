import React from 'react';

/**
 * Main Application Component
 * 
 * This is the entry point for the Calypso PRD Wizard. It follows the "Focus-Mode"
 * design philosophy to provide an elite, minimal User Experience (UX).
 * 
 * @returns {JSX.Element} The rendered React application.
 */
function App() {
    /**
     * Render Logic
     * We use a centered layout with a premium dark-mode aesthetic using Tailwind CSS.
     */
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Calypso PRD Wizard
                </h1>
                <p className="text-slate-400 mb-8">
                    The elite way to bootstrap your enterprise software requirements.
                    Powered by the Calypso Blueprint for AI-native development.
                </p>
                <button
                    id="start-interview"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 font-medium shadow-lg"
                >
                    Start Interview
                </button>
            </div>
        </div>
    );
}

export default App;

