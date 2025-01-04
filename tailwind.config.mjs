/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // This enables class-based dark mode
	theme: {
		extend: {
			animation: {
				gradient: 'gradient 1s linear infinite',
			},
			keyframes: {
				gradient: {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' },
				},
			},
			cursor: {
				'tennessee': 'url(/images/tennessee-outline.png), auto',
			  },
		},
	},
	plugins: [
		require('tailwindcss/plugin')(function({ addUtilities }) {
			addUtilities({
				'.animate-gradient': {
					backgroundSize: '200% 200%',
					backgroundClip: 'text',
					'-webkit-background-clip': 'text',
				},
			});
		}),
	],
	fontFamily: {
		serif: ['Georgia'],
	},
};
