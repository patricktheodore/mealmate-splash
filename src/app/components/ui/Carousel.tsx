import React, { useState, useRef, useEffect } from 'react';
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

	// Check scroll position and update navigation state
	const checkScrollPosition = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

			// Update current index based on scroll position
			const cardWidth = 372 + 32; // updated card width + gap
			const newIndex = Math.round(scrollLeft / cardWidth);
			setCurrentIndex(newIndex);
		}
	};

	const scrollToCard = (index: number) => {
		if (scrollContainerRef.current) {
			const cardWidth = 372 + 32; // updated card width + gap
			scrollContainerRef.current.scrollTo({
				left: index * cardWidth,
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
			checkScrollPosition();

			return () => {
				container.removeEventListener('scroll', checkScrollPosition);
			};
		}
	}, []);

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

				<div className="w-full px-4 md:px-12 xl:px-24 justify-end items-end flex gap-2 mb-4">
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
						className="flex gap-8 overflow-x-auto pb-8 px-2 cursor-grab select-none"
						style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseLeave}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}>
						
						{/* Left spacing */}
						<div className="flex-none w-[20px] md:w-[100px] xl:w-[400px]"></div>
						
						{cards.map((card) => (
							<div
								key={card.id}
								className="flex-none w-[340px] md:w-[400px] xl:w-[460px] snap-start">
								<div className="group relative flex-none w-[340px] md:w-[400px] xl:w-[460px]">
									<div
										className={`relative h-[460px] md:h-[520px] xl:h-[580px] rounded-3xl ${card.bgColor} border-4 border-primary p-8 shadow-[8px_8px_0px_0px_var(--primary)] transform hover:shadow-[4px_4px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer overflow-hidden`}>

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
													<img
														src={card.image}
														alt="Card Illustration"
														className="max-w-[95%] w-full h-auto max-h-full object-contain"
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
						
						{/* Right spacing */}
						<div className="flex-none w-[20px] md:w-[100px] xl:w-[400px]"></div>
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
		</section>
	);
};

export default ReusableCarousel;