/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				secondary: 'hsl(var(--secondary))',
				accent: 'hsl(var(--accent))',
				"button-bg": 'hsl(var(--button-bg))',
				"button-bg-hover": 'hsl(var(--button-bg-hover))',
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['var(--font-inter)'],
			},
			fontSize: {
				'2xs': '0.625rem', // 10px
				xs: '0.75rem', // 12px
				sm: '0.875rem', // 14px
				md: '1rem', // 16px
				lg: '1.125rem', // 18px
				xl: '1.25rem', // 20px
				'2xl': '1.5rem', // 24px
				'3xl': '1.875rem', // 30px
				'4xl': '2.25rem', // 36px
			},
			animation: {
				'fade-up': 'fadeUp 0.5s ease-out',
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-in-left': 'slideInLeft 0.5s ease-out',
				'slide-in-right': 'slideInRight 0.5s ease-out',
			},
			keyframes: {
				fadeUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeIn: {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
				slideInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				slideInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
			},
		},
	},
	plugins: [],
};
