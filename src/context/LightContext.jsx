import { createContext, useContext } from 'react';
import { useLightReveal } from '../hooks/useLightReveal';

const LightContext = createContext(null);

export function LightProvider({ children }) {
  const light = useLightReveal();
  return <LightContext.Provider value={light}>{children}</LightContext.Provider>;
}

export function useLight() {
  const ctx = useContext(LightContext);
  if (!ctx) throw new Error('useLight must be used within a LightProvider');
  return ctx;
}
