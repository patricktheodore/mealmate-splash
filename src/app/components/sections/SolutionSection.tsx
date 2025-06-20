import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '../ui/Carousel/Carousel';

const SolutionSection = () => {
    const OPTIONS: EmblaOptionsType = { containScroll: false };
    
	const SLIDES = [
		{
			id: 0,
			title: 'Same convenience. Fraction of the cost.',
			description: 'Half the price of traditional meal kits.',
            bgColor: 'bg-accent/80',
            textColor: 'text-primary',
            image: '/images/solution-01.png',
		},
		{
			id: 1,
			title: 'Built around your grocery shopping.',
			description: 'Plan meals and fill your cart - all in one go',
			bgColor: 'bg-indigo-400/80',
            textColor: 'text-white',
            image: '/images/solution-02.png',
		},
		{
			id: 2,
			title: 'You’re in control. Always.',
			description: 'No lock-ins, no subscriptions - just meals your way',
			bgColor: 'bg-background',
            textColor: 'text-primary',
            image: '/images/solution-03.png',
		},
		{
			id: 3,
			title: 'Meals made for you.',
			description: 'Personalised to your taste, budget & goals',
			bgColor: 'bg-primary/60',
            textColor: 'text-white',
            image: '/images/solution-04.png',
		},
		{
			id: 4,
			title: 'Recipe cards you’ll keep forever.',
			description: 'Designed to be collected, reused and loved',
			bgColor: 'bg-secondary',
            textColor: 'text-primary',
            image: '/images/solution-05.png',
		},
	];

	return (
        <section id='solution' className="w-full py-24 md:py-46 xl:py-68 overflow-hidden">
            <div className="mx-auto">
                <div className="mx-auto max-w-3xl text-center mb-16">
                    <span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
                        Not another meal planning app.
                    </span>
                    <h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
                        Something better. Built for real life.
                    </h2>
                </div>
            </div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
	);
};

export default SolutionSection;