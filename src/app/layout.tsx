import './globals.css';
import { Inter } from 'next/font/google';
// import { DefaultSeo } from 'next-seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Your Business Name | Landing Page',
	description: 'Your compelling business description for SEO',
	keywords: 'your, business, keywords',
	authors: [{ name: 'Your Name' }],
	creator: 'Your Business Name',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://yourdomain.com',
		siteName: 'Your Business Name',
		title: 'Your Business Name | Landing Page',
		description: 'Your compelling business description for SEO',
		images: [
			{
				url: '/images/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Your Business Name',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: '@yourtwitterhandle',
		creator: '@yourtwitterhandle',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="canonical"
					href="https://yourdomain.com"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
