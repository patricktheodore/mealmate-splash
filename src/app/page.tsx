'use client';

import Image from 'next/image';

export default function Home() {

  const scrollToForm = () => {
    const formElement = document.querySelector('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

	return (
		<div className="h-full relative w-full flex flex-col">
			<nav className="absolute top-0 w-full flex justify-between items-center p-4 xl:py-6 px-4 md:px-8 xl:px-12">
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
						src="/images/mealmate-logo-small.png"
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
            className="bg-button-bg hover:bg-button-bg-hover flex justify-center items-center leading-5 text-base text-foreground py-3 md:py-4 px-6 md:px-8 rounded-full transition-colors duration-300 hover:cursor-pointer"
          >
            Join the waitlist
          </button>
				</div>
			</nav>

			<div className="h-screen w-full flex flex-col justify-center items-center gap-4 md:gap-8 xl:gap-12 px-4 md:px-8 xl:px-12 py-24">
				<h2 className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500">Meal kits are broken</h2>
				<h1 className="mb-12 md:mb-8 text-[48px] md:text-[110px] xl:text-[150px] leading-[0.9] tracking-tighter text-center text-gray-700">
					We&apos;re fixing it.
				</h1>
        <button onClick={scrollToForm} className="bg-button-bg hover:bg-button-bg-hover flex justify-center items-center gap-2 leading-5 text-base md:text-lg text-foreground py-4 md:py-6 px-8 md:px-12 rounded-full transition-colors duration-300 hover:cursor-pointer">
          Join the waitlist 
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
			</div>

			<div className="w-full flex flex-col justify-end bg-secondary h-screen p-4 md:p-8 xl:px-12 mt-32">
        <span className='text-base md:text-lg xl:text-2xl tracking-tight text-gray-500 text-center mb-4'>
          Not a meal planning app.
        </span>
        <h2 className='text-[40px] md:text-[60px] xl:text-[80px] leading-[0.9] tracking-tighter text-center text-gray-700'>
          Something better. <br />
          Built for real life.
        </h2>


				<div className="bg-background rounded-xl shadow-lg p-8 xl:p-12 w-full max-w-3xl mx-auto grid grid-cols-1 gap-4 md:gap-8 xl:gap-16 mt-24">
					<div className="flex flex-col gap-4 md:gap-8 xl:gap-12">
						<h3 className="text-[40px] md:text-[60px] xl:text-[80px] leading-[0.9] tracking-tighter text-center text-gray-700">
							Let&apos;s revolutionise the way we eat 
						</h3>
						<form className="w-full flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<input
									name="name"
									type="text"
									placeholder="Your name"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="email"
									type="email"
									placeholder="Your email"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="location"
									type="text"
									placeholder="Your location (optional)"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<input
									name="age"
									type="number"
									placeholder="Your age (optional)"
									min="1"
									max="120"
									className="px-4 py-3 text-md md:text-xl font-sans rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
								/>
							</div>
							<div className="w-full flex justify-end">
								<button
									className="bg-button-bg hover:bg-button-bg-hover flex justify-center items-center leading-5 text-base md:text-lg text-foreground py-3 md:py-4 px-4 md:px-6 rounded-full transition-colors duration-300 hover:cursor-pointer mt-4"
									type="submit">
									Sign up
								</button>
							</div>
						</form>
					</div>

				</div>
					<div className="mt-4 w-full text-center leading-3 text-gray-500 text-xs">© 2025 mealmate</div>
			</div>
		</div>
	);
}