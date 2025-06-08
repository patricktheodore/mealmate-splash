import React, { useState } from 'react';
import {
	Sparkles,
	Users,
	Zap,
	Mail,
	User,
	MapPin,
	Calendar,
	ArrowRight
} from 'lucide-react';

const SubmissionForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		location: '',
		age: '',
	});

	const [focusedField, setFocusedField] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log('Form submitted:', formData);
	};

	const formFields = [
		{
			name: 'name',
			type: 'text',
			placeholder: 'Your name',
			icon: User,
			required: true,
		},
		{
			name: 'email',
			type: 'email',
			placeholder: 'Your email',
			icon: Mail,
			required: true,
		},
		{
			name: 'location',
			type: 'text',
			placeholder: 'Your location',
			icon: MapPin,
			required: false,
		},
		{
			name: 'age',
			type: 'number',
			placeholder: 'Your age',
			icon: Calendar,
			required: false,
			min: '1',
			max: '120',
		},
	];

	return (
		<div className="w-full py-24 md:py-46 xl:py-68 bg-secondary relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{Array.from({ length: 100 }, (_, i) => {
					const seed = i * 29;
					const topPercent = 5 + ((seed * 17) % 90);
					const leftPercent = 5 + ((seed * 23) % 90);
					const size = 1 + ((seed * 11) % 4);
					const opacity = 0.1 + ((seed * 13) % 15) / 100;
					
					const animationDelay = (seed * 3) % 15;
					const animationDuration = 6 + ((seed * 7) % 10);
					
					// Mix of sparkles and circles
					const isSparkle = i % 5 === 0;
					
					return (
						<div
							key={i}
							className="absolute animate-magical-float"
							style={{
								top: `${topPercent}%`,
								left: `${leftPercent}%`,
								fontSize: `${size * 4}px`,
								opacity: opacity,
								animationDelay: `${animationDelay}s`,
								animationDuration: `${animationDuration}s`,
							}}>
							{isSparkle ? (
								<Sparkles className="text-primary/60" strokeWidth={2} />
							) : (
								<div 
									className="bg-primary/40 rounded-full"
									style={{
										width: `${size * 3}px`,
										height: `${size * 3}px`,
									}}
								/>
							)}
						</div>
					);
				})}
			</div>

			<div className="flex flex-col justify-end p-4 md:p-8 xl:px-12 relative z-10">
				{/* Main CTA Container */}
				<div className="w-full max-w-4xl mx-auto mb-8">
					<div className="bg-background rounded-3xl border-2 border-primary shadow-[12px_12px_0px_0px_var(--primary)] p-8 xl:p-12 relative">
						
						{/* Exclusive badge */}
						<div className="absolute -top-4 -right-4 bg-primary text-secondary px-6 py-3 rounded-full border-2 border-foreground shadow-[4px_4px_0px_0px_var(--foreground)] transform rotate-12">
							<div className="flex items-center gap-2">
								<Users className="size-4" strokeWidth={3} />
								<span className="font-bold text-sm">EXCLUSIVE</span>
							</div>
						</div>

						{/* Inner decorative elements */}
						<div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
							{Array.from({ length: 24 }, (_, i) => {
								const seed = i * 19;
								const topPercent = 15 + ((seed * 23) % 70);
								const leftPercent = 15 + ((seed * 31) % 70);
								const size = 2 + ((seed * 7) % 3);
								const opacity = 0.05 + ((seed * 11) % 10) / 100;
								
								return (
									<div
										key={i}
										className="absolute bg-primary/40 rounded-full animate-pulse"
										style={{
											top: `${topPercent}%`,
											left: `${leftPercent}%`,
											width: `${size * 8}px`,
											height: `${size * 8}px`,
											opacity: opacity,
											animationDelay: `${i * 0.5}s`,
										}}
									/>
								);
							})}
						</div>

						<div className="flex flex-col gap-8 md:gap-12 relative z-10">
							{/* Header */}
							<div className="text-center">
								<h3 id='form' className="text-[40px] md:text-[60px] xl:text-[80px] leading-[1.2] tracking-tighter text-gray-700 font-bold mb-6">
									Ready to{' '}
									<span className="relative">
										revolutionise
										<div className="absolute -bottom-2 left-0 w-full h-4 bg-accent rounded-full" />
									</span>
									<span className="block">the way you eat?</span>
								</h3>
								<p className="text-lg md:text-xl text-gray-600 mb-8 font-medium leading-relaxed">
									Join our waitlist to be first in line when we launch. No spam, just updates on our progress and early access.
								</p>
								
								<div className="bg-accent/50 border-2 border-primary rounded-2xl px-6 py-4 mb-8 inline-block shadow-[4px_4px_0px_0px_var(--primary)]">
									<div className="flex items-center gap-3">
										<div className="flex -space-x-2">
											{Array.from({ length: 3 }, (_, i) => (
												<div key={i} className="w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
													<span className="text-secondary text-xs font-bold">{i + 1}</span>
												</div>
											))}
											<div className="w-8 h-8 bg-secondary border-2 border-primary rounded-full flex items-center justify-center">
												<span className="text-primary text-xs font-bold">+</span>
											</div>
										</div>
										<span className="text-foreground font-bold text-sm">Join 3+ early adopters</span>
									</div>
								</div>
							</div>

							{/* Form */}
							<div className="w-full flex flex-col gap-6">
								{formFields.map((field) => {
									const IconComponent = field.icon;
									const isFocused = focusedField === field.name;
									const hasValue = formData[field.name as keyof typeof formData];
									
									return (
										<div key={field.name} className="relative group">
											<div className={`relative bg-background border-3 border-primary rounded-2xl transition-all duration-300 ${
												isFocused 
													? 'shadow-[1px_1px_0px_var(--primary)] translate-x-[1] translate-y-[2px]' 
													: 'shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]'
											}`}>
												<div className="flex items-center gap-4 p-4">
													<div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
														isFocused || hasValue 
															? 'bg-accent border-primary shadow-[2px_2px_0px_0px_var(--primary)]' 
															: 'bg-secondary border-primary shadow-[2px_2px_0px_0px_var(--primary)]'
													}`}>
														<IconComponent className={`size-6 ${isFocused || hasValue ? 'text-primary' : 'text-primary'}`} strokeWidth={2.5} />
													</div>
													<input
														name={field.name}
														type={field.type}
														placeholder={field.placeholder}
														required={field.required}
														min={field.min}
														max={field.max}
														value={formData[field.name as keyof typeof formData]}
														onChange={handleInputChange}
														onFocus={() => setFocusedField(field.name)}
														onBlur={() => setFocusedField(null)}
														className="flex-1 text-lg md:text-xl font-medium bg-transparent border-none outline-none placeholder-primary/50 !text-primary"
													/>
												</div>
											</div>
										</div>
									);
								})}

								{/* Submit Button */}
								<div className="flex justify-center mt-4">
									<button
										type="submit"
										onClick={handleSubmit}
										className="group bg-secondary hover:bg-secondary/90 border-4 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-lg py-4 px-8 md:py-5 md:px-12 rounded-2xl transition-all duration-300 shadow-[8px_8px_0px_0px_var(--foreground)] hover:shadow-[4px_4px_0px_0px_var(--foreground)] hover:translate-x-[4px] hover:translate-y-[4px] relative overflow-hidden cursor-pointer">
										<span className="relative z-10 flex items-center gap-3">
											Join the waitlist
											<ArrowRight className="size-6 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={3} />
										</span>
										
										{/* Button decorative elements */}
										<div className="absolute inset-0 overflow-hidden">
											{Array.from({ length: 3 }, (_, i) => (
												<div
													key={i}
													className="absolute bg-primary/40 rounded-full animate-pulse"
													style={{
														top: `${20 + i * 30}%`,
														left: `${10 + i * 25}%`,
														width: `${8 + i * 4}px`,
														height: `${8 + i * 4}px`,
														animationDelay: `${i * 0.3}s`,
													}}
												/>
											))}
										</div>
									</button>
								</div>

								{/* Benefits below form */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
									{[
										{ icon: Zap, text: 'Early access perks' },
										{ icon: Mail, text: 'No spam, ever' },
										{ icon: Sparkles, text: 'Exclusive updates' },
									].map((benefit, index) => {
										const BenefitIcon = benefit.icon;
										return (
											<div key={index} className="bg-accent/40 border-2 border-primary rounded-xl p-3 flex justify-center items-center gap-3 shadow-[2px_2px_0px_0px_var(--primary)]">
												<BenefitIcon className="size-5 text-primary" strokeWidth={2.5} />
												<span className="text-sm lg:text-md font-bold text-primary/80">{benefit.text}</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center">
					<div className="bg-background/80 border border-primary/30 rounded-full px-4 py-2 inline-block backdrop-blur-sm">
						<span className="text-xs text-gray-500">© 2025 mealmate</span>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes magical-float {
					0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
					25% { transform: translateY(-20px) translateX(10px) rotate(10deg) scale(1.1); }
					50% { transform: translateY(-10px) translateX(-15px) rotate(-5deg) scale(0.9); }
					75% { transform: translateY(-25px) translateX(5px) rotate(15deg) scale(1.05); }
				}
				
				.animate-magical-float {
					animation: magical-float 10s ease-in-out infinite;
				}
			`}</style>
		</div>
	);
};

export default SubmissionForm;