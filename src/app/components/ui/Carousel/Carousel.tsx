import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { useDotButton } from './EmblaCarouselDotButtons'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { Dot } from 'lucide-react';
import Image from 'next/image';
interface Slide {
	id: number;
	title: string;
	description: string;
	bgColor: string;
	textColor?: string;
	image?: string;
}

type PropType = {
	slides: Slide[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { slides, options } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

	return (
		<>
			<div className="w-full flex justify-end gap-2 py-4 px-8 xl:px-12">
				<div className="embla__buttons">
					<PrevButton
						onClick={onPrevButtonClick}
						disabled={prevBtnDisabled}
					/>
					<NextButton
						onClick={onNextButtonClick}
						disabled={nextBtnDisabled}
					/>
				</div>
			</div>

			<section className="embla">
				<div
					className="embla__viewport"
					ref={emblaRef}>
					<div className="embla__container">
						{slides.map((slide, index) => (
							<div
								className="embla__slide py-2"
								key={index}>
								<div className={`embla__slide__content border-3 border-primary p-8 md:p-10 xl:p-12 relative flex flex-col justify-between gap-4 ${slide.bgColor} shadow-[6px_6px_0px_0px_var(--primary)] transform hover:shadow-[3px_3px_0px_0px_var(--primary)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 cursor-pointer overflow-hidden`}>
                                    <div className='flex flex-col items-start gap-2'>
                                        <h3 className={`text-[1.5rem] md:text-[2rem] xl:text-[3rem] font-bold mb-3 ${
                                            slide.textColor || 'text-primary'
                                        }`}>
                                            {slide.title}
                                        </h3>
                                        <p className={`text-[1rem] md:text-[1.25rem] xl:text-[1.5rem] leading-relaxed font-medium ${
                                            slide.textColor === 'text-white' ? 'text-gray-200' : 
                                            slide.textColor ? `${slide.textColor}/80` : 'text-primary/80'
                                        }`}>
                                            {slide.description}
                                        </p>
                                    </div>

                                    {slide.image && (
                                        <div className="w-full flex-1 flex items-center justify-center relative min-h-0">
                                            <div className="relative w-full h-full max-w-[95%] max-h-full">
                                                <Image
                                                    src={slide.image}
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
						))}
					</div>
				</div>
			</section>

			{/* <div
				className="embla__viewport"
				ref={emblaRef}>
				<div className="embla__container">
					{slides.map((slide, index) => (
						<div
							className="embla__slide"
							key={index}>
							<div className="embla__slide__number">
								<span>{index + 1}</span>
							</div>
						</div>
					))}
				</div>
			</div> */}

			{/* <div className="embla">
				<div
					className="embla__viewport"
					ref={emblaRef}
					style={{
						overflow: 'hidden',
					}}>
					<div className="embla__container">
						{slides.map((slide, index) => (
							<div
								className="embla__slide"
								key={slide.id}
								style={{
									minWidth: 0,
									flex: `0 0 460px`,
									paddingLeft: '1rem',
								}}>
								<div className="embla__parallax overflow-visible h-full">
									<div
										className={`embla__parallax__layer relative h-[460px] md:h-[520px] xl:h-[580px] rounded-3xl ${slide.bgColor} border-4 border-primary p-8 shadow-[8px_8px_0px_0px_var(--primary)] transform hover:shadow-[4px_4px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer overflow-hidden`}>
										<div className="relative z-20 h-full flex flex-col">
											<div className="flex-shrink-0 mb-4">
												<h3
													className={`text-xl md:text-2xl xl:text-3xl font-bold mb-3 ${
														slide.textColor || 'text-primary'
													}`}>
													{slide.title}
												</h3>
												<p
													className={`text-sm md:text-base xl:text-lg leading-relaxed font-medium ${
														slide.textColor === 'text-white'
															? 'text-gray-200'
															: slide.textColor
															? `${slide.textColor}/80`
															: 'text-primary/80'
													}`}>
													{slide.description}
												</p>
											</div>

											{slide.image && (
												<div className="w-full flex-1 flex items-center justify-center relative min-h-0">
													<div className="relative w-full h-full max-w-[95%] max-h-full">
														<Image
															src={slide.image}
															alt="Card Illustration"
															fill
															className="object-contain embla__parallax__img"
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
					</div>
				</div>
			</div> */}

			<div className="w-full flex justify-center">
				<div className="flex justify-center mt-6">
					<div className="bg-background border-2 border-primary rounded-full px-4 py-2 shadow-[2px_2px_0px_0px_var(--primary)]">
						<div className="flex items-center gap-2">
							<div className="flex gap-2">
								{scrollSnaps.map((_, index) => (
									<button
										key={index}
										onClick={() => onDotButtonClick(index)}
										className={`h-2 rounded-full transition-all duration-300 ${
											index === selectedIndex ? 'bg-primary w-6' : 'w-2 bg-primary/30'
										} hover:bg-primary/50 hover:scale-110 cursor-pointer`}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>
							<span className="text-xs font-medium text-primary ml-2">
								{selectedIndex + 1} of {slides.length}
							</span>
                            <span><Dot /></span>
							<span className="text-xs text-primary/70 ml-1 hidden md:inline">Click or drag to explore</span>
							<span className="text-xs text-primary/70 ml-1 md:hidden">Swipe to explore</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EmblaCarousel;
