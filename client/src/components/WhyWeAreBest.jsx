import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WhyWeAreBest = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 px-6 md:px-20 text-center bg-white -mt-1">
      <motion.h2
        initial={{ opacity: 0, y: -100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="md:text-4xl text-3xl font-bold mb-4 font-serif text-accent"
      >
        Why We're the Best?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className="md:text-lg text-xs text-primary max-w-2xl mx-auto"
      >
        At <span className="font-semibold text-primary">LuxuryStay</span>,
        excellence isn't an option — it's our standard. With cutting-edge
        technology, a user-first approach, and real-time automation, we deliver{" "}
        <span className="font-semibold">flawless hotel management</span> and
        <span className="font-semibold"> unforgettable guest experiences</span>.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 1 }}
        className="mt-4 md:text-xl text-sm font-medium text-accent"
      >
        Smart. Reliable. Remarkable. That's the LuxuryStay promise.
      </motion.p>
    </section>
  );
};

export default WhyWeAreBest;
