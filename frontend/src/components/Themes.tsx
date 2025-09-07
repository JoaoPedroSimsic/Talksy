import React, { ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const Themes: React.FC = (): ReactNode => {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;

		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.setAttribute('data-theme', storedTheme);
		}
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);
};

export default Themes;
