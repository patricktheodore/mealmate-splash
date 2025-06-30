import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined,
	onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
		if (onButtonClick) onButtonClick(emblaApi);
	}, [emblaApi, onButtonClick]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = (props) => {
	const { ...restProps } = props;

	return (
		<button
			className="embla__button bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-2 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[2px_2px_0px_0px_var(--primary)] hover:shadow-[0px_0px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px]"
			type="button"
			{...restProps}>
			<ChevronLeft className="w-5 h-5" strokeWidth={3} />
		</button>
	);
};

export const NextButton: React.FC<PropType> = (props) => {
	const { ...restProps } = props;

	return (
		<button
			className="embla__button bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base p-2 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[2px_2px_0px_0px_var(--primary)] hover:shadow-[0px_0px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px]"
			type="button"
			{...restProps}>
			<ChevronRight className="w-5 h-5" strokeWidth={3} />
		</button>
	);
};