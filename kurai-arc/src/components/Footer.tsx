export default function Footer() {
    return (
        <footer className="py-16 px-6 bg-deep-black border-t border-secondary-border">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <div className="text-2xl font-light mb-2 tracking-tight">
                        kurai<span className="text-accent-purple">.arc</span>
                    </div>
                </div>

                <div className="flex flex-row gap-8 md:gap-12 items-center text-center">
                    {['INSTAGRAM', 'TELEGRAM', 'TIKTOK'].map((social) => (
                        <span key={social} className="text-[11px] tracking-[0.2em] md:tracking-[0.15em] text-secondary-gray hover:text-accent-purple cursor-pointer transition-colors duration-300">
                            {social}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
}
