'use client';

import Image from 'next/image';
import {
	DollarSign,
	Lock,
	Trash2,
	Unlink,
	Target,
	Zap,
	Calendar,
	Sparkles,
	FileText,
	ShoppingCart,
	ChefHat,
	ArrowRight,
	Clock,
} from 'lucide-react';
import EnhancedCarousel from './components/sections/EnhanceCarousel';

export default function Home() {
	const scrollToForm = () => {
		const formElement = document.querySelector('form');
		if (formElement) {
			formElement.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const scrollDown = () => {
		const nextSection = document.querySelector('#problema');
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

			{/* Problem Section */}
			<div
				id="problema"
				className="w-full py-24 px-4 md:px-8 xl:px-12">
				<div className="mx-auto max-w-7xl">
					<div className="mx-auto max-w-2xl lg:text-center">
						<h2 className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500">
							The current model is broken.
						</h2>
						<p className="mt-2 text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700">
							Why meal kits don&apos;t work.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
						<dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
							<div className="relative pl-16">
								<dt className="text-xl font-bold text-gray-700">
									<div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-secondary">
										<DollarSign className="size-6 text-primary" />
									</div>
									Too expensive
								</dt>
								<dd className="mt-2 text-base text-gray-600">
									Pay 40-60% more than buying the same ingredients yourself at the supermarket
								</dd>
							</div>
							<div className="relative pl-16">
								<dt className="text-xl font-bold text-gray-700">
									<div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-secondary">
										<Lock className="size-6 text-primary" />
									</div>
									Inflexible
								</dt>
								<dd className="mt-2 text-base text-gray-600">
									Locked into subscriptions with limited meal options and no dietary flexibility
								</dd>
							</div>
							<div className="relative pl-16">
								<dt className="text-xl font-bold text-gray-700">
									<div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-secondary">
										<Trash2 className="size-6 text-primary" />
									</div>
									Wasteful packaging
								</dt>
								<dd className="mt-2 text-base text-gray-600">
									Excessive plastic and packaging waste with every single delivery box
								</dd>
							</div>
							<div className="relative pl-16">
								<dt className="text-xl font-bold text-gray-700">
									<div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-secondary">
										<Unlink className="size-6 text-primary" />
									</div>
									Disjointed experience
								</dt>
								<dd className="mt-2 text-base text-gray-600">
									Planning meals through separate platforms adds friction instead of simplifying your
									life
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>

      <EnhancedCarousel />


			{/* How it Works Section */}
			<div className="h-screen w-full bg-background py-24 px-4 md:px-8 xl:px-12">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
							Simple, smart, seamless
						</span>
						<h2 className="text-[40px] md:text-[60px] xl:text-[80px] leading-[0.9] font-bold tracking-tighter text-gray-700 mb-8">
							How it works
						</h2>
						<p className="mt-6 text-lg md:text-xl text-gray-600">
							From meal inspiration to your kitchen in just five simple steps. No complex workflows, no
							learning curves — just meal planning that actually works.
						</p>
					</div>
					<div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
						<div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2 xl:grid-cols-3">
							{/* First row - 3 steps */}
							<div className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-xl font-bold text-gray-700">
									<div className="flex size-12 items-center justify-center rounded-lg bg-primary">
										<Calendar className="size-6 text-white" />
									</div>
									Set your week
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
									<p className="flex-auto">
										Tell us your dietary preferences, schedule, and how many meals you need. Set it
										once and we'll remember for next time.
									</p>
								</dd>
							</div>
							<div className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-xl font-bold text-gray-700">
									<div className="flex size-12 items-center justify-center rounded-lg bg-primary">
										<Sparkles className="size-6 text-white" />
									</div>
									Smart suggestions
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
									<p className="flex-auto">
										Get personalised meal recommendations based on your tastes, dietary needs, and
										cooking skill level. Fresh ideas every week.
									</p>
								</dd>
							</div>
							<div className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-xl font-bold text-gray-700">
									<div className="flex size-12 items-center justify-center rounded-lg bg-primary">
										<FileText className="size-6 text-white" />
									</div>
									Smart grocery list
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
									<p className="flex-auto">
										Automatically generated shopping list with exact quantities needed. No food
										waste, no forgotten ingredients, no guesswork.
									</p>
								</dd>
							</div>
							<div className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-xl font-bold text-gray-700">
									<div className="flex size-12 items-center justify-center rounded-lg bg-primary">
										<ShoppingCart className="size-6 text-white" />
									</div>
									One-click checkout
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
									<p className="flex-auto">
										Seamless ordering through Woolworths with delivery or pickup options. Your
										groceries ordered and scheduled in seconds.
									</p>
								</dd>
							</div>
							<div className="flex flex-col">
								<dt className="flex items-center gap-x-3 text-xl font-bold text-gray-700">
									<div className="flex size-12 items-center justify-center rounded-lg bg-primary">
										<ChefHat className="size-6 text-white" />
									</div>
									Cook & enjoy
								</dt>
								<dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
									<p className="flex-auto">
										Follow easy step-by-step recipes with photos and timing guides. Great meals made
										simple, every single time.
									</p>
								</dd>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Price Comparison Section */}
			<div className="h-screen w-full py-24 px-4 md:px-8 xl:px-12">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:text-center">
						<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
							Premium quality, smart pricing
						</span>
						<h2 className="text-[40px] md:text-[60px] xl:text-[70px] leading-[0.9] tracking-tighter text-gray-700 mb-8">
							Same meal, <span className="text-primary">half the price</span>
						</h2>
						<p className="mt-6 text-lg md:text-xl text-gray-600">
							Why pay premium prices for meal kits when you can get the same quality ingredients for half
							the cost? MealMate eliminates the middleman markup while delivering the same convenience and
							quality.
						</p>
					</div>

					<div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24">
						<div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
							<div className="space-y-6">
								<div className="flex justify-between items-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
									<div className="flex items-center gap-4">
										<div className="flex size-12 items-center justify-center rounded-lg bg-green-500">
											<span className="text-white text-lg font-bold">MM</span>
										</div>
										<div className="flex flex-col">
											<span className="text-xl font-bold text-gray-700">MealMate</span>
											<span className="text-sm text-gray-500">Smart meal planning</span>
										</div>
									</div>
									<div className="text-right">
										<span className="text-3xl font-bold text-green-600">$7</span>
										<div className="text-sm text-gray-500">per serving</div>
									</div>
								</div>

								<div className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
									<div className="flex items-center gap-4">
										<div className="flex size-12 items-center justify-center rounded-lg bg-gray-400">
											<span className="text-white text-lg font-bold">D</span>
										</div>
										<div className="flex flex-col">
											<span className="text-xl font-bold text-gray-700">Dinnerly</span>
											<span className="text-sm text-gray-500">Budget meal kit</span>
										</div>
									</div>
									<div className="text-right">
										<span className="text-3xl font-bold text-gray-600">$10</span>
										<div className="text-sm text-gray-500">per serving</div>
									</div>
								</div>

								<div className="flex justify-between items-center p-6 bg-gray-50 rounded-lg">
									<div className="flex items-center gap-4">
										<div className="flex size-12 items-center justify-center rounded-lg bg-orange-400">
											<span className="text-white text-lg font-bold">HF</span>
										</div>
										<div className="flex flex-col">
											<span className="text-xl font-bold text-gray-700">HelloFresh</span>
											<span className="text-sm text-gray-500">Premium meal kit</span>
										</div>
									</div>
									<div className="text-right">
										<span className="text-3xl font-bold text-gray-600">$14</span>
										<div className="text-sm text-gray-500">per serving</div>
									</div>
								</div>
							</div>

							<div className="mt-8 pt-6 border-t border-gray-200">
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
									<div>
										<div className="text-2xl font-bold text-primary mb-2">50%</div>
										<div className="text-sm text-gray-600">Less than HelloFresh</div>
									</div>
									<div>
										<div className="text-2xl font-bold text-primary mb-2">30%</div>
										<div className="text-sm text-gray-600">Less than Dinnerly</div>
									</div>
									<div>
										<div className="text-2xl font-bold text-primary mb-2">0%</div>
										<div className="text-sm text-gray-600">Compromise on quality</div>
									</div>
								</div>
							</div>

							<p className="text-sm text-gray-500 mt-6 text-center">
								*Per serving comparison based on 2-person plans, excluding promotional pricing. MealMate
								pricing includes Woolworths delivery fees.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="w-full flex flex-col justify-end bg-secondary h-screen p-4 md:p-8 xl:px-12">
				<div className="bg-background rounded-xl shadow-lg p-8 xl:p-12 w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 md:gap-8 xl:gap-16">
					<div className="flex flex-col gap-4 md:gap-8 xl:gap-12">
						<h3 className="text-[40px] md:text-[60px] xl:text-[80px] leading-[0.9] tracking-tighter text-center text-gray-700">
							Ready to <span className="block">revolutionise</span> the way you eat?
						</h3>
						<p className="text-lg md:text-xl text-center text-gray-600 mb-8">
							Join our waitlist to be first in line when we launch. No spam, just updates on our progress
							and early access.
						</p>
						<form className="w-full flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<input
									name="name"
									type="text"
									placeholder="Your name"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="email"
									type="email"
									placeholder="Your email"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="location"
									type="text"
									placeholder="Your location (optional)"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="age"
									type="number"
									placeholder="Your age (optional)"
									min="1"
									max="120"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="w-full flex justify-end">
								<button
									className="bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px]"
									type="submit">
									Join the waitlist
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="mt-4 w-full text-center leading-3 text-gray-500 text-xs">© 2025 mealmate</div>
			</div>
		</div>
	);
}
