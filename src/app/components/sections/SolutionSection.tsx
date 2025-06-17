import React from 'react';
import ReusableCarousel from '../ui/Carousel';

const SolutionSection = () => {
	const problems = [
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
		<section id="problem">
            <ReusableCarousel 
                cards={problems}
                title="Something better. Built for real life."
                subtitle="Not another meal planning app."
            />
		</section>
	);
};

export default SolutionSection;