import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Vintage fashion lifestyle"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-ivory px-4 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Timeless Style,
          <br />
          <span className="font-display text-gold">Vintage Soul</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
          Discover carefully curated vintage pieces that tell a story and define your unique style
        </p>
        <button className="btn-primary text-lg">Shop the Collection</button>
      </div>
    </section>
  )
}
