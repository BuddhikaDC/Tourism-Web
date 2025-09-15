import { Trophy, Leaf, ShieldCheck, Users } from 'lucide-react'
import Heading from '../Heading/header'
import { motion } from 'framer-motion'

function About() {
  return (
    <section id="about" className="relative py-16">
      <Heading />
      <div className="absolute inset-0 pointer-events-none">
        <span className="gradient-blob gradient-emerald left-[-40px] top-10 h-40 w-40"></span>
        <span className="gradient-blob gradient-cyan right-[30px] bottom-10 h-36 w-36" style={{ animationDelay: '0.6s' }}></span>
      </div>

      <motion.div 
        className="relative mx-auto max-w-5xl px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
				{/* <div className="text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">About Us</h2>
					<p className="text-gray-600">Crafting unforgettable journeys across Sri Lanka's wild and wonder.</p>
				</div> */}

				<motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
					<motion.div 
              className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-emerald-100 shadow-sm"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                We connect travelers with Sri Lanka's authentic nature and culture through
                thoughtfully curated experiences. From leopard safaris in Yala to tea-country
                trails in Ella, our team of local experts ensures safety, comfort, and
                memories that last a lifetime.
              </p>

              <ul className="mt-4 space-y-2 text-gray-700">
                <li className="flex items-center gap-2"><Leaf className="h-4 w-4 text-emerald-600" /> Eco-conscious operations</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Safety-first guiding</li>
                <li className="flex items-center gap-2"><Users className="h-4 w-4 text-emerald-600" /> Small-group experiences</li>
              </ul>
            </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1, delayChildren: 0.2 }}
          >
						<motion.div 
              className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-emerald-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
							<div className="text-3xl font-bold text-emerald-700">10k+</div>
							<div className="text-gray-600 text-sm">Happy Travelers</div>
						</motion.div>
						<motion.div 
              className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-emerald-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
							<div className="text-3xl font-bold text-emerald-700">150+</div>
							<div className="text-gray-600 text-sm">Expert Guides</div>
						</motion.div>
						<motion.div 
              className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-emerald-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
							<div className="text-3xl font-bold text-emerald-700">98%</div>
							<div className="text-gray-600 text-sm">5★ Reviews</div>
						</motion.div>
						<motion.div 
              className="rounded-2xl bg-white/90 backdrop-blur p-6 border border-emerald-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
							<div className="text-3xl font-bold text-emerald-700">24/7</div>
							<div className="text-gray-600 text-sm">Guest Support</div>
						</motion.div>
					</motion.div>
				</motion.div>

				<motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
					<motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Your Trip
          </motion.a>
          <motion.a 
            href="#destinations" 
            className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-white/80 px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Destinations
          </motion.a>
        </motion.div>
			</motion.div>
		</section>
	)
}

export default About
