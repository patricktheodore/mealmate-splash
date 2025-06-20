import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselCard {
	id: number;
	title: string;
	description: string;
	bgColor: string;
	textColor?: string;
	backgroundNoiseFilterUrl?: string;
	image?: string;
}

interface ReusableCarouselProps {
	cards: CarouselCard[];
	title?: string;
	subtitle?: string;
	className?: string;
}

const ReusableCarousel: React.FC<ReusableCarouselProps> = ({ 
	cards, 
	title, 
	subtitle, 
	className = "" 
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [cardWidth, setCardWidth] = useState(340);
	const [leftSpacerWidth, setLeftSpacerWidth] = useState(20);
    const [touchStartTime, setTouchStartTime] = useState(0);
    const [touchStartScrollLeft, setTouchStartScrollLeft] = useState(0);

	// Update card width and spacer based on screen size
	useEffect(() => {
		const updateDimensions = () => {
			const width = window.innerWidth;
			if (width < 768) {
				// Mobile: card width 340px, center the first card
				setCardWidth(340);
				// Calculate spacer to center first card: (viewport width - card width) / 2
				const spacer = Math.max(20, (width - 340) / 2);
				setLeftSpacerWidth(spacer);
			} else if (width < 1280) {
				// Tablet
				setCardWidth(400);
				setLeftSpacerWidth(100);
			} else {
				// Desktop
				setCardWidth(460);
				setLeftSpacerWidth(400);
			}
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	// Check scroll position and update navigation state
	const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            // Simple threshold calculation
            const adjustedScrollLeft = scrollLeft + leftSpacerWidth;
            const gap = 32;
            const cardWithGap = cardWidth + gap;
            
            // Calculate position and use 30% threshold
            const exactIndex = adjustedScrollLeft / cardWithGap;
            const decimal = exactIndex % 1;
            
            let newIndex;
            if (decimal < 0.1) {
                // Less than 30% into the card - snap to this card
                newIndex = Math.floor(exactIndex);
            } else if (decimal > 0.9) {
                // More than 70% into the card - snap to next card
                newIndex = Math.ceil(exactIndex);
            } else {
                // In the middle zone (30%-70%) - maintain current position
                // This creates a "dead zone" that prevents jittery behavior
                return; // Don't update the index
            }
            
            setCurrentIndex(Math.max(0, Math.min(cards.length - 1, newIndex)));
        }
    };

	const scrollToCard = (index: number) => {
		if (scrollContainerRef.current) {
			const gap = 32;
			const cardWithGap = cardWidth + gap;
			const targetScroll = (index * cardWithGap) - leftSpacerWidth;
			
			scrollContainerRef.current.scrollTo({
				left: Math.max(0, targetScroll),
				behavior: 'smooth',
			});
		}
	};

	const scrollLeftHandler = () => {
		const newIndex = Math.max(0, currentIndex - 1);
		scrollToCard(newIndex);
	};

	const scrollRightHandler = () => {
		const newIndex = Math.min(cards.length - 1, currentIndex + 1);
		scrollToCard(newIndex);
	};

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
		const walk = (x - startX) * 1.5; // Reduced scroll speed for smoother control
		scrollContainerRef.current.scrollLeft = scrollLeft - walk;
	};

	const handleMouseUp = () => {
		if (!scrollContainerRef.current) return;
		setIsDragging(false);
		scrollContainerRef.current.style.cursor = 'grab';
		
		// Snap to nearest card after mouse up
		setTimeout(() => {
			scrollToCard(currentIndex);
		}, 100);
	};

	const handleMouseLeave = () => {
		if (!scrollContainerRef.current) return;
		setIsDragging(false);
		scrollContainerRef.current.style.cursor = 'grab';
	};

	const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;
        const touch = e.touches[0];
        setStartX(touch.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        setTouchStartTime(Date.now());
        setTouchStartScrollLeft(scrollContainerRef.current.scrollLeft);
    };

	const handleTouchMove = () => {
		// Let native scroll handle touch on mobile for smoother experience
		// The scroll event will update our state

	};

    const handleTouchEnd = () => {
        if (!scrollContainerRef.current) return;
        
        const currentScroll = scrollContainerRef.current.scrollLeft;
        const scrollDelta = currentScroll - touchStartScrollLeft;
        const minSwipeDistance = 20; // Minimum distance to register as a swipe
        
        let targetIndex = currentIndex;
        
        if (scrollDelta > minSwipeDistance) {
            // Scrolled right (forward) - go to next card
            targetIndex = Math.min(cards.length - 1, currentIndex + 1);
        } else if (scrollDelta < -minSwipeDistance) {
            // Scrolled left (backward) - go to previous card
            targetIndex = Math.max(0, currentIndex - 1);
        }
        // If scrollDelta is within minSwipeDistance, stay on current card
        
        setTimeout(() => {
            scrollToCard(targetIndex);
        }, 50);
    };

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', checkScrollPosition);
			checkScrollPosition();

			return () => {
				container.removeEventListener('scroll', checkScrollPosition);
			};
		}
	}, [leftSpacerWidth, cardWidth]);

	return (
		<section className={`w-full py-24 md:py-46 xl:py-68 overflow-hidden ${className}`}>
			<div className="mx-auto">
                <div className="mx-auto max-w-3xl text-center mb-16">
					<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
						{subtitle}
					</span>
					<h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
						{title}
					</h2>
				</div>

				<div className="w-full px-8 md:px-12 xl:px-24 justify-end items-end flex gap-2 mb-4">
					<button
						onClick={scrollLeftHandler}
						disabled={!canScrollLeft}
						className={`bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-3 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] ${
							!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''
						}`}>
						<ChevronLeft className="w-5 h-5" strokeWidth={3} />
					</button>
					<button
						onClick={scrollRightHandler}
						disabled={!canScrollRight}
						className={`bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-3 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[2px_2px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] ${
							!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''
						}`}>
						<ChevronRight className="w-5 h-5" strokeWidth={3} />
					</button>
				</div>

				{/* Carousel Container */}
				<div className="relative">
					<div
						ref={scrollContainerRef}
						className="flex gap-8 overflow-x-auto pb-8 px-2 cursor-grab select-none scroll-smooth"
						style={{ 
                            scrollbarWidth: 'none', 
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            scrollSnapType: 'x mandatory', // Changed from 'x proximity' to 'x mandatory'
                            scrollPaddingLeft: `${leftSpacerWidth}px` // Add scroll padding to account for spacer
                        }}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}>
						
						{/* Dynamic left spacing */}
						<div 
							className="flex-none" 
							style={{ width: `${leftSpacerWidth}px` }}
						></div>
						
						{cards.map((card) => (
							<div
                                key={card.id}
                                className="flex-none w-[340px] md:w-[400px] xl:w-[460px] scroll-snap-align-start"
                                style={{ scrollSnapAlign: 'start' }} // Fallback for older browsers
                            >
								<div className="group relative flex-none w-[340px] md:w-[400px] xl:w-[460px]">
									<div className={`embla__parallax__layer relative h-[460px] md:h-[520px] xl:h-[580px] rounded-3xl ${card.bgColor} border-4 border-primary p-8 shadow-[8px_8px_0px_0px_var(--primary)] transform hover:shadow-[4px_4px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer overflow-hidden`}>

										{/* Card Content */}
										<div className="relative z-20 h-full flex flex-col">
											{/* Text Content at Top - Reduced height */}
											<div className="flex-shrink-0 mb-4">
												<h3 className={`text-xl md:text-2xl xl:text-3xl font-bold mb-3 ${
													card.textColor || 'text-primary'
												}`}>
													{card.title}
												</h3>
												<p className={`text-sm md:text-base xl:text-lg leading-relaxed font-medium ${
													card.textColor === 'text-white' ? 'text-gray-200' : 
													card.textColor ? `${card.textColor}/80` : 'text-primary/80'
												}`}>
													{card.description}
												</p>
											</div>

											{/* Large Centered Image - Increased size and weight */}
											{card.image && (
												<div className="w-full flex-1 flex items-center justify-center relative min-h-0">
													<div className="relative w-full h-full max-w-[95%] max-h-full">
														<Image
															src={card.image}
															alt="Card Illustration"
															fill
															className="object-contain"
															sizes="(max-width: 768px) 95vw, (max-width: 1200px) 400px, 460px"
														/>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
						
						{/* Dynamic right spacing */}
						<div 
							className="flex-none" 
							style={{ width: `${leftSpacerWidth}px` }}
						></div>
					</div>

					{/* Scroll Indicator */}
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
								<span className="text-xs text-primary/70 ml-1 hidden md:inline">• Drag to explore</span>
								<span className="text-xs text-primary/70 ml-1 md:hidden">• Swipe to explore</span>
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
		</section>
	);
};

export default ReusableCarousel;