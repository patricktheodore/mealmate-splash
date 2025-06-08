import React from 'react';
import {
	TrendingDown,
	Crown,
	DollarSign,
	Zap,
	Target,
} from 'lucide-react';

const PriceComparisonSection = () => {
	const competitors = [
		{
			id: 'mealmate',
			name: 'MealMate',
			subtitle: 'Smart meal planning',
			price: 7,
			logo: 'M',
			bgColor: 'bg-secondary',
			cardBg: 'bg-secondary',
			textColor: 'text-secondary',
			priceColor: 'text-secondary',
			isWinner: true,
			savings: null,
		},
		{
			id: 'dinnerly',
			name: 'Dinnerly',
			subtitle: 'Budget meal kit',
			price: 10,
			logo: 'D',
			bgColor: 'bg-gray-400',
			cardBg: 'bg-background',
			textColor: 'text-foreground',
			priceColor: 'text-foreground/70',
			isWinner: false,
			savings: 30,
		},
		{
			id: 'hellofresh',
			name: 'HelloFresh',
			subtitle: 'Premium meal kit',
			price: 14,
			logo: 'HF',
			bgColor: 'bg-slate-400',
			cardBg: 'bg-background',
			textColor: 'text-foreground',
			priceColor: 'text-foreground/70',
			isWinner: false,
			savings: 50,
		},
	];

	const stats = [
		{
			icon: TrendingDown,
			value: '50%',
			label: 'Less than HelloFresh',
			bgColor: 'bg-primary/10',
		},
		{
			icon: Target,
			value: '30%',
			label: 'Less than Dinnerly',
			bgColor: 'bg-accent/80',
		},
		{
			icon: Crown,
			value: '0%',
			label: 'Compromise on quality',
			bgColor: 'bg-secondary',
		},
	];

	return (
		<div className="w-full py-24 md:py-46 xl:py-68 px-4 md:px-8 xl:px-12 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{Array.from({ length: 25 }, (_, i) => {
					const seed = i * 31;
					const topPercent = 5 + ((seed * 19) % 90);
					const leftPercent = 5 + ((seed * 23) % 90);
					const size = 2 + ((seed * 11) % 6);
					const opacity = 0.03 + ((seed * 17) % 12) / 100;
					
					const animationDelay = (seed * 2) % 12;
					const animationDuration = 6 + ((seed * 7) % 8);
					
					// Mix of dollar signs and circles
					const isDollar = i % 4 === 0;
					
					return (
						<div
							key={i}
							className="absolute animate-float-money"
							style={{
								top: `${topPercent}%`,
								left: `${leftPercent}%`,
								fontSize: `${size * 3}px`,
								opacity: opacity,
								animationDelay: `${animationDelay}s`,
								animationDuration: `${animationDuration}s`,
							}}>
							{isDollar ? (
								<DollarSign className="text-primary/30" strokeWidth={2} />
							) : (
								<div 
									className="bg-primary/20 rounded-full"
									style={{
										width: `${size * 2}px`,
										height: `${size * 2}px`,
									}}
								/>
							)}
						</div>
					);
				})}
			</div>

			<div className="mx-auto max-w-7xl relative z-10">
				{/* Header */}
				<div className="mx-auto max-w-3xl lg:text-center mb-16">
					<span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
						Premium quality, smart pricing.
					</span>
					<h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
						Same meal, half the price.
					</h2>
					<p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
						Why pay premium prices for meal kits when you can get the same quality ingredients for half the cost? MealMate eliminates the middleman markup while delivering the same convenience and quality.
					</p>
				</div>

				{/* Price Comparison Cards */}
				<div className="max-w-5xl mx-auto mb-16">
					<div className="space-y-6">
						{competitors.map((competitor, index) => (
							<div
								key={competitor.id}
								className={`group relative ${competitor.isWinner ? 'order-first' : ''}`}>
								<div
									className={`relative ${competitor.cardBg} border-4 border-primary rounded-3xl p-4 md:p-6 ${
										competitor.isWinner 
											? 'shadow-[12px_12px_0px_0px_var(--primary)] hover:shadow-[6px_6px_0px_0px_var(--primary)]' 
											: 'shadow-[6px_6px_0px_0px_var(--primary)] hover:shadow-[4px_4px_0px_0px_var(--primary)]'
									} transform hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300`}>
									
									{/* Winner badge */}
									{competitor.isWinner && (
										<div className="absolute -top-4 -right-4 bg-secondary text-primary px-4 py-2 rounded-full border-2 border-primary shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300">
											<div className="flex items-center gap-2">
												<Crown className="size-4" strokeWidth={3} />
												<span className="font-bold text-sm">WINNER</span>
											</div>
										</div>
									)}

									{/* Savings badge for competitors */}
									{competitor.savings && (
										<div className="absolute -top-4 -left-4 bg-red-500 text-white px-3 py-1 rounded-full border-2 border-primary shadow-[2px_2px_0px_0px_var(--primary)] text-xs font-bold">
											+{competitor.savings}%
										</div>
									)}

									<div className="flex justify-between items-center">
										{/* Company info */}
										<div className="flex items-center gap-4 md:gap-6">
											<div className={`w-16 md:w-20 xl:w-24 h-16 md:h-20 xl:h-24 ${competitor.bgColor} rounded-2xl flex items-center justify-center border-4 border-primary shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-300`}>
												<span className={`${index === 0 ? 'text-primary font-extrabold text-2xl md:text-4xl xl:text-6xl' : 'text-gray-200 text-xl md:text-2xl xl:text-3xl font-semibold'}`}>
                                                    {competitor.logo}
												</span>
											</div>
											<div>
												<h3 className={`text-2xl md:text-3xl xl:text-4xl font-bold ${competitor.isWinner ? 'text-primary' : competitor.textColor}`}>
													{competitor.name}
												</h3>
												<p className={`text-sm md:text-base xl:text-lg font-medium ${competitor.isWinner ? 'text-primary/80' : 'text-foreground/60'}`}>
													{competitor.subtitle}
												</p>
											</div>
										</div>

										{/* Price */}
										<div className="text-right">
											<div className="flex items-baseline gap-1">
												<span className={`text-4xl md:text-5xl xl:text-6xl font-bold ${competitor.isWinner ? 'text-primary' : competitor.priceColor}`}>
													${competitor.price}
												</span>
											</div>
											<div className={`text-sm md:text-base xl:text-lg font-medium ${competitor.isWinner ? 'text-primary/80' : 'text-foreground/60'}`}>
												per serving
											</div>
										</div>
									</div>

									{/* Winner glow effect */}
									{competitor.isWinner && (
										<div className="absolute top-0 left-0 w-full h-full bg-primary/5 rounded-3xl pointer-events-none" />
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Stats Section */}
				<div className="max-w-5xl mx-auto mb-16">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{stats.map((stat, index) => {
							const IconComponent = stat.icon;
							return (
								<div key={index} className="group">
									<div className={`relative ${stat.bgColor} border-2 border-primary rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_var(--primary)] hover:shadow-[3px_3px_0px_0px_var(--primary)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 text-center`}>
										<div className="mb-4">
											<IconComponent className="size-8 md:size-10 text-primary mx-auto mb-2" strokeWidth={2.5} />
										</div>
										<div className="text-3xl md:text-4xl xl:text-5xl font-bold text-primary mb-2">
											{stat.value}
										</div>
										<div className="text-sm md:text-base font-medium text-foreground/80">
											{stat.label}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Bottom accent with disclaimer */}
				<div className="flex flex-col items-center gap-6">
					<div className="bg-background border-2 border-primary rounded-full px-8 py-4 shadow-[4px_4px_0px_0px_var(--primary)]">
						<div className="flex items-center gap-4">
							<Zap className="size-6 text-primary animate-pulse" strokeWidth={3} />
							<span className="text-sm md:text-base font-bold text-primary">
								Smart pricing, same quality
							</span>
							<Zap className="size-6 text-primary animate-pulse" strokeWidth={3} style={{animationDelay: '0.5s'}} />
						</div>
					</div>
					
					<div className="bg-accent/50 border border-primary/30 rounded-2xl px-6 py-4 max-w-3xl">
						<p className="text-xs md:text-sm text-foreground/70 text-center leading-relaxed">
							*Per serving comparison based on 2-person plans, excluding promotional pricing. MealMate pricing includes Woolworths delivery fees. Savings calculated against standard retail pricing as of 2025.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceComparisonSection;