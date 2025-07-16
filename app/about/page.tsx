"use client"
import { motion } from "framer-motion"
import Header from "../components/Header"
import Image from "next/image"
import Link from "next/link"
import { Heart, Recycle, Star, Users, Award } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion for Vintage",
    description:
      "Every piece in our collection is hand-selected with love and appreciation for its unique history and craftsmanship.",
  },
  {
    icon: Recycle,
    title: "Sustainable Fashion",
    description:
      "We believe in giving pre-loved clothing a second life, reducing waste while celebrating timeless style.",
  },
  {
    icon: Star,
    title: "Quality Curation",
    description:
      "Our expert team carefully inspects and authenticates each item to ensure you receive only the finest vintage pieces.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description:
      "We're building a community of vintage lovers who appreciate the artistry and stories behind each garment.",
  },
]

const stats = [
  { number: "10,000+", label: "Happy Customers" },
  { number: "25,000+", label: "Vintage Pieces Sold" },
  { number: "15+", label: "Years Experience" },
  { number: "50+", label: "Partner Boutiques" },
]

const team = [
  {
    name: "Elena Rodriguez",
    role: "Founder & Creative Director",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Elena's passion for vintage fashion began in her grandmother's closet. With over 15 years in fashion curation, she founded Retroshop.al to share her love for timeless pieces.",
  },
  {
    name: "Marcus Chen",
    role: "Head of Authentication",
    image: "/placeholder.svg?height=300&width=300",
    bio: "A fashion historian with an eye for detail, Marcus ensures every piece meets our authenticity standards. His expertise spans from 1920s Art Deco to 1990s grunge.",
  },
  {
    name: "Sofia Andersson",
    role: "Sustainability Coordinator",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Sofia leads our mission to make fashion more sustainable. She works with local communities to source vintage pieces and educate about conscious consumption.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-espresso mb-6">Our Story</h1>
              <p className="text-xl text-espresso/80 leading-relaxed mb-8">
                Born from a love of timeless fashion and sustainable living, Retroshop.al is more than just a vintage
                boutique—we're curators of fashion history, guardians of craftsmanship, and champions of individual
                style.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <Link href="/collections">
                  <motion.button
                    className="bg-rust text-ivory px-8 py-4 rounded-sm font-medium hover:bg-rust/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Our Collections
                  </motion.button>
                </Link>
                <span className="text-espresso/60">Est. 2009</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Vintage clothing collection"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-gold text-espresso p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-lg">Certified Authentic</div>
                    <div className="text-sm opacity-80">Every piece verified</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-serif text-3xl md:text-4xl font-bold text-rust mb-2">{stat.number}</div>
                <div className="text-espresso/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-6"
            >
              Why We Do What We Do
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-espresso/80 leading-relaxed"
            >
              In a world of fast fashion and disposable trends, we believe in the power of pieces that have stood the
              test of time. Each vintage garment tells a story, carries history, and represents craftsmanship that's
              increasingly rare in today's world.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cream p-8 rounded-lg hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gold p-3 rounded-full flex-shrink-0">
                    <value.icon className="w-6 h-6 text-espresso" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-espresso mb-3">{value.title}</h3>
                    <p className="text-espresso/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-warm-brown/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-6">Our Curation Process</h2>
            <p className="text-lg text-espresso/80 max-w-3xl mx-auto leading-relaxed">
              Every piece goes through our rigorous selection and authentication process to ensure you receive only the
              finest vintage treasures.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sourcing",
                description:
                  "We travel to estate sales, vintage markets, and partner with collectors worldwide to find unique pieces with authentic provenance.",
              },
              {
                step: "02",
                title: "Authentication",
                description:
                  "Our experts examine each piece for authenticity, quality, and historical significance using specialized knowledge and tools.",
              },
              {
                step: "03",
                title: "Restoration",
                description:
                  "When needed, we carefully restore pieces using period-appropriate techniques to preserve their integrity and beauty.",
              },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-rust text-ivory w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6">
                  {process.step}
                </div>
                <h3 className="font-serif text-2xl font-bold text-espresso mb-4">{process.title}</h3>
                <p className="text-espresso/70 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-espresso mb-6">Meet Our Team</h2>
            <p className="text-lg text-espresso/80 max-w-3xl mx-auto leading-relaxed">
              The passionate individuals behind Retroshop.al who make our vintage dreams come true.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cream rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-espresso mb-1">{member.name}</h3>
                  <p className="text-rust font-medium mb-4">{member.role}</p>
                  <p className="text-espresso/70 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-espresso text-ivory">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Join Our Vintage Community</h2>
            <p className="text-xl text-ivory/80 leading-relaxed mb-8">
              Discover unique pieces, learn about fashion history, and connect with fellow vintage enthusiasts. Your
              perfect vintage piece is waiting for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collections">
                <motion.button
                  className="bg-gold text-espresso px-8 py-4 rounded-sm font-medium hover:bg-gold/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Shopping
                </motion.button>
              </Link>
              <motion.button
                className="border-2 border-ivory text-ivory px-8 py-4 rounded-sm font-medium hover:bg-ivory hover:text-espresso transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe to Newsletter
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
