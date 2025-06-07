import React from 'react';
import {
	Calendar,
	Sparkles,
	FileText,
	ShoppingCart,
	ChefHat,
} from 'lucide-react';

interface Step {
    id: number;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    description: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
}

const HowItWorksSection = () => {
	const steps: Step[] = [
		{
			id: 1,
			icon: Calendar,
			title: 'Set your week',
			description: 'Tell us your dietary preferences, schedule, and how many meals you need. Set it once and we\'ll remember for next time.',
			bgColor: 'bg-primary/70',
            textColor: 'text-white',
			accentColor: 'bg-primary',
		},
		{
			id: 2,
			icon: Sparkles,
			title: 'Smart suggestions',
			description: 'Get personalised meal recommendations based on your tastes, dietary needs, and cooking skill level. Fresh ideas every week.',
			bgColor: 'bg-secondary',
            textColor: 'text-primary',
			accentColor: 'bg-primary',
		},
		{
			id: 3,
			icon: FileText,
			title: 'Smart grocery list',
			description: 'Automatically generated shopping list with exact quantities needed. No food waste, no forgotten ingredients, no guesswork.',
			bgColor: 'bg-accent',
            textColor: 'text-primary',
			accentColor: 'bg-primary',
		},
		{
			id: 4,
			icon: ShoppingCart,
			title: 'One-click checkout',
			description: 'Seamless ordering through Woolworths with delivery or pickup options. Your groceries ordered and scheduled in seconds.',
			bgColor: 'bg-primary/20',
            textColor: 'text-primary',
			accentColor: 'bg-primary',
		},
		{
			id: 5,
			icon: ChefHat,
			title: 'Cook & enjoy',
			description: 'Follow easy step-by-step recipes with photos and timing guides. Great meals made simple, every single time.',
			bgColor: 'bg-indigo-400/80',
            textColor: 'text-white',
			accentColor: 'bg-primary',
		},
	];

	return (
		<div className="w-full py-24 md:py-46 xl:py-68 px-4 md:px-8 xl:px-12 relative overflow-hidden">

			<div className="mx-auto max-w-7xl relative z-10">
				{/* Header */}
				<div className="mx-auto max-w-3xl text-center mb-16">
					<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
						Simple, smart, seamless
					</span>
					<h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
						How it works
					</h2>
					<p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
						From meal inspiration to your kitchen in just five simple steps. No complex workflows, no learning curves — just meal planning that actually works.
					</p>
				</div>

				{/* Steps Layout */}
				<div className="relative">
					{/* Desktop: Flow layout */}
					<div className="hidden lg:block">
						<div className="grid grid-cols-3 gap-8 mb-12">
							{/* First row - steps 1, 2, 3 */}
							{steps.slice(0, 3).map((step) => (
								<StepCard key={step.id} step={step} />
							))}
						</div>

						<div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
							{/* Second row - steps 4, 5 */}
							{steps.slice(3, 5).map((step) => (
								<StepCard key={step.id} step={step} />
							))}
						</div>
					</div>

					{/* Mobile: Vertical layout */}
					<div className="lg:hidden space-y-6">
						{steps.map((step, index) => (
							<div key={step.id} className="relative">
								<StepCard step={step} />
							</div>
						))}
					</div>
				</div>

				{/* Bottom accent */}
				<div className="flex justify-center mt-16">
					<div className="bg-background border-2 border-primary rounded-full px-8 py-4 shadow-[4px_4px_0px_0px_var(--primary)]">
						<div className="flex items-center gap-4">
							<div className="flex gap-1">
								{steps.map((_, index) => (
									<div
										key={index}
										className="w-3 h-3 bg-primary rounded-full animate-pulse"
										style={{animationDelay: `${index * 0.2}s`}}
									/>
								))}
							</div>
							<span className="text-sm md:text-base font-bold text-primary">
								5 simple steps to better eating
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Individual Step Card Component
const StepCard = ({ step }: { step: Step }) => {
	const IconComponent = step.icon;
	
	return (
		<div className="group relative">
			<div
				className={`relative h-[300px] md:h-[340px] xl:h-[380px] rounded-3xl ${step.bgColor} border-4 border-primary p-6 md:p-8 shadow-[6px_6px_0px_0px_var(--primary)] transform hover:shadow-[4px_4px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 cursor-pointer`}>
				
				{/* Step number badge */}
				<div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] group-hover:shadow-[2px_2px_0px_0px_var(--foreground)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300">
					<span className="text-secondary font-bold text-lg">{step.id}</span>
				</div>

				{/* Icon container */}
				<div className="flex items-center gap-4 mb-6">
					<div className="w-16 md:w-20 xl:w-24 h-16 md:h-20 xl:h-24 bg-secondary rounded-2xl flex items-center justify-center border-2 border-primary shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300">
						<IconComponent className="size-8 md:size-10 xl:size-12 text-primary" strokeWidth={2.5} />
					</div>
				</div>

				{/* Content */}
				<div className="relative z-20">
					<h3 className={`text-xl md:text-2xl xl:text-3xl font-bold mb-4 ${step.textColor}`}>
						{step.title}
					</h3>
					<p className={`text-sm md:text-base xl:text-lg leading-relaxed font-medium ${step.textColor}`}>
						{step.description}
					</p>
				</div>

				{/* Decorative bubble elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                    {Array.from({ length: 15 }, (_, i) => {
                        // Use card.id as seed for consistent pseudo-random positioning
                        const seed = step.id * 7 + i * 13;
                        const topPercent = 5 + ((seed * 17) % 90);
                        const leftPercent = 5 + ((seed * 23) % 90);
                        const size = 1 + ((seed * 31) % 6);
                        
                        // Animation properties
                        const animationDelay = (seed * 3) % 10;
                        const animationDuration = 3 + ((seed * 7) % 8);
                        const animationType = i % 6; // More animation variety
                        
                        // Create color variations based on each step's background color
                        let colorVariations = [];
                        if (step.id === 0) { // bg-primary/10
                            colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
                        } else if (step.id === 1) { // bg-secondary
                            colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
                        } else if (step.id === 2) { // bg-accent
                            colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
                        } else if (step.id === 3) { // bg-background
                            colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
                        } else if (step.id === 4) { // bg-accent/25
                            colorVariations = ['bg-primary/80', 'bg-primary/60', 'bg-primary/40'];
                        } else { // step.id === 5, bg-primary/80
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
};

export default HowItWorksSection;