export default function MoodGrid() {
    return (
        <section className="py-24 px-4 bg-deep-black">
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-xs tracking-[0.2em] text-secondary-gray uppercase mb-7">
                    Moodboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[100px] gap-4">
                    {/* Large image placeholder */}
                    <div className="row-span-3 md:col-span-6 md:row-span-4 bg-soft-black rounded-lg border border-secondary-border flex items-center justify-center hover:border-secondary-gray transition-colors">
                        <span className="text-secondary-gray text-xs tracking-widest text-center px-4 uppercase">
                            DARK STREETWEAR
                        </span>
                    </div>
                    {/* Text block */}
                    <div className="row-span-2 md:col-span-3 md:row-span-2 bg-accent-purple rounded-lg p-6 flex flex-col justify-center relative overflow-hidden group">
                        <div className="text-2xl font-light mb-2 relative z-10 text-warm-white">暗い</div>
                        <div className="text-xs opacity-80 relative z-10 text-warm-white">darkness</div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </div>
                    {/* Small blocks */}
                    <div className="row-span-1 md:col-span-3 md:row-span-2 bg-dark-gray rounded-lg border border-secondary-border flex items-center justify-center hover:border-secondary-gray transition-colors">
                        <span className="text-secondary-gray text-xs tracking-widest text-center px-4">OVERSIZED</span>
                    </div>
                    <div className="row-span-1 md:col-span-3 md:row-span-2 bg-soft-black rounded-lg border border-secondary-border flex items-center justify-center hover:border-secondary-gray transition-colors">
                        <span className="text-secondary-gray text-xs tracking-widest text-center px-4">TECHWEAR</span>
                    </div>
                    <div className="row-span-1 md:col-span-3 md:row-span-2 bg-dark-gray rounded-lg border border-secondary-border flex items-center justify-center hover:border-secondary-gray transition-colors">
                        <span className="text-secondary-gray text-xs tracking-widest text-center px-4">MINIMAL</span>
                    </div>
                    {/* Bottom row */}
                    <div className="row-span-2 md:col-span-4 md:row-span-2 bg-dark-gray rounded-lg border border-secondary-border flex items-center justify-center hover:border-secondary-gray transition-colors">
                        <span className="text-secondary-gray text-xs tracking-widest text-center px-4">MONOCHROME</span>
                    </div>
                    <div className="row-span-2 md:col-span-4 md:row-span-2 bg-accent-indigo rounded-lg p-6 flex items-center justify-center group relative overflow-hidden">
                        <div className="text-center relative z-10">
                            <div className="text-xl font-light text-warm-white mb-1 uppercase">ARCHIVE</div>
                            <div className="text-[10px] text-warm-white/70 tracking-[0.2em]">2024—∞</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    </div>
                    <div className="row-span-2 md:col-span-4 md:row-span-2 bg-soft-black rounded-lg border border-secondary-border flex items-center justify-center hover:border-secondary-gray transition-colors">
                        <span className="text-secondary-gray text-xs tracking-widest text-center px-4">JAPANESE</span>
                    </div>
                </div>
            </div>
        </section>
    );
}