import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { serviceStore } from "@/store/serviceStore";
const OurServices = () => {
  const { services } = serviceStore();
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
          className="md:text-5xl text-4xl font-bold font-serif uppercase text-primary text-center   text-shadow-md text-shadow-black"
        >
          Our Services
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-4">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const initial = { opacity: 0, x: isEven ? -100 : 100 };
            return (
              <motion.div
                key={service.id}
                initial={initial}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="p-4 bg-background  rounded-lg border border-primary/80"
              >
                <h3 className="text-lg font-semibold">{service.serviceName}</h3>
                <p className="text-primary/80 md:text-sm text-xs">
                  {service.serviceDescription}
                </p>
                <p className="md:text-6xl text-3xl font-bold  text-end mt-4 text-transparent [-webkit-text-stroke:1px_var(--primary)]">
                  Rs. {service.servicePrice}/-
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OurServices;
