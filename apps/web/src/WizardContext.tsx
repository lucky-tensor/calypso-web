import React, { createContext, useContext, useState, useCallback } from 'react';
import { PRDSchema, WizardState, WizardStep, BusinessUnitDomain } from '@calypso/core';

interface WizardContextType extends WizardState {
    setProjectName: (name: string) => void;
    setVision: (vision: string) => void;
    addUnit: (domain: BusinessUnitDomain, description: string) => void;
    removeUnit: (id: string) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
}

const initialPRD: PRDSchema = {
    projectName: '',
    vision: '',
    units: [],
    flows: [],
    governance: [],
    requirements: [],
    version: '0.1.0',
    updatedAt: new Date().toISOString()
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<WizardState>({
        currentStep: 'Discovery',
        data: initialPRD,
        isGenerating: false
    });

    const setProjectName = useCallback((projectName: string) => {
        setState(prev => ({
            ...prev,
            data: { ...prev.data, projectName, updatedAt: new Date().toISOString() }
        }));
    }, []);

    const setVision = useCallback((vision: string) => {
        setState(prev => ({
            ...prev,
            data: { ...prev.data, vision, updatedAt: new Date().toISOString() }
        }));
    }, []);

    const addUnit = useCallback((domain: BusinessUnitDomain, description: string) => {
        setState(prev => ({
            ...prev,
            data: {
                ...prev.data,
                units: [...prev.data.units, { id: crypto.randomUUID(), domain, description, keyStakeholders: [] }],
                updatedAt: new Date().toISOString()
            }
        }));
    }, []);

    const removeUnit = useCallback((id: string) => {
        setState(prev => ({
            ...prev,
            data: {
                ...prev.data,
                units: prev.data.units.filter(u => u.id !== id),
                updatedAt: new Date().toISOString()
            }
        }));
    }, []);

    const saveSession = useCallback(async (currentData: PRDSchema) => {
        try {
            const token = localStorage.getItem('calypso_token');
            if (!token) return;

            await fetch('/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(currentData)
            });
        } catch (e) {
            console.error('Failed to save session:', e);
        }
    }, []);

    const nextStep = useCallback(async () => {
        const steps: WizardStep[] = ['Discovery', 'Mapping', 'Governance', 'Review', 'Complete'];
        const currentIndex = steps.indexOf(state.currentStep);
        if (currentIndex < steps.length - 1) {
            const next = steps[currentIndex + 1];
            setState(prev => ({ ...prev, currentStep: next }));
            await saveSession(state.data);
        }
    }, [state.currentStep, state.data, saveSession]);

    const prevStep = useCallback(() => {
        const steps: WizardStep[] = ['Discovery', 'Mapping', 'Governance', 'Review', 'Complete'];
        const currentIndex = steps.indexOf(state.currentStep);
        if (currentIndex > 0) {
            setState(prev => ({ ...prev, currentStep: steps[currentIndex - 1] }));
        }
    }, [state.currentStep]);

    const reset = useCallback(() => {
        setState({
            currentStep: 'Discovery',
            data: initialPRD,
            isGenerating: false
        });
    }, []);

    // Initial load & simple auto-auth for Prototype
    React.useEffect(() => {
        const init = async () => {
            let token = localStorage.getItem('calypso_token');
            if (!token) {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify({ userId: 'proto-user-1' })
                });
                const { token: newToken } = await res.json();
                localStorage.setItem('calypso_token', newToken);
                token = newToken;
            }

            try {
                const res = await fetch('/api/session', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const savedData = await res.json();
                    setState(prev => ({ ...prev, data: savedData }));
                }
            } catch {
                console.log('No existing session found.');
            }
        };
        init();
    }, []);

    return (
        <WizardContext.Provider value={{
            ...state,
            setProjectName,
            setVision,
            addUnit,
            removeUnit,
            nextStep,
            prevStep,
            reset
        }}>
            {children}
        </WizardContext.Provider>
    );
};


export const useWizard = () => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
};
