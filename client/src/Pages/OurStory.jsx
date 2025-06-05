import React, { useEffect } from "react";
import { motion } from "framer-motion";
const OurStory = () => {
  useEffect(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <>
      <div className="p-4 md:p-16 flex flex-col items-center justify-center min-h-screen z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:text-5xl text-4xl font-bold font-serif uppercase text-primary text-center -mt-20  text-shadow-md text-shadow-black"
        >
          Our Story
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
          <div className={"md:border-r border-primary md:pr-4"}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h3 className="md:text-2xl text-lg font-bold font-serif uppercase pt-10 ">
                Our Beginning:
              </h3>
              <p className="md:text-lg text-sm text-primary/80 ">
                At <span className="font-bold">LuxuryStay Hospitality</span>, we
                started with a single mission: to redefine hotel service through
                technology. What began as a premium hotel brand has now expanded
                into a smart ecosystem that blends hospitality with innovation.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="md:pl-4"
          >
            <h3 className="md:text-2xl text-lg font-bold font-serif uppercase pt-10 ">
              The Need for Innovation:
            </h3>
            <p className="md:text-lg text-sm text-primary/80 ">
              We realized the industry needed more than just luxury — it needed
              efficiency, precision, and personalization. That's why we invested
              in building a next-gen{" "}
              <span className="font-bold">Hotel Management System</span>.
            </p>
          </motion.div>
          <div className={"md:border-r border-primary md:pr-4"}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <h3 className="md:text-2xl text-lg font-bold font-serif uppercase pt-10 ">
                Our Vision:
              </h3>
              <p className="md:text-lg text-sm text-primary/80">
                We envision a future where{" "}
                <span className="font-bold">
                  every guest experience is seamless
                </span>{" "}
                and
                <span className="font-bold">
                  every hotel operation is data-driven
                </span>
                , reliable, and secure for both staff and guests alike to enjoy
                a luxurious stay that exceeds expectations and leaves a lasting
                impression.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="md:pl-4"
          >
            <h3 className="md:text-2xl text-lg font-bold font-serif uppercase pt-10 ">
              What's Next ?:
            </h3>
            <p className="md:text-lg text-sm text-primary/80 ">
              As we continue to grow, our focus remains on{" "}
              <span className="font-bold">
                enhancing guest satisfaction and empowering hotel staff
              </span>{" "}
              through technology. From intelligent analytics to instant feedback
              loops, LuxuryStay is setting new standards.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OurStory;
