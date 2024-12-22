import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="py-20 bg-background/95">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-8 animate-glow">About Our Community</h2>
          <p className="text-base md:text-lg text-gray-300 mb-12 leading-relaxed">
            We are a collective of creators, innovators, and dreamers. Our community thrives on collaboration,
            creativity, and the pursuit of excellence in design and artistry.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Vision",
                description: "Empowering creative minds to explore and innovate through design."
              },
              {
                title: "Mission",
                description: "Building a supportive community where creativity knows no bounds."
              },
              {
                title: "Values",
                description: "Excellence, collaboration, and continuous growth in creative pursuits."
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors"
              >
                <h3 className="text-xl md:text-2xl font-serif mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};