import React, { useState, useRef, useEffect } from 'react';
import {
	Clock,
	DollarSign,
	Target,
	Zap,
	Sparkles,
	ShoppingCart,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';

const EnhancedCarousel = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const cards = [
		{
			id: 0,
			title: 'Maximise convenience',
			subtitle: '2-3 clicks to checkout',
			description:
				'Open the app, confirm your meals, and checkout directly with your grocer. Minimal time, maximum convenience.',
			icon: Clock,
			bgColor: 'bg-primary/10',
			steps: [
				{ number: 1, text: 'Open app', status: 'complete' },
				{ number: 2, text: 'Confirm meals', status: 'complete' },
				{ number: 3, text: 'Checkout & done!', status: 'active' },
			],
		},
		{
			id: 1,
			title: 'Save money',
			subtitle: '50% less than meal kits',
			description:
				'Same quality meals at half the price of traditional meal kits by shopping smarter, not harder.',
			icon: DollarSign,
			bgColor: 'bg-secondary',
			comparison: [
				{ name: 'HelloFresh', price: '$14/serving', isOurs: false },
				{ name: 'MealMate', price: '$7/serving', isOurs: true },
			],
		},
		{
			id: 2,
			title: 'Stay flexible',
			subtitle: 'No rigid subscriptions',
			description:
				'Choose your meals, portions, and ingredients on your own terms. Meal planning that adapts to your lifestyle.',
			icon: Target,
			bgColor: 'bg-accent',
		},
		{
			id: 3,
			title: 'Simplify planning',
			subtitle: 'All-in-one experience',
			description:
				'Personalised recipes, smart grocery lists, and one-click checkout — all in one seamless experience.',
			icon: Zap,
			bgColor: 'bg-background',
			features: [
				{ icon: Sparkles, title: 'Recipe suggestions', subtitle: 'Based on your preferences' },
				{ icon: ShoppingCart, title: 'Smart grocery list', subtitle: 'Auto-generated quantities' },
			],
		},
	];

	// Check scroll position and update navigation state
	const checkScrollPosition = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

			// Update current index based on scroll position
			const cardWidth = 420 + 32; // card width + gap
			const newIndex = Math.round(scrollLeft / cardWidth);
			setCurrentIndex(newIndex);
		}
	};

	// Scroll to specific card
	const scrollToCard = (index: number) => {
		if (scrollContainerRef.current) {
			const cardWidth = 420 + 32; // card width + gap
			scrollContainerRef.current.scrollTo({
				left: index * cardWidth,
				behavior: 'smooth',
			});
		}
	};

	// Navigation functions
	const scrollLeftHandler = () => {
		const newIndex = Math.max(0, currentIndex - 1);
		scrollToCard(newIndex);
	};

	const scrollRightHandler = () => {
		const newIndex = Math.min(cards.length - 1, currentIndex + 1);
		scrollToCard(newIndex);
	};

	// Drag functionality
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
		scrollContainerRef.current.style.cursor = 'grabbing';
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 2; // Scroll speed multiplier
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUp = () => {
		if (!scrollContainerRef.current) return;
		setIsDragging(false);
		scrollContainerRef.current.style.cursor = 'grab';
	};

	const handleMouseLeave = () => {
		if (!scrollContainerRef.current) return;
		setIsDragging(false);
		scrollContainerRef.current.style.cursor = 'grab';
	};

	// Touch events for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 2;
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
	};

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', checkScrollPosition);
			checkScrollPosition(); // Initial check

			return () => {
				container.removeEventListener('scroll', checkScrollPosition);
			};
		}
	}, []);

	return (
		<div className="h-screen w-full py-24 px-4 md:px-8 xl:px-12 overflow-hidden">
			<div className="mx-auto px-6 lg:px-8">
				<div className="mx-auto max-w-3xl lg:text-center mb-16">
					<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
						Not another meal planning app.
					</span>
					<h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
						Something better. <br />
						Built for real life.
					</h2>
				</div>

				{/* Navigation and Carousel Container */}
				<div className="relative">
					<div className="w-full justify-end items-end flex gap-2 mb-4">
						<button
							onClick={scrollLeftHandler}
							disabled={!canScrollLeft}
							className={`bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-3 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] ${
								!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
							}`}>
							<ChevronLeft
								className="w-5 h-5"
								strokeWidth={3}
							/>
						</button>
						<button
							onClick={scrollRightHandler}
							disabled={!canScrollRight}
							className={`bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-3 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] ${
								!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
							}`}>
							<ChevronRight
								className="w-5 h-5"
								strokeWidth={3}
							/>
						</button>
					</div>
					{/* Navigation Arrows - Top Right */}

					{/* Draggable Carousel */}
					<div
						ref={scrollContainerRef}
						className="flex gap-8 overflow-x-auto pb-8 px-2 cursor-grab select-none"
						style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}>
						{cards.map((card) => {
							const IconComponent = card.icon;

							return (
								<div
									key={card.id}
									className="flex-none w-[380px] md:w-[420px] snap-start">
									<div
										className={`relative h-[480px] rounded-3xl ${card.bgColor} border-2 border-primary p-8 shadow-[8px_8px_0px_0px_var(--primary)] transform hover:shadow-[4px_4px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300`}>
										<div className="relative z-10 h-full flex flex-col">
											<div className="flex items-center gap-3 mb-6">
												<div className="flex size-12 items-center justify-center rounded-2xl bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)]">
													<IconComponent className="size-6 text-secondary" />
												</div>
												<div>
													<h3 className="text-2xl font-bold text-primary">{card.title}</h3>
													<p className="text-primary/70 text-sm font-medium">
														{card.subtitle}
													</p>
												</div>
											</div>

											<p className="text-lg text-foreground mb-8 leading-relaxed font-medium">
												{card.description}
											</p>

											{/* Card-specific content */}
											<div className="mt-auto">
												{/* Steps for convenience card */}
												{card.steps && (
													<div className="space-y-4">
														{card.steps.map((step, index) => (
															<div
																key={index}
																className={`flex items-center gap-3 p-3 ${
																	step.status === 'active'
																		? 'bg-secondary shadow-[2px_2px_0px_0px_var(--primary)]'
																		: step.status === 'complete'
																		? 'bg-accent'
																		: 'bg-background'
																} border-2 border-primary rounded-xl`}>
																<div className="w-6 h-6 bg-primary text-secondary rounded-full flex items-center justify-center text-xs font-bold border border-foreground">
																	{step.number}
																</div>
																<span
																	className={`text-foreground ${
																		step.status === 'active'
																			? 'font-bold'
																			: 'font-medium'
																	} text-sm`}>
																	{step.text}
																</span>
																<div className="ml-auto">
																	{step.status === 'active' ? (
																		<ArrowRight className="size-4 text-primary" />
																	) : (
																		<div className="w-2 h-2 bg-green-500 rounded-full"></div>
																	)}
																</div>
															</div>
														))}
													</div>
												)}

												{/* Price comparison for save money card */}
												{card.comparison && (
													<div className="space-y-3">
														{card.comparison.map((item, index) => (
															<div
																key={index}
																className={`flex justify-between items-center p-3 ${
																	item.isOurs
																		? 'bg-primary border-foreground shadow-[2px_2px_0px_0px_var(--foreground)]'
																		: 'bg-background border-primary/30'
																} border-2 rounded-xl`}>
																<span
																	className={`${
																		item.isOurs
																			? 'text-secondary font-bold'
																			: 'text-foreground font-medium'
																	}`}>
																	{item.name}
																</span>
																<span
																	className={`${
																		item.isOurs
																			? 'text-secondary font-bold'
																			: 'text-foreground/70 line-through'
																	}`}>
																	{item.price}
																</span>
															</div>
														))}
													</div>
												)}

												{/* Calendar for flexibility card */}
												{card.id === 2 && (
													<div className="bg-background border-2 border-primary rounded-xl p-4 shadow-[2px_2px_0px_0px_var(--primary)]">
														<div className="flex justify-between items-center mb-3">
															<span className="text-foreground font-medium text-sm">
																This Week
															</span>
															<span className="text-foreground/70 text-sm">
																3 meals planned
															</span>
														</div>
														<div className="grid grid-cols-7 gap-1">
															{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
																<div
																	key={i}
																	className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${
																		i === 1 || i === 3 || i === 5
																			? 'bg-primary text-secondary border-foreground'
																			: 'bg-secondary text-primary border-primary/30'
																	}`}>
																	{day}
																</div>
															))}
														</div>
													</div>
												)}

												{/* Features for planning card */}
												{card.features && (
													<div className="space-y-3">
														{card.features.map((feature, index) => {
															const FeatureIcon = feature.icon;
															return (
																<div
																	key={index}
																	className={`${
																		index === 0 ? 'bg-secondary' : 'bg-accent'
																	} border-2 border-primary/30 rounded-xl p-3`}>
																	<div className="flex items-center gap-3">
																		<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center border border-foreground">
																			<FeatureIcon className="size-4 text-secondary" />
																		</div>
																		<div>
																			<div className="text-foreground font-medium text-sm">
																				{feature.title}
																			</div>
																			<div className="text-foreground/70 text-xs">
																				{feature.subtitle}
																			</div>
																		</div>
																	</div>
																</div>
															);
														})}
													</div>
												)}
											</div>
										</div>

										{/* Decorative elements */}
										<div className="absolute top-6 right-8 w-7 h-7 bg-accent rounded-full border-2 border-primary"></div>
										<div className="absolute bottom-14 right-10 w-3 h-3 bg-primary rounded-full"></div>
										<div className="absolute top-20 right-4 w-2 h-2 bg-secondary rounded-full"></div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Scroll Indicator Pill */}
					<div className="flex justify-center mt-6">
						<div className="bg-background border-2 border-primary rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_var(--primary)]">
							<div className="flex items-center gap-2">
								<div className="flex gap-1">
									{cards.map((_, index) => (
										<div
											key={index}
											className={`w-2 h-2 rounded-full transition-all duration-300 ${
												index === currentIndex ? 'bg-primary scale-125' : 'bg-primary/30'
											}`}
										/>
									))}
								</div>
								<span className="text-xs font-medium text-primary ml-2">
									{currentIndex + 1} of {cards.length}
								</span>
                                <span className="text-xs text-primary/70 ml-1">• Drag to explore</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				/* Hide scrollbar */
				.overflow-x-auto::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
};

export default EnhancedCarousel;
