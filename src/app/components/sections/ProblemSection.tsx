import React from 'react';
import {
	DollarSign,
	Lock,
	Trash2,
	Unlink,
} from 'lucide-react';

const ProblemSection = () => {
	const problems = [
		{
			id: 0,
			icon: DollarSign,
			title: 'Too expensive',
			description: 'Pay 40-60% more than buying the same ingredients yourself at the supermarket',
			bgColor: 'bg-primary/60',
            textColor: 'text-white',
		},
		{
			id: 1,
			icon: Lock,
			title: 'Inflexible',
			description: 'Locked into subscriptions with limited flexibility and no control over what you receive',
			bgColor: 'bg-secondary',
            textColor: 'text-primary',
		},
		{
			id: 2,
			icon: Trash2,
			title: 'Wasteful packaging',
			description: 'Excessive plastic and packaging waste with every single delivery box',
			bgColor: 'bg-accent/80',
            textColor: 'text-primary',
		},
		{
			id: 3,
			icon: Unlink,
			title: 'Disjointed experience',
			description: 'Planning meals through separate platforms adds friction instead of simplifying your life',
			bgColor: 'bg-background',
            textColor: 'text-primary',
		},
	];

	return (
		<section
			id="problem"
			className="w-full py-24 md:py-46 xl:py-68 px-4 md:px-8 xl:px-12 min-h-[600px] relative overflow-hidden">

			<div className="mx-auto max-w-7xl relative z-10">
				<div className="mx-auto max-w-3xl text-center mb-16">
					<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
						The current model is broken.
					</span>
					<h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
						Why meal kits don&apos;t work.
					</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{problems.map((problem) => {
						const IconComponent = problem.icon;
						return (
							<div
								key={problem.id}
								className="group relative">
								<div
									className={`relative h-[280px] md:h-[320px] rounded-3xl ${problem.bgColor} border-4 border-primary p-8 shadow-[6px_6px_0px_0px_var(--primary)] transform hover:shadow-[6px_6px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer`}>
									
									{/* Icon container */}
									<div className="flex items-center gap-4 mb-6">
										<div className={`w-16 md:w-20 xl:w-24 h-16 md:h-20 xl:h-24 ${problem.bgColor} rounded-2xl flex items-center justify-center border-3 border-primary shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300`}>
											<IconComponent className={`size-8 md:size-10 xl:size-12 ${problem.textColor}`} strokeWidth={2.5} />
										</div>
									</div>

									{/* Content */}
									<div className="relative z-20">
										<h3 className={`text-2xl md:text-3xl xl:text-4xl font-bold mb-4 ${problem.id === 0 ? 'text-white' : 'text-primary'}`}>
											{problem.title}
										</h3>
										<p className={`text-base md:text-lg xl:text-xl leading-relaxed font-medium ${problem.id === 0 ? 'text-gray-200' : 'text-primary/80'}`}>
											{problem.description}
										</p>
									</div>

									<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
											{Array.from({ length: 20 }, (_, i) => {
												// Use card.id as seed for consistent pseudo-random positioning
												const seed = problem.id * 7 + i * 13;
												const topPercent = 5 + ((seed * 17) % 90);
												const leftPercent = 5 + ((seed * 23) % 90);
												const size = 1 + ((seed * 31) % 6);
												
												// Animation properties
												const animationDelay = (seed * 3) % 10;
												const animationDuration = 3 + ((seed * 7) % 8);
												const animationType = i % 6; // More animation variety
												
												// Create color variations based on each problem's background color
												let colorVariations = [];
												if (problem.id === 0) { // bg-primary/10
													colorVariations = ['bg-secondary/80', 'bg-secondary/60', 'bg-secondary/40'];
												} else if (problem.id === 1) { // bg-secondary
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else if (problem.id === 2) { // bg-accent
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else if (problem.id === 3) { // bg-background
													colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
												} else { // problem.id === 5, bg-primary/80
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
				</div>
			</div>
		</section>
	);
};

export default ProblemSection;