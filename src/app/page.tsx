'use client';

import Image from 'next/image';
import EnhancedCarousel from './components/sections/EnhanceCarousel';
import ProblemSection from './components/sections/ProblemSection';
import HowItWorksSection from './components/sections/HowItWorks';
import PriceComparisonSection from './components/sections/PriceComparison';
import SubmissionForm from './components/sections/SubmissionForm';

export default function Home() {
	const scrollToForm = () => {
		const formElement = document.querySelector('form');
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const scrollDown = () => {
		const nextSection = document.querySelector('#problem');
		if (nextSection) {
			nextSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="h-full relative w-full flex flex-col">
			<nav className="absolute top-0 w-full flex justify-between items-center p-4 xl:py-6 px-4 md:px-8 xl:px-12 z-10">
				<div className="flex items-center gap-2">
					<Image
						className="hidden md:block"
						src="/images/mealmate-logo.png"
						alt="MealMate Logo"
						height={80}
						width={300}
						priority
					/>
					<Image
						className="block md:hidden"
						src="/images/mealmate-logo-small.png"
						alt="MealMate Logo"
						height={48}
						width={48}
						priority
					/>
					<div className="hidden md:flex items-center gap-2"></div>
				</div>
				<div className="flex gap-2">
					<button
						onClick={scrollToForm}
						className="bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px]">
						Join the waitlist
					</button>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="h-screen w-full flex flex-col justify-center items-center gap-4 md:gap-8 xl:gap-12 px-4 md:px-8 xl:px-12 py-24">
				<h2 className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500">Meal kits are broken</h2>
				<h1 className="mb-12 md:mb-8 text-[48px] md:text-[110px] xl:text-[150px] leading-[0.9] font-bold tracking-tighter text-center text-gray-700">
					We&apos;re fixing it.
				</h1>
				{/* <p className="text-lg md:text-xl xl:text-2xl text-center text-gray-600 max-w-4xl mb-8">
					The next evolution of meal planning — personalised, flexible, and half the price of traditional meal
					kits
				</p> */}
				<button
					onClick={scrollDown}
					className="bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px]">
					Learn more
					<svg
						className="ml-2 w-4 h-4 md:w-5 md:h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={3}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
			</div>

			<ProblemSection />
            <EnhancedCarousel />
			<HowItWorksSection />
            <PriceComparisonSection />
            <SubmissionForm />
		</div>
	);
}
