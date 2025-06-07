import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
	Target,
	Sparkles,
	ShoppingCart,
	ChevronLeft,
	ChevronRight,
    BookOpen,
    CheckCircle,
    ChefHat,
    Flame,
    Globe,
    RefreshCw
} from 'lucide-react';

const EnhancedCarousel = () => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [touchStartTime, setTouchStartTime] = useState(0);
	const [lastTouchX, setLastTouchX] = useState(0);
	const [velocity, setVelocity] = useState(0);
	const [isInertiaScrolling, setIsInertiaScrolling] = useState(false);

	const cards = [
		{
			id: 0,
			title: 'Save time',
			subtitle: '1 click checkout',
			description:
				'Open the app, confirm your meals, and checkout directly with your grocer. Minimal time, maximum convenience.',
			bgColor: 'bg-primary/10',
			steps: [
				{ number: 1, text: 'Open app', status: 'open' },
				{ number: 2, text: 'Confirm meals', status: 'confirm' },
				{ number: 3, text: 'Checkout with your grocer!', status: 'active' },
			],
		},
		{
			id: 1,
			title: 'Save money',
			subtitle: '50% less than meal kits',
			description:
				'Same quality meals at half the price of traditional meal kits by shopping smarter, not harder.',
			bgColor: 'bg-secondary',
			comparison: [
				{ name: 'Other Meal Kit Providers', price: '$14/serving', isOurs: false },
				{ name: 'MealMate', price: '$7/serving', isOurs: true },
			],
		},
		{
			id: 2,
			title: 'Stay flexible',
			subtitle: 'No rigid subscriptions',
			description:
				'Choose your meals, portions, and ingredients on your own terms. No lock-in subscriptions, no hassle.',
			bgColor: 'bg-accent/80',
		},
		{
			id: 3,
			title: 'Simplify planning',
			subtitle: 'All-in-one experience',
			description:
				'Personalised recipes, smart grocery lists, and one-click checkout — all in one seamless experience.',
			bgColor: 'bg-background',
			features: [
				{ icon: Sparkles, title: 'Recipe suggestions', subtitle: 'Based on your preferences' },
				{ icon: ShoppingCart, title: 'Smart grocery list', subtitle: 'Auto-generated quantities' },
			],
		},
        {
			id: 4,
			title: 'Discover new flavors',
			subtitle: 'Endless variety, zero boredom',
			description:
				'Explore cuisines from around the world with curated recipes that match your taste preferences and cooking confidence.',
			bgColor: 'bg-accent/25',
			recipeCategories: [
				{ icon: Globe, name: 'World cuisines', count: "100's of recipes", difficulty: 'Easy to Advanced' },
				{ icon: ChefHat, name: 'Chef techniques', count: '45+ methods', difficulty: 'Beginner friendly' },
				{ icon: Flame, name: 'Spice levels', count: 'Mild to Fire', difficulty: 'Your choice' },
			],
		},
		{
			id: 5,
			title: 'Never waste food again',
			subtitle: 'Smart portions, zero guilt',
			description:
				'Get exactly what you need with intelligent portion planning and creative leftover suggestions that turn surplus into delicious meals.',
			bgColor: 'bg-primary/80',
			smartFeatures: [
				{ 
					icon: Target, 
					title: 'Perfect portions', 
					subtitle: 'Right-sized for your household',
					status: 'active'
				},
				{ 
					icon: RefreshCw, 
					title: 'Leftover magic', 
					subtitle: 'Transform extras into new meals',
					status: 'ready'
				},
			],
		},
	];

	// Get card width based on screen size
	const getCardWidth = useCallback(() => {
		if (typeof window !== 'undefined') {
			if (window.innerWidth >= 1280) return 520 + 32; // xl
			if (window.innerWidth >= 768) return 460 + 32;  // md
			return 380 + 32; // mobile
		}
		return 412; // fallback
	}, []);

	// Check scroll position and update navigation state
	const checkScrollPosition = useCallback(() => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 10);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

			// Update current index based on scroll position
			const cardWidth = getCardWidth();
			const newIndex = Math.round(scrollLeft / cardWidth);
			setCurrentIndex(Math.max(0, Math.min(cards.length - 1, newIndex)));
		}
	}, [getCardWidth, cards.length]);

	// Smooth scroll to specific card with momentum
	const scrollToCard = useCallback((index: number, smooth: boolean = true) => {
		if (scrollContainerRef.current) {
			const cardWidth = getCardWidth();
			const targetScroll = index * cardWidth;
			
			if (smooth) {
				scrollContainerRef.current.scrollTo({
					left: targetScroll,
					behavior: 'smooth',
				});
			} else {
				scrollContainerRef.current.scrollLeft = targetScroll;
			}
		}
	}, [getCardWidth]);

	// Apply momentum scrolling after touch ends
	const applyMomentumScroll = useCallback(() => {
		if (!scrollContainerRef.current || Math.abs(velocity) < 0.1) return;

		setIsInertiaScrolling(true);
		const container = scrollContainerRef.current;
		const startScroll = container.scrollLeft;
		const cardWidth = getCardWidth();
		
		// Calculate how far we should scroll based on velocity
		const momentumDistance = velocity * 300; // Adjust multiplier for feel
		let targetScroll = startScroll + momentumDistance;
		
		// Snap to nearest card
		const targetIndex = Math.round(targetScroll / cardWidth);
		const clampedIndex = Math.max(0, Math.min(cards.length - 1, targetIndex));
		targetScroll = clampedIndex * cardWidth;

		// Smooth scroll to target
		container.scrollTo({
			left: targetScroll,
			behavior: 'smooth'
		});

		// Reset inertia state after animation
		setTimeout(() => setIsInertiaScrolling(false), 500);
	}, [velocity, getCardWidth, cards.length]);

	const scrollLeftHandler = () => {
		const newIndex = Math.max(0, currentIndex - 1);
		scrollToCard(newIndex);
	};

	const scrollRightHandler = () => {
		const newIndex = Math.min(cards.length - 1, currentIndex + 1);
		scrollToCard(newIndex);
	};

	// Enhanced mouse events with better feedback
	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
		scrollContainerRef.current.style.cursor = 'grabbing';
		scrollContainerRef.current.style.userSelect = 'none';
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		e.preventDefault();
		const x = e.pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 1.5; // Slightly reduced for better control
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUp = () => {
		if (!scrollContainerRef.current) return;
		setIsDragging(false);
		scrollContainerRef.current.style.cursor = 'grab';
		scrollContainerRef.current.style.userSelect = '';
		
		// Snap to nearest card after mouse drag
		setTimeout(() => {
			const cardWidth = getCardWidth();
			const currentScroll = scrollContainerRef.current?.scrollLeft || 0;
			const targetIndex = Math.round(currentScroll / cardWidth);
			scrollToCard(targetIndex);
		}, 50);
	};

	const handleMouseLeave = () => {
		if (!scrollContainerRef.current) return;
		setIsDragging(false);
		scrollContainerRef.current.style.cursor = 'grab';
		scrollContainerRef.current.style.userSelect = '';
	};

	// Enhanced touch events with velocity tracking and momentum
	const handleTouchStart = (e: React.TouchEvent) => {
		if (!scrollContainerRef.current) return;
		setIsDragging(true);
		setTouchStartTime(Date.now());
		const touchX = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
		setStartX(touchX);
		setLastTouchX(touchX);
		setScrollLeft(scrollContainerRef.current.scrollLeft);
		setVelocity(0);
		
		// Prevent default to avoid interference with native scrolling
		e.preventDefault();
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging || !scrollContainerRef.current) return;
		e.preventDefault(); // Prevent page scroll
		
		const currentTime = Date.now();
		const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
		const walk = (x - startX) * 1.2; // Optimized for touch
		
		// Calculate velocity for momentum
		const timeDelta = currentTime - touchStartTime;
		if (timeDelta > 0) {
			const newVelocity = (x - lastTouchX) / Math.max(timeDelta, 16); // Prevent division by very small numbers
			setVelocity(newVelocity);
		}
		
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
		setLastTouchX(x);
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		setIsDragging(false);
		
		// Apply momentum only if there was significant velocity
		if (Math.abs(velocity) > 0.3) {
			applyMomentumScroll();
		} else {
			// Snap to nearest card for small movements
			setTimeout(() => {
				const cardWidth = getCardWidth();
				const currentScroll = scrollContainerRef.current?.scrollLeft || 0;
				const targetIndex = Math.round(currentScroll / cardWidth);
				scrollToCard(targetIndex);
			}, 50);
		}
	};

	// Handle scroll events (for manual scrolling)
	const handleScroll = useCallback(() => {
		if (!isInertiaScrolling && !isDragging) {
			checkScrollPosition();
		}
	}, [checkScrollPosition, isInertiaScrolling, isDragging]);

	// Keyboard navigation for accessibility
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft') {
			e.preventDefault();
			scrollLeftHandler();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			scrollRightHandler();
		}
	}, [currentIndex]);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll, { passive: true });
			checkScrollPosition();

			// Add keyboard navigation
			document.addEventListener('keydown', handleKeyDown);

			// Handle window resize for responsive card width
			const handleResize = () => {
				checkScrollPosition();
			};
			window.addEventListener('resize', handleResize, { passive: true });

			return () => {
				container.removeEventListener('scroll', handleScroll);
				document.removeEventListener('keydown', handleKeyDown);
				window.removeEventListener('resize', handleResize);
			};
		}
	}, [handleScroll, handleKeyDown, checkScrollPosition]);

	return (
		<section className="w-full py-24 md:py-46 xl:py-68 overflow-hidden">
			<div className="mx-auto">
				<div className="mx-auto max-w-3xl text-center mb-16">
					<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
						Not another meal planning app.
					</span>
					<h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
						Something better. <br />
						Built for real life.
					</h2>
				</div>

				{/* Navigation and Carousel Container */}
                <div className="w-full px-4 md:px-12 xl:px-24 justify-end items-end flex gap-2 mb-4">
                    <button
                        onClick={scrollLeftHandler}
                        disabled={!canScrollLeft}
                        aria-label="Previous card"
                        className={`bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-3 md:p-3 lg:p-4 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--primary)] active:translate-x-[3px] active:translate-y-[3px] touch-manipulation ${
                            !canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                        <ChevronLeft
                            className="w-5 h-5 md:w-6 md:h-6"
                            strokeWidth={3}
                        />
                    </button>
                    <button
                        onClick={scrollRightHandler}
                        disabled={!canScrollRight}
                        aria-label="Next card"
                        className={`bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-3 md:p-3 lg:p-4 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_var(--primary)] active:translate-x-[3px] active:translate-y-[3px] touch-manipulation ${
                            !canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                        <ChevronRight
                            className="w-5 h-5 md:w-6 md:h-6"
                            strokeWidth={3}
                        />
                    </button>
                </div>

				<div className="relative">
					<div
						ref={scrollContainerRef}
						className="flex gap-8 overflow-x-auto pb-8 px-2 cursor-grab select-none scroll-smooth"
						style={{ 
							scrollbarWidth: 'none', 
							msOverflowStyle: 'none',
							scrollSnapType: 'x mandatory',
							WebkitOverflowScrolling: 'touch',
							overscrollBehaviorX: 'contain'
						}}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						role="region"
						aria-label="Feature carousel"
						tabIndex={0}>
                        <div className="flex-none w-[20px] md:w-[100px] xl:w-[400px]"></div>
						{cards.map((card, index) => {
							return (
								<div
									key={card.id}
									className="flex-none w-[380px] md:w-[460px] xl:w-[520px] snap-start snap-always"
									style={{ scrollSnapAlign: 'start' }}>
									<div
										className={`relative h-[480px] md:h-[540px] xl:h-[600px] rounded-3xl ${card.bgColor} border-2 border-primary p-8 shadow-[8px_8px_0px_0px_var(--primary)] transform hover:shadow-[4px_4px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 ${
											isDragging ? 'transition-none' : ''
										}`}
										role="article"
										aria-label={`Feature: ${card.title}`}>
										<div className="relative z-20 h-full flex flex-col">
											<div className="flex items-center gap-3 mb-6">
												<div>
													<h3 className={`text-2xl md:text-3xl xl:text-4xl font-bold ${card.id === 5 ? 'text-white' : 'text-primary'}`}>{card.title}</h3>
													<p className={`${card.id === 5 ? 'text-gray-200' : 'text-primary/80'} text-sm md:text-md xl:text-lg font-medium`}>
														{card.subtitle}
													</p>
												</div>
											</div>

											<p className={`text-md md:text-lg xl:text-xl ${card.id === 5 ? 'text-background' : 'text-foreground'} mb-8 leading-relaxed font-medium`}>
												{card.description}
											</p>

											<div className="mt-auto">

												{/* Steps for convenience card */}
												{card.steps && (
													<div className="space-y-4">
														{card.steps.map((step, stepIndex) => (
															<div
																key={stepIndex}
																className={`flex items-center gap-3 p-3 ${
																	step.status === 'active'
																		? 'bg-secondary'
																		: 'bg-accent'
																} border-2 border-primary rounded-xl shadow-[2px_2px_0px_0px_var(--primary)]`}>
																<div className="w-6 md:w-8 xl:w-10 h-6 md:h-8 xl:h-10 bg-primary text-secondary rounded-full flex items-center justify-center text-xs md:text-md xl:text-lg font-bold border border-foreground">
																	{step.number}
																</div>
																<span
																	className="font-bold text-foreground text-sm md:text-md xl:text-lg">
																	{step.text}
																</span>
																<div className="ml-auto">
                                                                    {step.status === 'open' ? (
                                                                        <BookOpen className="size-4 md:size-5 xl:size-6 text-primary" />
                                                                    ) : step.status === 'confirm' ? (
                                                                        <CheckCircle className="size-4 md:size-5 xl:size-6 text-primary" />
                                                                    ) : (
                                                                        <ShoppingCart className="size-4 md:size-5 xl:size-6 text-primary" />
                                                                    )}
																</div>
															</div>
														))}
													</div>
												)}

												{/* Price comparison for save money card */}
												{card.comparison && (
													<div className="space-y-3">
														{card.comparison.map((item, itemIndex) => (
															<div
																key={itemIndex}
																className={`flex justify-between items-center p-4 ${
																	item.isOurs
																		? 'bg-primary'
																		: 'bg-background'
																} border-2 border-primary rounded-xl shadow-[2px_2px_0px_0px_var(--foreground)]`}>
																<span
																	className={`text-sm md:text-md lg:text-lg ${
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
															<span className="text-foreground font-medium text-sm md:text-md xl:text-lg">
																This Week
															</span>
															<span className="text-foreground/70 text-sm md:text-md xl:text-lg">
																3 meals planned
															</span>
														</div>
														<div className="grid grid-cols-7 gap-1">
															{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
																<div
																	key={i}
																	className={`w-8 md:w-10 xl:w-12 h-8 md:h-10 xl:h-12 rounded-lg flex items-center justify-center text-xs md:text-md xl:text-lg font-bold border shadow-[2px_2px_0px_0px_var(--primary)] ${
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
														{card.features.map((feature, featureIndex) => {
															const FeatureIcon = feature.icon;
															return (
																<div
																	key={featureIndex}
																	className={`${
																		featureIndex === 0 ? 'bg-primary/10' : 'bg-accent'
																	} relative border-2 border-primary rounded-xl shadow-[2px_2px_0px_0px_var(--primary)] p-4 z-30`}>
																	<div className="flex items-center gap-3">
																		<div className="w-8 md:w-10 xl:w12 h-8 md:h-10 xl:h12 bg-secondary rounded-lg flex items-center justify-center border shadow-[2px_2px_0px_0px_var(--primary)]">
																			<FeatureIcon className="size-4 md:size-5 xl:size-6 text-primary" />
																		</div>
																		<div>
																			<div className="text-foreground font-medium text-sm md:text-md xl:text-lg">
																				{feature.title}
																			</div>
																			<div className="text-foreground/70 text-xs md:text-sm xl:text-md">
																				{feature.subtitle}
																			</div>
																		</div>
																	</div>
																</div>
															);
														})}
													</div>
												)}

                                                {/* Recipe categories for discover flavors card */}
												{card.recipeCategories && (
													<div className="space-y-3">
														{card.recipeCategories.map((category, categoryIndex) => {
															const CategoryIcon = category.icon;
															return (
																<div
																	key={categoryIndex}
																	className="bg-background border-2 border-primary rounded-xl shadow-[2px_2px_0px_0px_var(--primary)] p-4">
																	<div className="flex items-center gap-3">
																		<div className="w-10 md:w-12 xl:w-14 h-10 md:h-12 xl:h-14 bg-secondary rounded-xl flex items-center justify-center border-2 border-foreground shadow-[2px_2px_0px_0px_var(--foreground)]">
																			<CategoryIcon className="size-5 md:size-6 xl:size-7 text-primary" />
																		</div>
																		<div className="flex-1">
																			<div className="text-foreground font-bold text-sm md:text-md xl:text-lg">
																				{category.name}
																			</div>
																			<div className="text-foreground/70 text-xs md:text-sm xl:text-md">
																				{category.count} • {category.difficulty}
																			</div>
																		</div>
																	</div>
																</div>
															);
														})}
													</div>
												)}

                                                {/* Smart features for food waste card */}
												{card.smartFeatures && (
													<div className="space-y-3">
														{card.smartFeatures.map((feature, featureIndex) => {
															const FeatureIcon = feature.icon;
															return (
																<div
																	key={featureIndex}
																	className={`${feature.status === 'active' ? 'bg-secondary' : 'bg-accent'} border-2 border-primary rounded-xl shadow-[2px_2px_0px_0px_var(--primary)] p-4`}>
																	<div className="flex items-center gap-3">
																		<div className="w-10 md:w-12 xl:w-14 h-10 md:h-12 xl:h-14 bg-secondary rounded-xl flex items-center justify-center border-2 border-primary shadow-[2px_2px_0px_0px_var(--primary)]">
																			<FeatureIcon className="size-5 md:size-6 xl:size-7 text-primary" />
																		</div>
																		<div className="flex-1">
																			<div className="text-foreground font-bold text-sm md:text-md xl:text-lg">
																				{feature.title}
																			</div>
																			<div className="text-foreground/80 text-xs md:text-sm xl:text-md">
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

										{/* Decorative bubble elements */}
										<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
											{Array.from({ length: 20 }, (_, i) => {
												// Use card.id as seed for consistent pseudo-random positioning
												const seed = card.id * 7 + i * 13;
												const topPercent = 5 + ((seed * 17) % 90);
												const leftPercent = 5 + ((seed * 23) % 90);
												const size = 1 + ((seed * 31) % 6);
												
												// Animation properties
												const animationDelay = (seed * 3) % 10;
												const animationDuration = 3 + ((seed * 7) % 8);
												const animationType = i % 6; // More animation variety
												
												// Create color variations based on each card's background color
												let colorVariations = [];
												if (card.id === 0) { // bg-primary/10
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else if (card.id === 1) { // bg-secondary
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else if (card.id === 2) { // bg-accent
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else if (card.id === 3) { // bg-background
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else if (card.id === 4) { // bg-accent/25
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else { // card.id === 5, bg-primary/80
													colorVariations = ['bg-secondary/80', 'bg-secondary/60', 'bg-secondary/40'];
												}
												
												const bgColor = colorVariations[i % 3];
												
												let animationClass = '';
												if (animationType === 0) animationClass = 'animate-float';
												else if (animationType === 1) animationClass = 'animate-pulse-subtle';
												else if (animationType === 2) animationClass = 'animate-drift';
												else if (animationType === 3) animationClass = 'animate-float-gentle';
												else if (animationType === 4) animationClass = 'animate-breathe';
												else animationClass = 'animate-float-and-drift';
												
												return (
													<div
														key={i}
														className={`absolute ${bgColor} rounded-full ${animationClass}`}
														style={{
															top: `${topPercent}%`,
															left: `${leftPercent}%`,
															width: `${size * 4}px`,
															height: `${size * 4}px`,
															opacity: '15%',
															animationDelay: `${animationDelay}s`,
															animationDuration: `${animationDuration}s`,
														}}
													/>
												);
											})}
                                        </div>
									</div>
								</div>
							);
						})}
                        <div className="flex-none w-[20px] md:w-[100px] xl:w-[400px]"></div>
					</div>

					{/* Enhanced Scroll Indicator Pill */}
					<div className="flex justify-center mt-6">
						<div className="bg-background border-2 border-primary rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_var(--primary)]">
							<div className="flex items-center gap-2">
								<div className="flex gap-1">
									{cards.map((_, index) => (
										<button
											key={index}
											onClick={() => scrollToCard(index)}
											className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-150 touch-manipulation ${
												index === currentIndex ? 'bg-primary scale-125' : 'bg-primary/30 hover:bg-primary/50'
											}`}
											aria-label={`Go to slide ${index + 1}`}
										/>
									))}
								</div>
								<span className="text-xs font-medium text-primary ml-2">
									{currentIndex + 1} of {cards.length}
								</span>
                                <span className="text-xs text-primary/70 ml-1 hidden sm:inline">• Drag to explore</span>
                                <span className="text-xs text-primary/70 ml-1 sm:hidden">• Swipe to explore</span>
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
				
				/* Smooth scroll snap behavior */
				@supports (scroll-snap-type: x mandatory) {
					.scroll-smooth {
						scroll-behavior: smooth;
					}
				}
				
				/* Enhance touch responsiveness */
				.touch-manipulation {
					touch-action: manipulation;
				}
				
				/* Custom animations for floating elements */
				@keyframes float {
					0%, 100% { transform: translateY(0px) rotate(0deg); }
					50% { transform: translateY(-10px) rotate(180deg); }
				}
				
				@keyframes pulse-subtle {
					0%, 100% { opacity: 0.1; transform: scale(1); }
					50% { opacity: 0.2; transform: scale(1.1); }
				}
				
				@keyframes drift {
					0%, 100% { transform: translateX(0px); }
					50% { transform: translateX(10px); }
				}
				
				@keyframes float-gentle {
					0%, 100% { transform: translateY(0px); }
					50% { transform: translateY(-5px); }
				}
				
				@keyframes breathe {
					0%, 100% { transform: scale(1); }
					50% { transform: scale(1.05); }
				}
				
				@keyframes float-and-drift {
					0%, 100% { transform: translateY(0px) translateX(0px); }
					25% { transform: translateY(-5px) translateX(5px); }
					75% { transform: translateY(5px) translateX(-5px); }
				}
				
				.animate-float { animation: float 6s ease-in-out infinite; }
				.animate-pulse-subtle { animation: pulse-subtle 4s ease-in-out infinite; }
				.animate-drift { animation: drift 8s ease-in-out infinite; }
				.animate-float-gentle { animation: float-gentle 5s ease-in-out infinite; }
				.animate-breathe { animation: breathe 7s ease-in-out infinite; }
				.animate-float-and-drift { animation: float-and-drift 10s ease-in-out infinite; }
				
				/* Reduce motion for users who prefer it */
				@media (prefers-reduced-motion: reduce) {
					.animate-float,
					.animate-pulse-subtle,
					.animate-drift,
					.animate-float-gentle,
					.animate-breathe,
					.animate-float-and-drift {
						animation: none;
					}
				}
			`}</style>
		</section>
	);
};

export default EnhancedCarousel;