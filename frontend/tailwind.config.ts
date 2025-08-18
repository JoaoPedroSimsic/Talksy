/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],

	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: '#3838ec',
				secondary: '#5656ed',
				dark: '#1c1c1c',
				bright: '#fff',
			},
			fontFamily: {
				sans: ['Rubik', 'sans-serif'],
			},
			screens: {
				xs: { max: '500px' },
			},
		},
	},
	plugins: [],
};
