'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ApplyNowSource =
  | 'header'
  | 'home-hero'
  | 'home-final-cta'
  | 'study-destination'
  | 'ielts'
  | 'pte'
  | 'services'
  | 'unknown';

type ApplyNowOpenArgs = {
  intent?: 'apply' | 'enroll';
  source?: ApplyNowSource;
  prefill?: Partial<{
    preferredStudyDestination: string;
    academicLevel: string;
    preferredProgram: string;
  }>;
};

type ApplyNowState = {
  open: boolean;
  intent: 'apply' | 'enroll';
  source: ApplyNowSource;
  prefill: ApplyNowOpenArgs['prefill'];
};

type ApplyNowContextValue = {
  state: ApplyNowState;
  open: (args?: ApplyNowOpenArgs) => void;
  close: () => void;
};

const ApplyNowContext = createContext<ApplyNowContextValue | null>(null);

export function ApplyNowProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ApplyNowState>({
    open: false,
    intent: 'apply',
    source: 'unknown',
    prefill: undefined,
  });

  const open = useCallback((args?: ApplyNowOpenArgs) => {
    setState({
      open: true,
      intent: args?.intent ?? 'apply',
      source: args?.source ?? 'unknown',
      prefill: args?.prefill,
    });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo<ApplyNowContextValue>(() => ({ state, open, close }), [state, open, close]);

  return <ApplyNowContext.Provider value={value}>{children}</ApplyNowContext.Provider>;
}

export function useApplyNow() {
  const ctx = useContext(ApplyNowContext);
  if (!ctx) {
    throw new Error('useApplyNow must be used within ApplyNowProvider');
  }
  return ctx;
}

