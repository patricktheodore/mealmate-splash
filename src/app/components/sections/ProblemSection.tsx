import React from 'react';
import ReusableCarousel from '../ui/Carousel';

const ProblemSection = () => {
	const problems = [
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
		<section id="problem">
            <ReusableCarousel 
                cards={problems}
                title="Here&apos;s why they don&apos;t work."
                subtitle="We tried every meal kit out there."
            />
		</section>
	);
};

export default ProblemSection;