import Image from 'next/image';

export default function Home() {
	return (
		<div className="w-full flex flex-col">
			<nav className="w-full flex justify-between items-center py-2 md:py-4 xl:py-6 px-4 md:px-8 xl:px-12">
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
					<button className="bg-button-bg hover:bg-button-bg-hover flex justify-center items-center leading-5 text-base text-foreground py-3 md:py-4 px-6 md:px-8 rounded-full transition-colors duration-300 hover:cursor-pointer">
						Download
					</button>
				</div>
			</nav>

			<div className="w-full flex flex-col justify-center items-center gap-4 md:gap-8 xl:gap-12 px-4 md:px-8 xl:px-12 py-24">
				<h2 className="text-base md:text-lg xl:text-2xl tracking-tight text-gray-500">Meal kits are broken</h2>
				<h1 className="mb-12 md:mb-8 text-[48px] md:text-[110px] xl:text-[150px] leading-[0.9] tracking-tighter text-center text-gray-700">
					We're fixing it.
				</h1>
        <button className="bg-button-bg hover:bg-button-bg-hover flex justify-center items-center leading-5 text-base md:text-lg text-foreground py-4 md:py-6 px-8 md:px-12 rounded-full transition-colors duration-300 hover:cursor-pointer">
          Download App
        </button>
			</div>
		</div>
	);
}
