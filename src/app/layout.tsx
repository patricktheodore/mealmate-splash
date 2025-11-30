import './globals.css';
import { Montserrat } from 'next/font/google';
// import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import localFont from 'next/font/local';

const montserrat = Montserrat({ 
  subsets: ['latin'],
});

const bndime = localFont({
  src: './fonts/BNDimeDisplay.otf',
  variable: '--font-bndime',
  display: 'swap',
});

export const metadata = {
	title: 'mealmate',
	description: 'Plan, Shop, Eat - Smarter',
	keywords: 'meal planner,grocery list,meal prep,recipes,dinner ideas,healthy meals,family meals, smart recipes',
	authors: [{ name: 'mealmate' }],
	creator: 'mealmate',
	openGraph: {
		type: 'website',
		locale: 'en_AU',
		url: 'mealmate.au',
		siteName: 'mealmate',
		title: 'mealmate | Landing Page',
		description: 'Plan, Shop, Eat - Smarter',
		images: [
			{
				url: '/images/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'mealmate',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${montserrat.className} ${bndime.variable}`}>
			<head>
				<link
					rel="canonical"
					href="https://mealmate.au"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</head>
			<body>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
		</html>
	);
}
