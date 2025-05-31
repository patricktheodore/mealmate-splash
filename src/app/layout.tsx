import './globals.css';
import { Montserrat } from 'next/font/google';
// import { DefaultSeo } from 'next-seo';

const montserrat = Montserrat({ 
  subsets: ['latin'],
});

export const metadata = {
	title: 'mealmate',
	description: 'Your compelling business description for SEO',
	keywords: 'your, business, keywords',
	authors: [{ name: 'Patrick Sara' }],
	creator: 'mealmate',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'mealmate.au',
		siteName: 'mealmate',
		title: 'mealmate | Landing Page',
		description: 'Your compelling business description for SEO',
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
		<html lang="en" className={montserrat.className}>
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
			<body>{children}</body>
		</html>
	);
}
