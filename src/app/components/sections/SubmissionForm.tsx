import { gsap } from 'gsap';
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Users, Zap, Mail, User, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import Image from 'next/image';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
	name: string;
	email: string;
}

interface FormErrors {
	name?: string;
	email?: string;
}

// Confetti Component
const Confetti = ({ isActive }: { isActive: boolean }) => {
	const confettiRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isActive && confettiRef.current) {
			// Create confetti particles
			const particleCount = 250; // Increased particle count
			const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
			const particleSize = 8; // Slightly smaller particles
			
			// Clear any existing particles
			confettiRef.current.innerHTML = '';
			
			for (let i = 0; i < particleCount; i++) {
				const particle = document.createElement('div');
				const color = colors[Math.floor(Math.random() * colors.length)];
				
				// Start from random positions across the top of the screen
				const startX = Math.random() * window.innerWidth;
				const startY = -50 - Math.random() * 100; // Start above the viewport
				
				// Create natural sway motion
				const swayAmplitude = Math.random() * 100 + 50; // How far it sways horizontally
				const swayDirection = Math.random() > 0.5 ? 1 : -1; // Random direction
				const fallDistance = window.innerHeight + 200; // Fall past the bottom of the screen
				
				const duration = Math.random() * 2 + 3; // 3-5 seconds to fall (faster than before)
				const delay = Math.random() * 3; // Stagger the start times
				const rotationEnd = Math.random() * 720 - 360; // Rotation during fall
				
				// All particles are circles with uniform size and border
				particle.className = 'absolute rounded-full';
				particle.style.width = `${particleSize}px`;
				particle.style.height = `${particleSize}px`;
				particle.style.backgroundColor = color;
				particle.style.border = '1px solid var(--foreground)'; // Add border for visibility
				particle.style.left = `${startX}px`;
				particle.style.top = `${startY}px`;
				particle.style.opacity = '0';
				
				confettiRef.current.appendChild(particle);
				
				// Create a timeline for more complex animation
				const tl = gsap.timeline({
					delay: delay,
					onComplete: () => {
						particle.remove();
					}
				});
				
				// Fade in quickly
				tl.to(particle, {
					opacity: 1,
					duration: 0.2,
					ease: 'power1.out'
				}, 0);
				
				// Main falling animation with sway
				tl.to(particle, {
					y: fallDistance,
					x: swayAmplitude * swayDirection,
					rotation: rotationEnd,
					duration: duration,
					ease: 'none' // Linear for the vertical fall
				}, 0);
				
				// Add subtle back-and-forth sway
				tl.to(particle, {
					x: swayAmplitude * swayDirection * -0.5,
					duration: duration * 0.5,
					ease: 'sine.inOut',
					repeat: 1,
					yoyo: true
				}, 0);
				
				// Fade out quicker - during the last 40% of the fall
				tl.to(particle, {
					opacity: 0,
					duration: duration * 0.4,
					ease: 'power1.in'
				}, duration * 0.6);
			}
		}
	}, [isActive]);
	
	return (
		<div 
			ref={confettiRef} 
			className="fixed inset-0 pointer-events-none z-50"
			aria-hidden="true"
		/>
	);
};

const SubmissionForm = () => {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [showConfetti, setShowConfetti] = useState(false);
	const formContainerRef = useRef<HTMLDivElement>(null);
	const successContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (submitStatus === 'success' && formContainerRef.current && successContainerRef.current) {
			// Trigger confetti
			setShowConfetti(true);
			
			// Stop confetti after 3 seconds
			setTimeout(() => {
				setShowConfetti(false);
			}, 3000);
			
			// Animate form out
			gsap.to(formContainerRef.current, {
				opacity: 0,
				scale: 0.95,
				y: -20,
				duration: 0.4,
				ease: 'power2.inOut',
				onComplete: () => {
					if (formContainerRef.current) {
						formContainerRef.current.style.display = 'none';
					}
				},
			});

			// Animate success message in
			gsap.fromTo(
				successContainerRef.current,
				{
					opacity: 0,
					scale: 0.8,
					y: 20,
					display: 'block',
				},
				{
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.6,
					delay: 0.3,
					ease: 'back.out(1.7)',
				}
			);
		}
	}, [submitStatus]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Clear error for this field when user starts typing
		if (formErrors[name as keyof FormData]) {
			setFormErrors({
				...formErrors,
				[name]: undefined,
			});
		}

		if (submitStatus !== 'idle') {
			setSubmitStatus('idle');
		}
	};

	const validateForm = (): boolean => {
		const errors: FormErrors = {};

		// Validate name
		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		// Validate email
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!emailRegex.test(formData.email.trim())) {
			errors.email = 'Please enter a valid email address';
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const saveToSupabase = async (data: typeof formData) => {
		try {
			const { error } = await supabase.from('email_form_submissions').insert({
				name: data.name.trim(),
				email: data.email.trim().toLowerCase(),
				created_at: new Date().toISOString(),
			});

			if (error) {
				throw error;
			}

			return { success: true };
		} catch (error) {
			console.error('Supabase error:', error);
			const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
			return { success: false, error: errorMessage };
		}
	};

	const sendToMakeWebhook = async (data: typeof formData) => {
		try {
			const MAKE_WEBHOOK_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;

			if (!MAKE_WEBHOOK_URL) {
				throw new Error('Webhook URL is not configured');
			}

			const response = await fetch(MAKE_WEBHOOK_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: data.email.trim().toLowerCase(),
					name: data.name.trim(),
				}),
			});

			// Check if response is ok (status 200-299)
			if (!response.ok) {
				throw new Error(`Webhook failed with status: ${response.status}`);
			}

			// Get response as text first
			const responseText = await response.text();

			// Check if the response is "Accepted" (Make.com standard response)
			if (responseText === 'Accepted' || responseText.toLowerCase().includes('accepted')) {
				return { success: true, result: responseText };
			}

			// Try to parse as JSON if it's not "Accepted"
			try {
				const jsonResult = JSON.parse(responseText);
				return { success: true, result: jsonResult };
			} catch (parseError) {
				// If it's not JSON and not "Accepted", but status was ok,
				// we'll still consider it successful
				console.log('Webhook response:', responseText, parseError);
				return { success: true, result: responseText };
			}
		} catch (error) {
			console.error('Make webhook error:', error);
			const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
			return { success: false, error: errorMessage };
		}
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		// // MOCK
		// setIsSubmitting(true);

		// // wait 3 seconds to simulate network delay
		// await new Promise((resolve) => setTimeout(resolve, 3000));

		// setSubmitStatus('success');
		// setIsSubmitting(false);
		// return;
        // // MOCK END

		e.preventDefault();

		// Validate form
		if (!validateForm()) {
			setSubmitStatus('error');
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus('idle');

		try {
			const supabaseResult = await saveToSupabase(formData);

			if (!supabaseResult.success) {
				throw new Error(`Database error: ${supabaseResult.error}`);
			}

			const webhookResult = await sendToMakeWebhook(formData);

			if (!webhookResult.success) {
				console.warn('Webhook failed but data is saved to database');
			}

			setSubmitStatus('success');
		} catch (error) {
			console.error('Submission error:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

    const goToContactPage = () => {
        window.location.href = '/contact';
    }


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
	];

    const perks = [
        {
            icon: Zap,
            title: 'Early access perks',
            text: 'Be the first to know about our launch and get exclusive early access perks.',
        },
        {
            icon: Mail,
            title: 'No spam, ever',
            text: 'We value your privacy. Expect only relevant updates and no spam.',
        },
        {
            icon: Sparkles,
            title: 'Exclusive updates',
            text: 'Get behind-the-scenes insights and sneak peeks as we build something amazing.',
        },
    ]

	const getSubmitButtonContent = () => {
		if (isSubmitting) {
			return (
				<span className="relative z-10 flex items-center gap-2 md:gap-3">
					<Loader
						className="size-4 md:size-5 lg:size-6 animate-spin"
						strokeWidth={3}
					/>
					Joining waitlist...
				</span>
			);
		}

		if (submitStatus === 'success') {
			return (
				<span className="relative z-10 flex items-center gap-2 md:gap-3">
					<CheckCircle
						className="size-4 md:size-5 lg:size-6"
						strokeWidth={3}
					/>
					Welcome aboard!
				</span>
			);
		}

		return (
			<span className="relative z-10 flex items-center gap-2 md:gap-3">
				Join the waitlist
				<ArrowRight
					className="size-4 md:size-5 lg:size-6 group-hover:translate-x-1 transition-transform duration-300"
					strokeWidth={3}
				/>
			</span>
		);
	};

	const getSubmitButtonStyle = () => {
		if (submitStatus === 'success') {
			return 'bg-secondary hover:bg-secondary/90 border-3 md:border-4 border-primary !text-primary opacity-75';
		}

		return 'bg-secondary hover:bg-secondary/90 border-3 md:border-4 border-primary !text-primary shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[0px_0px_0px_0px_var(--primary)]';
	};

	return (
		<div className="w-full py-16 md:py-24 lg:py-46 xl:py-68 min-h-screen bg-secondary relative overflow-hidden">
			{/* Confetti Animation */}
			<Confetti isActive={showConfetti} />
			
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
								<Sparkles
									className="text-primary/60"
									strokeWidth={2}
								/>
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

			<div className="flex flex-col justify-end p-4 md:p-8 lg:p-12 xl:px-16 relative z-10">
				{/* Main CTA Container */}
				<div id='form' className="w-full max-w-4xl mx-auto mb-4 md:mb-8">
					<div className="bg-background rounded-2xl md:rounded-3xl border-2 border-primary shadow-[8px_8px_0px_0px_var(--primary)] md:shadow-[12px_12px_0px_0px_var(--primary)] p-6 md:p-8 xl:p-12 relative">
						{/* Exclusive badge */}
						<div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-secondary px-4 py-2 md:px-6 md:py-3 rounded-full border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)] md:shadow-[4px_4px_0px_0px_var(--foreground)] transform rotate-12">
							<div className="flex items-center gap-1.5 md:gap-2">
								<Users
									className="size-3 md:size-4"
									strokeWidth={3}
								/>
								<span className="font-bold text-xs md:text-sm">EXCLUSIVE</span>
							</div>
						</div>

						<div className="flex flex-col gap-6 md:gap-8 lg:gap-12 relative z-10">
							{/* Success Message - Hidden initially */}
							<div
								ref={successContainerRef}
								className="relative"
								style={{ display: submitStatus === 'success' ? 'block' : 'none' }}>

								{/* Success Content */}
								<div className="text-center py-12">
                                    <h3 className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px] leading-[1.2] tracking-tighter text-gray-700 font-bold mb-4 md:mb-6">
                                        Welcome to the{' '}
                                        <span className="relative">
                                            club!
                                            <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-4 bg-accent rounded-full" />
                                        </span>
                                    </h3>
                                    <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-medium leading-relaxed px-2 md:px-0">
                                        We&apos;re thrilled to have you on board. Get ready to transform your eating experience!
                                    </p>

                                    

									<Image
										src="/images/peaking-homie.gif"
										alt="Thank You Illustration"
										width={150}
										height={100}
										className="relative  mx-auto -mb-7 z-20"
									/>

									{/* Perks cards grid - outside main card for better layout */}
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
										{perks.map((perk, index) => {
											const IconComponent = perk.icon;
											const bgColors = ['bg-secondary', 'bg-primary/60', 'bg-accent/80'];
											const textColors = ['text-primary', 'text-white', 'text-primary'];

											return (
												<div
													key={index}
													className={`${bgColors[index]} ${textColors[index]} z-10 border-3 border-primary rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[4px_4px_0px_0px_var(--primary)] md:shadow-[6px_6px_0px_0px_var(--primary)] transform hover:shadow-[2px_2px_0px_0px_var(--primary)] md:hover:shadow-[3px_3px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all duration-300 cursor-pointer`}>
													<div className="flex flex-col items-center text-center gap-3">
														<div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border-2 border-primary ${bgColors[index]} shadow-[2px_2px_0px_0px_var(--foreground)]`}>
															<IconComponent
																className={`size-6 md:size-7 ${
																	textColors[index] === 'text-white'
																		? 'text-white'
																		: 'text-primary'
																}`}
																strokeWidth={2.5}
															/>
														</div>
														<div>
															<h4
																className={`text-base md:text-lg font-bold mb-1 ${textColors[index]}`}>
																{perk.title}
															</h4>
															<p
																className={`text-sm md:text-base ${
																	textColors[index] === 'text-white'
																		? 'text-white/90'
																		: 'text-primary/70'
																} font-medium`}>
																{perk.text}
															</p>
														</div>
													</div>
												</div>
											);
										})}
									</div>

                                    <div className="flex justify-center mt-6 md:mt-12">
                                        <button
                                            onClick={goToContactPage}
                                            className={`group font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-sm md:text-base lg:text-lg py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-12 rounded-xl md:rounded-2xl transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] relative overflow-hidden cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 bg-secondary hover:bg-secondary/90 border-3 md:border-4 border-primary !text-primary shadow-[6px_6px_0px_0px_var(--primary)] md:shadow-[8px_8px_0px_0px_var(--primary)] hover:shadow-[3px_3px_0px_0px_var(--primary)] md:hover:shadow-[4px_4px_0px_0px_var(--primary)]`}>
                                            Contact Us
                                            <ArrowRight
                                                className="size-4 md:size-5 lg:size-6 group-hover:translate-x-1 transition-transform duration-300 ml-2"
                                                strokeWidth={3}
                                            />
                                        </button>
                                    </div>
								</div>
							</div>

							<div ref={formContainerRef}>
								{submitStatus !== 'success' && (
									<>
										{/* Header */}
										<div className="text-center">
											<h3 className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px] leading-[1.2] tracking-tighter text-gray-700 font-bold mb-4 md:mb-6">
												Ready to{' '}
												<span className="relative">
													revolutionise
													<div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-4 bg-accent rounded-full" />
												</span>
												<span className="block">the way you eat?</span>
											</h3>
											<p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-medium leading-relaxed px-2 md:px-0">
												Join our waitlist to be first in line when we launch. No spam, just
												updates on our progress and early access.
											</p>

											<div className="bg-accent/50 border-2 border-primary rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 mb-6 md:mb-8 inline-block shadow-[3px_3px_0px_0px_var(--primary)] md:shadow-[4px_4px_0px_0px_var(--primary)]">
												<div className="flex items-center gap-2 md:gap-3">
													<div className="flex -space-x-2">
														{Array.from({ length: 3 }, (_, i) => (
															<div
																key={i}
																className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
																<span className="text-secondary text-[10px] md:text-xs font-bold">
																	{i + 1}
																</span>
															</div>
														))}
														<div className="w-6 h-6 md:w-8 md:h-8 bg-secondary border-2 border-primary rounded-full flex items-center justify-center">
															<span className="text-primary text-[10px] md:text-xs font-bold">
																+
															</span>
														</div>
													</div>
													<span className="text-foreground font-bold text-xs md:text-sm">
														Join 3+ early adopters
													</span>
												</div>
											</div>
										</div>

										{/* Form */}
										<div className="w-full flex flex-col gap-4 md:gap-6 px-8 md:px-12 lg:px-16">
											{formFields.map((field) => {
												const IconComponent = field.icon;
												const isFocused = focusedField === field.name;
												const hasValue = formData[field.name as keyof FormData];
												const hasError = formErrors[field.name as keyof FormData];

												return (
													<div
														key={field.name}
														className="relative group">
														<div
															className={`relative border-2 md:border-3 border-primary rounded-xl md:rounded-2xl transition-all duration-300 ${
																isFocused && !hasError
																	? 'shadow-[1px_1px_0px_var(--primary)] translate-x-[1px] translate-y-[2px] bg-secondary/50'
																	: 'shadow-[3px_3px_0px_0px_var(--primary)] md:shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]'
															} ${hasError ? 'bg-accent/25' : 'bg-inherit'}`}>
															<div className="flex items-center gap-3 md:gap-4 p-3">
																<div
																	className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
																		isFocused || hasValue
																			? 'bg-accent border-primary shadow-[2px_2px_0px_0px_var(--primary)]'
																			: 'bg-secondary border-primary shadow-[2px_2px_0px_0px_var(--primary)]'
																	}`}>
																	<IconComponent
																		className={`size-4 md:size-5 ${
																			isFocused || hasValue
																				? 'text-primary'
																				: 'text-primary'
																		}`}
																		strokeWidth={2.5}
																	/>
																</div>
																<input
																	name={field.name}
																	type={field.type}
																	placeholder={field.placeholder}
																	required={field.required}
																	value={formData[field.name as keyof FormData]}
																	onChange={handleInputChange}
																	onFocus={() => setFocusedField(field.name)}
																	onBlur={() => setFocusedField(null)}
																	disabled={isSubmitting}
																	className="flex-1 text-base md:text-lg font-medium bg-transparent border-none outline-none placeholder-gray-500 text-gray-800 disabled:opacity-50"
																/>
															</div>
														</div>
														{hasError && (
															<p className="text-red-500 text-xs md:text-sm mt-2 ml-4 font-medium">
																{hasError}
															</p>
														)}
													</div>
												);
											})}

											{/* Submit Button */}
											<div className="flex justify-center mt-2 md:mt-4">
												<button
													onClick={handleSubmit}
													disabled={isSubmitting}
													className={`group font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-sm md:text-base lg:text-lg py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-12 rounded-xl md:rounded-2xl transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] md:hover:translate-x-[4px] md:hover:translate-y-[4px] relative overflow-hidden cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 ${getSubmitButtonStyle()}`}>
													{getSubmitButtonContent()}

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
											<div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
												{[
													{ icon: Zap, text: 'Early access perks' },
													{ icon: Mail, text: 'No spam, ever' },
													{ icon: Sparkles, text: 'Exclusive updates' },
												].map((benefit, index) => {
													const BenefitIcon = benefit.icon;
													return (
														<div
															key={index}
															className="bg-accent/40 border-2 border-primary rounded-lg md:rounded-xl p-2.5 md:p-3 flex justify-center items-center gap-2 md:gap-3 shadow-[2px_2px_0px_0px_var(--primary)]">
															<BenefitIcon
																className="size-4 md:size-5 text-primary flex-shrink-0"
																strokeWidth={2.5}
															/>
															<span className="text-xs md:text-sm lg:text-md font-bold text-primary/80">
																{benefit.text}
															</span>
														</div>
													);
												})}
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="text-center">
					<div className="bg-background/80 border border-primary/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 inline-block backdrop-blur-sm">
						<span className="text-[10px] md:text-xs text-gray-500">© 2025 mealmate</span>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes magical-float {
					0%,
					100% {
						transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
					}
					25% {
						transform: translateY(-20px) translateX(10px) rotate(10deg) scale(1.1);
					}
					50% {
						transform: translateY(-10px) translateX(-15px) rotate(-5deg) scale(0.9);
					}
					75% {
						transform: translateY(-25px) translateX(5px) rotate(15deg) scale(1.05);
					}
				}

				.animate-magical-float {
					animation: magical-float 10s ease-in-out infinite;
				}
				
				.triangle {
					width: 0;
					height: 0;
				}
			`}</style>
		</div>
	);
};

export default SubmissionForm;