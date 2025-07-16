const testimonials = [
  {
    quote:
      "The quality and authenticity of every piece I've purchased from Velvet Revival is unmatched. It's like wearing a piece of history.",
    name: "Sarah Chen",
    location: "New York, NY",
  },
  {
    quote:
      "I love how each item tells its own story. The curation is impeccable, and the customer service is outstanding.",
    name: "Marcus Johnson",
    location: "Los Angeles, CA",
  },
  {
    quote:
      "Finally, a vintage store that understands both style and sustainability. My wardrobe has never looked better.",
    name: "Elena Rodriguez",
    location: "Austin, TX",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-ivory/50 paper-texture">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-4">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-ivory p-8 rounded-sm shadow-sm border border-warm-brown/10">
              <blockquote className="text-espresso/80 italic text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-warm-brown/20 pt-4">
                <p className="font-semibold text-espresso">{testimonial.name}</p>
                <p className="text-espresso/60 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
