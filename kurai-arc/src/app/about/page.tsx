import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function About() {
    return (
        <main className="min-h-screen bg-deep-black font-sans selection:bg-accent-purple selection:text-warm-white">
            <Navigation />

            <div className="pt-32 px-4 pb-24 max-w-[900px] mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-light mb-6 text-warm-white">
                        About kurai.arc
                    </h1>
                    <p className="text-secondary-gray/60 text-sm tracking-wider">
                        暗い — DARKNESS REFINED
                    </p>
                </header>

                <div className="space-y-16">
                    {/* Philosophy Section */}
                    <section className="border-l-2 border-accent-purple pl-6">
                        <h2 className="text-2xl font-light mb-4 text-warm-white">Philosophy</h2>
                        <p className="text-secondary-gray leading-relaxed mb-4">
                            kurai.arc exists at the intersection of darkness and design. We craft garments that embrace the void—pieces that speak to those who find beauty in shadows and strength in subtlety.
                        </p>
                        <p className="text-secondary-gray leading-relaxed">
                            Each collection is an exploration of urban minimalism, technical innovation, and timeless silhouettes. We don't follow trends. We archive moments.
                        </p>
                    </section>

                    {/* Design Approach */}
                    <section className="bg-soft-black border border-secondary-border rounded-lg p-8">
                        <h2 className="text-2xl font-light mb-6 text-warm-white">Design Approach</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-accent-purple text-sm tracking-widest mb-2 uppercase">Materials</h3>
                                <p className="text-secondary-gray text-sm leading-relaxed">
                                    Premium technical fabrics. Gore-Tex shells. Japanese denim. Every material is chosen for durability and aesthetic precision.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-accent-purple text-sm tracking-widest mb-2 uppercase">Silhouettes</h3>
                                <p className="text-secondary-gray text-sm leading-relaxed">
                                    Oversized cuts. Asymmetric details. Modular construction. Form follows function, but never without intention.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-accent-purple text-sm tracking-widest mb-2 uppercase">Color Palette</h3>
                                <p className="text-secondary-gray text-sm leading-relaxed">
                                    Monochrome foundations. Occasional bursts of neon. We work in shades of night—obsidian, charcoal, void.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-accent-purple text-sm tracking-widest mb-2 uppercase">Philosophy</h3>
                                <p className="text-secondary-gray text-sm leading-relaxed">
                                    Less is infinite. Every stitch serves a purpose. We design for the urban nomad, the night wanderer, the silent observer.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="border-l-2 border-accent-purple pl-6">
                        <h2 className="text-2xl font-light mb-4 text-warm-white">Contact</h2>
                        <div className="flex flex-col gap-2">
                            <div className="text-sm">
                                <span className="text-secondary-gray">email: </span>
                                <a href="mailto:contact@kurai.arc" className="text-secondary-gray hover:text-accent-purple transition-colors">
                                    contact@kurai.arc
                                </a>
                            </div>
                            <div className="text-sm">
                                <span className="text-secondary-gray">telegram: </span>
                                <a href="https://t.me/kurai_arc" className="text-secondary-gray hover:text-accent-purple transition-colors">
                                    @kurai.arc
                                </a>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            <Footer />
        </main>
    );
}
