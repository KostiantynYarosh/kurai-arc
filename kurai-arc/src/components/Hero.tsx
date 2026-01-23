export default function Hero() {
    return (
        <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-4">
            {/* Glow Effect */}
            <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent-purple/15 blur-[60px] md:blur-[100px] rounded-full animate-float opacity-60" />

            {/* Hero Content */}
            <div className="relative z-10 text-center transform translate-y-0 transition-all duration-1000 ease-out">
                <div className="text-5xl md:text-[clamp(4rem,15vw,10rem)] font-light tracking-tighter leading-[0.9] mb-2 select-none">
                    kurai<span className="text-accent-purple">.arc</span>
                </div>
                <div className="text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-secondary-gray uppercase mt-6">
                    暗い — darkness refined
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 animate-float opacity-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary-gray">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </section>
    );
}
