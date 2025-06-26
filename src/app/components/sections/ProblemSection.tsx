import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '../ui/Carousel/Carousel';

const ProblemSection = () => {
	const OPTIONS: EmblaOptionsType = { containScroll: false };

	const SLIDES = [
		{
			id: 0,
			title: 'You pay extra for no reason.',
			description: 'Often 40-60% more than buying the same ingredients yourself at the supermarket',
			bgColor: 'bg-background',
			textColor: 'text-primary',
			image: '/images/problem-01.png',
		},
		{
			id: 1,
			title: 'You still have to grocery shop.',
			description: 'Meal kits solve part of the problem, but not the rest.',
			bgColor: 'bg-primary/60',
			textColor: 'text-white',
			image: '/images/problem-02.png',
		},
		{
			id: 2,
			title: 'You get trapped into weekly subscriptions.',
			description: 'Pre-set menus and costly lock in subscriptions.',
			bgColor: 'bg-accent/80',
			textColor: 'text-primary',
			image: '/images/problem-03.png',
		},
		{
			id: 3,
			title: 'All that plastic... every week.',
			description: 'Convenience comes at a cost to the environment.',
			bgColor: 'bg-secondary',
			textColor: 'text-primary',
			image: '/images/problem-04.png',
		},
	];

	return (
        <section id='problem' className="w-full py-24 md:py-46 xl:py-68 overflow-hidden">
            <div className="mx-auto">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
                        We tried every meal kit out there.
                    </span>
                    <h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
                        Here&apos;s why they don&apos;t work.
                    </h2>
                </div>
            </div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
	);
};

export default ProblemSection;
