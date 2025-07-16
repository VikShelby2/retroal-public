import Image from "next/image"

const collections = [
  {
    name: "70s Jackets",
    image: "/placeholder.svg?height=300&width=400",
    description: "Groovy outerwear from the disco era",
  },
  {
    name: "Vintage Denim",
    image: "/placeholder.svg?height=300&width=400",
    description: "Classic jeans with authentic wear",
  },
  {
    name: "Silk & Satin",
    image: "/placeholder.svg?height=300&width=400",
    description: "Luxurious fabrics from decades past",
  },
  {
    name: "Statement Coats",
    image: "/placeholder.svg?height=300&width=400",
    description: "Bold outerwear that makes an impression",
  },
]

export default function Collections() {
  return (
    <section id="collections" className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Shop by Collection</h2>
          <p className="text-lg text-espresso/80 max-w-2xl mx-auto">
            Explore our carefully curated collections, each representing a distinct era and style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group cursor-pointer border-2 border-rust/20 hover:border-rust transition-colors duration-300 rounded-sm overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-espresso/20 group-hover:bg-espresso/30 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-espresso/80 to-transparent">
                  <h3 className="font-display text-2xl font-bold text-ivory mb-2">{collection.name}</h3>
                  <p className="text-ivory/90">{collection.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
