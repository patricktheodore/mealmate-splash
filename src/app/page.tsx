'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SubmissionForm from './components/sections/SubmissionForm';
import EmblaCarousel from './components/ui/Carousel/Carousel';
import { EmblaOptionsType } from 'embla-carousel';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);
    const problemTextRef = useRef<HTMLDivElement>(null);
    const problemTextWrapperRef = useRef<HTMLDivElement>(null);
    const solutionTextRef = useRef<HTMLDivElement>(null);
    const solutionTextWrapperRef = useRef<HTMLDivElement>(null);

    const OPTIONS: EmblaOptionsType = { containScroll: false };
    const PROBLEMSLIDES = [
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
    const SOLUTIONSLIDES = [
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
            title: 'You&re in control. Always.',
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
            title: "Recipe cards you'll keep forever.",
            description: 'Designed to be collected, reused and loved',
            bgColor: 'bg-secondary',
            textColor: 'text-primary',
            image: '/images/solution-05.png',
        },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ctx = gsap.context(() => {
                // Hero content fade out animation
                gsap.to(heroContentRef.current, {
                    opacity: 0,
                    scale: 0.75,
                    ease: 'power2.in',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '40% top',
                        scrub: 0.3,
                    }
                });

                // Problem text animation with position switching
                const problemText = problemTextRef.current;
                const problemWrapper = problemTextWrapperRef.current;

                // Initial state - text starts fixed in the middle of the screen
                gsap.set(problemText, {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    scale: 0.8,
                    zIndex: 30, // Lower z-index so it appears behind carousel
                    width: '100%',
                    maxWidth: '48rem', // max-w-3xl
                });

                // Create a timeline for better control
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: problemWrapper,
                        start: 'top bottom', // When the wrapper enters the viewport
                        end: 'bottom top', // When the wrapper leaves the viewport
                        scrub: 1,
                        onUpdate: (self) => {
                            // Calculate when to switch based on the wrapper's position
                            const wrapperRect = problemWrapper?.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            
                            // Switch when the bottom of the wrapper is near the middle of the viewport
                            const shouldSwitch = wrapperRect && (wrapperRect.bottom < windowHeight * 0.6);
                            
                            if (shouldSwitch && problemText && problemText.style.position === 'fixed') {
                                // Get current position before switching
                                const currentRect = problemText.getBoundingClientRect();
                                const wrapperTop = wrapperRect.top;
                                
                                // Calculate the absolute position relative to the wrapper
                                const relativeTop = currentRect.top - wrapperTop;
                                
                                // Switch to absolute positioning
                                gsap.set(problemText, {
                                    position: 'absolute',
                                    top: `${relativeTop}px`,
                                    bottom: 'auto',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '100%',
                                    maxWidth: '48rem',
                                });
                                
                                // Ensure wrapper has relative positioning
                                gsap.set(problemWrapper, {
                                    position: 'relative',
                                    height: '50vh'
                                });
                            } else if (!shouldSwitch && problemText && problemText.style.position === 'absolute') {
                                // Switch back to fixed when scrolling up
                                gsap.set(problemText, {
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    bottom: 'auto',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    maxWidth: '48rem',
                                });
                                
                                // Reset wrapper
                                gsap.set(problemWrapper, {
                                    position: 'static',
                                    height: '50vh'
                                });
                            }
                        }
                    }
                });

                // Separate timeline for fade/scale animation
                gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: '50% top',
                        end: '100% top',
                        scrub: 0.5,
                    }
                }).to(problemText, {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out',
                });

                // Solution text animation
                const solutionText = solutionTextRef.current;
                const solutionWrapper = solutionTextWrapperRef.current;

                // Initial state for solution text
                gsap.set(solutionText, {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    scale: 0.8,
                    zIndex: 30, // Lower z-index so it appears behind carousel
                    width: '100%',
                    maxWidth: '48rem',
                });

                // Solution text timeline
                const solutionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: solutionWrapper,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        onUpdate: (self) => {
                            // Calculate when to switch based on the wrapper's position
                            const wrapperRect = solutionWrapper?.getBoundingClientRect();
                            const windowHeight = window.innerHeight;
                            
                            // Switch when the bottom of the wrapper is near the middle of the viewport
                            const shouldSwitch = wrapperRect && (wrapperRect.bottom < windowHeight * 0.6);
                            
                            if (shouldSwitch && solutionText && solutionText.style.position === 'fixed') {
                                // Get current position before switching
                                const currentRect = solutionText.getBoundingClientRect();
                                const wrapperTop = wrapperRect.top;
                                
                                // Calculate the absolute position relative to the wrapper
                                const relativeTop = currentRect.top - wrapperTop;
                                
                                // Switch to absolute positioning
                                gsap.set(solutionText, {
                                    position: 'absolute',
                                    top: `${relativeTop}px`,
                                    bottom: 'auto',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '100%',
                                    maxWidth: '48rem',
                                });
                                
                                // Ensure wrapper has relative positioning
                                gsap.set(solutionWrapper, {
                                    position: 'relative',
                                    height: '75vh'
                                });
                            } else if (!shouldSwitch && solutionText && solutionText.style.position === 'absolute') {
                                // Switch back to fixed when scrolling up
                                gsap.set(solutionText, {
                                    position: 'fixed',
                                    top: '50%',
                                    left: '50%',
                                    bottom: 'auto',
                                    transform: 'translate(-50%, -50%)',
                                    width: '100%',
                                    maxWidth: '48rem',
                                });
                                
                                // Reset wrapper
                                gsap.set(solutionWrapper, {
                                    position: 'static',
                                    height: '75vh'
                                });
                            }
                        }
                    }
                });

                // Separate timeline for fade/scale animation
                gsap.timeline({
                    scrollTrigger: {
                        trigger: solutionWrapper,
                        start: 'top 40%', // Much more delayed start - when wrapper top hits 40% of viewport
                        end: 'top 10%',   // End when wrapper top hits 10% of viewport
                        scrub: 0.5,
                    }
                }).to(solutionText, {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power2.out',
                });

            }, heroRef);

            return () => ctx.revert();
        }
    }, []);

    const scrollToForm = () => {
        const formElement = document.querySelector('#form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        const nextSection = document.querySelector('#problem');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-full relative w-full flex flex-col">
            <nav className="w-full flex justify-between items-center p-4 xl:py-6 px-4 md:px-8 xl:px-12 z-50">
                <div className="flex items-center gap-2">
                    <Image
                        className="hidden md:block"
                        src="/images/mealmate-logo.png"
                        alt="MealMate Logo"
                        height={80}
                        width={300}
                        priority
                    />
                    <Image
                        className="block md:hidden"
                        src="/images/mealmate-m.png"
                        alt="MealMate Logo"
                        height={48}
                        width={48}
                        priority
                    />
                    <div className="hidden md:flex items-center gap-2"></div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={scrollToForm}
                        className="bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[0px_0px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px]">
                        Join the waitlist
                    </button>
                </div>
            </nav>

            <div ref={heroRef} className="relative h-screen w-full">
                <div ref={heroContentRef} className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center gap-4 md:gap-8 xl:gap-12 px-4 md:px-8 xl:px-12 py-24 z-0">
                    <h2 className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500">Meal kits are broken</h2>
                    <h1 className="mb-12 md:mb-8 text-[50px] sm:text-[75px] md:text-[100px] lg:text-[125px] xl:text-[150px] leading-[0.9] font-bold text-center text-gray-700">
                        We&apos;re fixing it
                    </h1>
                    <button
                        onClick={scrollDown}
                        className="bg-button-bg hover:bg-button-bg-hover border-2 border-primary !text-primary font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-base py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 hover:cursor-pointer shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[0px_0px_0px_0px_var(--primary)] hover:translate-x-[4px] hover:translate-y-[4px]">
                        Learn more
                    </button>
                </div>
            </div>

            {/* Problem section wrapper - maintains space in document flow */}
            <div ref={problemTextWrapperRef} id='problem' className="relative z-10 px-4" style={{ minHeight: '50vh' }}>
                <div ref={problemTextRef} className="mx-auto max-w-3xl text-center">
                    <span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
                        We tried every meal kit out there.
                    </span>
                    <h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
                        Here&apos;s why they don&apos;t work.
                    </h2>
                </div>
            </div>

            <div className="relative z-40">
                <EmblaCarousel slides={PROBLEMSLIDES} options={OPTIONS} />
            </div>

            <div ref={solutionTextWrapperRef} id='solution' className="relative z-10 px-4" style={{ minHeight: '75vh' }}>
                <div ref={solutionTextRef} className="mx-auto max-w-3xl text-center">
                    <span className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 mb-4 block">
                        Not another meal planning app.
                    </span>
                    <h2 className="text-[40px] md:text-[60px] xl:text-[80px] font-bold leading-[0.9] tracking-tighter text-gray-700 mb-8">
                        Something better. Built for real life.
                    </h2>
                </div>
            </div>

            <div className="relative z-40">
                <EmblaCarousel slides={SOLUTIONSLIDES} options={OPTIONS} />
            </div>

            <div className="relative z-10">
                <SubmissionForm />
            </div>
        </div>
    );
}