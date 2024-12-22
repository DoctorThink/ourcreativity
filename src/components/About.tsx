import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="py-20 bg-secondary/95">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-8 glow-text">About Our Community</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-12">
            We are a collective of creators, innovators, and dreamers. Our community thrives on collaboration,
            creativity, and the pursuit of excellence in design and artistry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Vision", "Mission", "Values"].map((title) => (
              <div key={title} className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm">
                <h3 className="text-2xl font-serif mb-4">{title}</h3>
                <p className="text-gray-400">
                  Empowering creative minds to explore, innovate, and inspire through collaborative design.
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};