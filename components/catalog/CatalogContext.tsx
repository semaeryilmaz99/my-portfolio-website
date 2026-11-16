'use client';

import { createContext, useContext } from 'react';

export type CatalogPage = { id: string; label: string };

export type CatalogState = {
  pages: CatalogPage[];
  current: number;
  mode: 'catalog' | 'stack';
  /** Pages that have been shown at least once (used to start animations on mobile). */
  isActive: (index: number) => boolean;
  goTo: (index: number) => void;
  goToId: (id: string) => void;
};

export const CatalogContext = createContext<CatalogState | null>(null);

export function useCatalog() {
  return useContext(CatalogContext);
}

const PageIndexContext = createContext<number>(-1);
export const PageIndexProvider = PageIndexContext.Provider;
export function usePageIndex() {
  return useContext(PageIndexContext);
}
