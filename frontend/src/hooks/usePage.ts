import { useContext } from 'react';
import { PageContext } from '../contexts/PageContext';
import type { PageContextType } from '../contexts/PageContext';

export const usePage = (): PageContextType => {
	const ctx = useContext(PageContext);
	if (!ctx) throw new Error('usePage must be used within a PageProvider');
	return ctx;
};
