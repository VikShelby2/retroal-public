import Image from "next/image"
import AddToCartButton from "./AddToCartButton"

const products = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    description: "Classic 70s brown leather with authentic patina",
    price: "$285",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "High-Waisted Denim",
    description: "Perfect fit vintage Levi's from the 80s",
    price: "$165",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Silk Blouse",
    description: "Delicate floral print from the 60s era",
    price: "$125",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Wool Coat",
    description: "Elegant camel coat with vintage buttons",
    price: "$320",
    image: "/placeholder.svg?height=400&width=300",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-ivory paper-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">Featured Pieces</h2>
          <p className="text-lg text-espresso/80 max-w-2xl mx-auto">
            Each piece in our collection is hand-selected for its quality, authenticity, and timeless appeal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-sm mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/10 transition-colors duration-300"></div>
              </div>
              <h3 className="font-serif text-xl font-semibold text-espresso mb-2">{product.name}</h3>
              <p className="text-espresso/70 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg text-espresso">{product.price}</span>
                <AddToCartButton product={product} variant="secondary" className="text-sm px-4 py-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
