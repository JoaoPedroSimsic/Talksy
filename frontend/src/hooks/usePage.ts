import { useContext } from 'react';
import { PageContext } from '../contexts/Page/PageContext';
import type { PageContextType } from '../contexts/Page/PageContext';

export const usePage = (): PageContextType => {
	const ctx = useContext(PageContext);
	if (!ctx) throw new Error('usePage must be used within a PageProvider');
	return ctx;
};
