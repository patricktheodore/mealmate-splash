'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Mail, User, MessageSquare, FileText, CheckCircle, Loader, Sparkles, Send, Phone, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    submit?: string;
}

export default function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const formContainerRef = useRef<HTMLDivElement>(null);
    const successContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (submitSuccess && formContainerRef.current && successContainerRef.current) {
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
    }, [submitSuccess]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
        // Clear errors when user starts typing
        if (errors[name as keyof FormErrors] || errors.submit) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
                submit: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.trim().length > 100) {
            newErrors.name = 'Name must be less than 100 characters';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (formData.email.length > 254) {
            newErrors.email = 'Email address is too long';
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        } else if (formData.message.trim().length > 2000) {
            newErrors.message = 'Message must be less than 2000 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        setErrors(prev => ({ ...prev, submit: undefined }));
        
        try {
            const response = await fetch('/api/send/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('Too many requests. Please wait before trying again.');
                }
                throw new Error(result.error || 'Failed to send message');
            }
            
            setSubmitSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            // Announce success to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = 'Message sent successfully!';
            document.body.appendChild(announcement);
            setTimeout(() => document.body.removeChild(announcement), 1000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(prev => ({
                ...prev,
                submit: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
            }));
            
            // Focus back to submit button for accessibility
            const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
            submitButton?.focus();
        } finally {
            setIsSubmitting(false);
        }
    };

    const getSubmitButtonContent = () => {
        if (isSubmitting) {
            return (
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                    <Loader
                        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 animate-spin"
                        strokeWidth={3}
                        aria-hidden="true"
                    />
                    Sending message...
                </span>
            );
        }

        if (submitSuccess) {
            return (
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                    <CheckCircle
                        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
                        strokeWidth={3}
                        aria-hidden="true"
                    />
                    Message sent!
                </span>
            );
        }

        return (
            <span className="relative z-10 flex items-center gap-2 md:gap-3">
                Send Message
                <Send
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform duration-300"
                    strokeWidth={3}
                    aria-hidden="true"
                />
            </span>
        );
    };

    const getSubmitButtonStyle = () => {
        if (submitSuccess) {
            return 'bg-secondary hover:bg-secondary/90 border-3 md:border-4 border-primary !text-primary opacity-75';
        }

        return 'bg-secondary hover:bg-secondary/90 border-3 md:border-4 border-primary !text-primary shadow-[4px_4px_0px_0px_var(--primary)] hover:shadow-[0px_0px_0px_0px_var(--primary)]';
    };

    const formFields = [
        {
            name: 'name',
            type: 'text',
            placeholder: 'Your name',
            icon: User,
            required: true,
            autoComplete: 'name',
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Your email',
            icon: Mail,
            required: true,
            autoComplete: 'email',
        },
        {
            name: 'subject',
            type: 'text',
            placeholder: 'Subject (optional)',
            icon: FileText,
            required: false,
            autoComplete: 'off',
        },
    ];

    return (
        <div>
            <nav className="w-full bg-secondary flex justify-between items-center p-4 xl:py-6 px-4 md:px-8 xl:px-12 z-50">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image
                            src="/images/mealmate-m.png"
                            alt="MealMate Logo"
                            height={48}
                            width={48}
                            priority
                        />
                    </Link>
                </div>
            </nav>
            <div className="w-full py-16 md:py-24 lg:py-32 min-h-screen bg-secondary relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    {Array.from({ length: 50 }, (_, i) => {
                        const seed = i * 29;
                        const topPercent = 5 + ((seed * 17) % 90);
                        const leftPercent = 5 + ((seed * 23) % 90);
                        const size = 1 + ((seed * 11) % 4);
                        const opacity = 0.1 + ((seed * 13) % 15) / 100;

                        const animationDelay = (seed * 3) % 15;
                        const animationDuration = 6 + ((seed * 7) % 10);

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

                <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
                    {/* Main Contact Container */}
                    <div className="bg-background rounded-2xl md:rounded-3xl border-2 border-primary shadow-[8px_8px_0px_0px_var(--primary)] md:shadow-[12px_12px_0px_0px_var(--primary)] p-6 md:p-8 xl:p-12 relative">
                        {/* Get in touch badge */}
                        <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-primary text-secondary px-4 py-2 md:px-6 md:py-3 rounded-full border-2 border-foreground shadow-[3px_3px_0px_0px_var(--foreground)] md:shadow-[4px_4px_0px_0px_var(--foreground)] transform rotate-12" aria-hidden="true">
                            <div className="flex items-center gap-1.5 md:gap-2">
                                <Mail
                                    className="w-3 h-3 md:w-4 md:h-4"
                                    strokeWidth={3}
                                />
                                <span className="font-bold text-xs md:text-sm">LET&apos;S TALK</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 relative z-10">
                            {/* Success Message */}
                            <div
                                ref={successContainerRef}
                                className="relative"
                                style={{ display: submitSuccess ? 'block' : 'none' }}
                                role="status"
                                aria-live="polite">
                                <div className="text-center py-12">
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tighter text-gray-700 font-bold mb-4 md:mb-6">
                                        Message{' '}
                                        <span className="relative">
                                            received!
                                            <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-4 bg-accent rounded-full" aria-hidden="true" />
                                        </span>
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-medium leading-relaxed px-2 md:px-0">
                                        Thank you for reaching out. We&apos;ll get back to you within 24 hours!
                                    </p>

                                    <div className="bg-accent/50 border-2 border-primary rounded-xl md:rounded-2xl px-6 py-4 md:px-8 md:py-6 inline-block shadow-[4px_4px_0px_0px_var(--primary)] md:shadow-[6px_6px_0px_0px_var(--primary)]">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={2.5} aria-hidden="true" />
                                            <div className="text-left">
                                                <p className="text-sm md:text-base font-bold text-primary">Check your inbox</p>
                                                <p className="text-xs md:text-sm text-primary/70">You&apos;ll receive a confirmation email shortly</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div ref={formContainerRef}>
                                {!submitSuccess && (
                                    <>
                                        {/* Header */}
                                        <div className="text-center">
                                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tighter text-gray-700 font-bold mb-4 md:mb-6">
                                                Got{' '}
                                                <span className="relative">
                                                    questions?
                                                    <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-4 bg-accent rounded-full" aria-hidden="true" />
                                                </span>
                                                <span className="block">We&apos;ve got answers!</span>
                                            </h1>
                                            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-medium leading-relaxed px-2 md:px-0">
                                                Drop us a message and we&apos;ll get back to you faster than you can say &quot;ma-ma-ma-ma-ma-meal-mate&quot;!
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 md:gap-6" noValidate>
                                            {/* Submit Error Display */}
                                            {errors.submit && (
                                                <div 
                                                    className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-center gap-3"
                                                    role="alert"
                                                    aria-live="polite">
                                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                    <p className="text-sm md:text-base text-red-700 font-medium">
                                                        {errors.submit}
                                                    </p>
                                                </div>
                                            )}

                                            {formFields.map((field) => {
                                                const IconComponent = field.icon;
                                                const isFocused = focusedField === field.name;
                                                const hasValue = formData[field.name as keyof ContactFormData];
                                                const hasError = errors[field.name as keyof FormErrors];

                                                return (
                                                    <div
                                                        key={field.name}
                                                        className="relative group">
                                                        <label htmlFor={field.name} className="sr-only">
                                                            {field.placeholder}
                                                        </label>
                                                        <div
                                                            className={`relative border-2 md:border-3 border-primary rounded-xl md:rounded-2xl transition-all duration-300 ${
                                                                isFocused && !hasError
                                                                    ? 'shadow-[1px_1px_0px_var(--primary)] translate-x-[1px] translate-y-[2px] bg-secondary/50'
                                                                    : 'shadow-[3px_3px_0px_0px_var(--primary)] group-hover:shadow-[0px_0px_0px_0px_var(--primary)] group-hover:translate-x-[3px] group-hover:translate-y-[3px]'
                                                            } ${hasError ? 'bg-red-50 border-red-400' : 'bg-inherit'}`}>
                                                            <div className="flex items-center gap-3 md:gap-4 p-3">
                                                                <div
                                                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                                                                        isFocused || hasValue
                                                                            ? 'bg-accent border-primary shadow-[0px_0px_0px_0px_var(--primary)] translate-x-[3px] translate-y-[3px]'
                                                                            : 'bg-secondary border-primary shadow-[0px_0px_0px_0px_var(--primary)] translate-x-[3px] translate-y-[3px]'
                                                                    }`}
                                                                    aria-hidden="true">
                                                                    <IconComponent
                                                                        className={`w-4 h-4 md:w-5 md:h-5 ${
                                                                            hasError ? 'text-red-600' : 'text-primary'
                                                                        }`}
                                                                        strokeWidth={2.5}
                                                                    />
                                                                </div>
                                                                <input
                                                                    id={field.name}
                                                                    name={field.name}
                                                                    type={field.type}
                                                                    placeholder={field.placeholder}
                                                                    required={field.required}
                                                                    autoComplete={field.autoComplete}
                                                                    value={formData[field.name as keyof ContactFormData]}
                                                                    onChange={handleInputChange}
                                                                    onFocus={() => setFocusedField(field.name)}
                                                                    onBlur={() => setFocusedField(null)}
                                                                    disabled={isSubmitting}
                                                                    aria-invalid={hasError ? 'true' : 'false'}
                                                                    aria-describedby={hasError ? `${field.name}-error` : undefined}
                                                                    className="flex-1 text-base md:text-lg font-medium bg-transparent border-none outline-none placeholder-gray-500 text-gray-800 disabled:opacity-50"
                                                                />
                                                            </div>
                                                        </div>
                                                        {hasError && (
                                                            <p 
                                                                id={`${field.name}-error`}
                                                                className="text-red-500 text-xs md:text-sm mt-2 ml-4 font-medium"
                                                                role="alert">
                                                                {hasError}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })}

                                            {/* Message Field */}
                                            <div className="relative group">
                                                <label htmlFor="message" className="sr-only">
                                                    Your message
                                                </label>
                                                <div
                                                    className={`relative border-2 md:border-3 border-primary rounded-xl md:rounded-2xl transition-all duration-300 ${
                                                        focusedField === 'message' && !errors.message
                                                            ? 'shadow-[1px_1px_0px_var(--primary)] translate-x-[1px] translate-y-[2px] bg-secondary/50'
                                                            : 'shadow-[3px_3px_0px_0px_var(--primary)] md:shadow-[4px_4px_0px_0px_var(--primary)] group-hover:shadow-[2px_2px_0px_0px_var(--primary)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]'
                                                    } ${errors.message ? 'bg-red-50 border-red-400' : 'bg-inherit'}`}>
                                                    <div className="flex gap-3 md:gap-4 p-3">
                                                        <div
                                                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center border-2 transition-all duration-300 flex-shrink-0 ${
                                                                focusedField === 'message' || formData.message
                                                                    ? 'bg-accent border-primary shadow-[2px_2px_0px_0px_var(--primary)]'
                                                                    : 'bg-secondary border-primary shadow-[2px_2px_0px_0px_var(--primary)]'
                                                            }`}
                                                            aria-hidden="true">
                                                            <MessageSquare
                                                                className={`w-4 h-4 md:w-5 md:h-5 ${
                                                                    errors.message ? 'text-red-600' : 'text-primary'
                                                                }`}
                                                                strokeWidth={2.5}
                                                            />
                                                        </div>
                                                        <textarea
                                                            id="message"
                                                            name="message"
                                                            placeholder="Your message"
                                                            rows={4}
                                                            required
                                                            value={formData.message}
                                                            onChange={handleInputChange}
                                                            onFocus={() => setFocusedField('message')}
                                                            onBlur={() => setFocusedField(null)}
                                                            disabled={isSubmitting}
                                                            aria-invalid={errors.message ? 'true' : 'false'}
                                                            aria-describedby={errors.message ? 'message-error' : undefined}
                                                            className="flex-1 text-base md:text-lg font-medium bg-transparent border-none outline-none placeholder-gray-500 text-gray-800 disabled:opacity-50 resize-none"
                                                        />
                                                    </div>
                                                </div>
                                                {errors.message && (
                                                    <p 
                                                        id="message-error"
                                                        className="text-red-500 text-xs md:text-sm mt-2 ml-4 font-medium"
                                                        role="alert">
                                                        {errors.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Submit Button */}
                                            <div className="flex justify-center mt-2 md:mt-4">
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    aria-describedby={errors.submit ? 'submit-error' : undefined}
                                                    className={`group font-bold tracking-wide uppercase flex justify-center items-center leading-5 text-sm md:text-base lg:text-lg py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-12 rounded-xl md:rounded-2xl transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] relative overflow-hidden cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${getSubmitButtonStyle()}`}>
                                                    {getSubmitButtonContent()}

                                                    {/* Button decorative elements */}
                                                    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
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
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact info cards */}
                    <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <a 
                            href="mailto:contact@mealmate.com"
                            className="bg-background border-2 border-primary rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[4px_4px_0px_0px_var(--primary)] md:shadow-[6px_6px_0px_0px_var(--primary)] transform hover:shadow-[2px_2px_0px_0px_var(--primary)] md:hover:shadow-[3px_3px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary rounded-xl flex items-center justify-center border-2 border-primary shadow-[2px_2px_0px_0px_var(--primary)]">
                                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-700">Email Us</h3>
                                    <p className="text-sm md:text-base text-gray-600">admin@mealmate.com</p>
                                </div>
                            </div>
                        </a>

                        <a 
                            href="tel:+15551234567"
                            className="bg-background border-2 border-primary rounded-xl md:rounded-2xl p-4 md:p-6 shadow-[4px_4px_0px_0px_var(--primary)] md:shadow-[6px_6px_0px_0px_var(--primary)] transform hover:shadow-[2px_2px_0px_0px_var(--primary)] md:hover:shadow-[3px_3px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] md:hover:translate-x-[3px] md:hover:translate-y-[3px] transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-xl flex items-center justify-center border-2 border-primary shadow-[2px_2px_0px_0px_var(--primary)]">
                                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-700">Call Us</h3>
                                    <p className="text-sm md:text-base text-gray-600">Coming soon!  </p>
                                </div>
                            </div>
                        </a>
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
                    
                    .sr-only {
                        position: absolute;
                        width: 1px;
                        height: 1px;
                        padding: 0;
                        margin: -1px;
                        overflow: hidden;
                        clip: rect(0, 0, 0, 0);
                        white-space: nowrap;
                        border-width: 0;
                    }
                    
                    /* Define CSS variables for the theme */
                    :root {
                        --primary: #3b82f6;
                        --secondary: #fbbf24;
                        --accent: #f472b6;
                        --background: #ffffff;
                        --foreground: #111827;
                    }
                `}</style>
            </div>
        </div>

    );
};