import BookNow from "@/components/BookNow";
import GuestCheckIn from "@/components/GuestCheckIn";
import GuestCheckIns from "@/components/MyCheckIns";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, BookCheck } from "lucide-react";
import React, { useState } from "react";

const Reservation = () => {
  const resOpt = [
    { name: "Book Now", icon: BookCheck },
    { name: "Check In", icon: BadgeCheck },
  ];
  const [tabs, setTabs] = useState(resOpt[0].name);
  return (
    <>
      <div className="p-4 md:p-16 flex flex-col items-center min-h-screen z-10 w-full">
        <div className="md:w-2/3 w-full border-b border-primary/30 flex">
          {resOpt.map((option) => (
            <p
              key={option.name}
              className={`flex items-center gap-1 ${
                tabs === option.name
                  ? "border-b-2 border-primary"
                  : "border-b-2 border-transparent text-white/70"
              } px-auto w-full justify-center text-sm cursor-pointer font-semibold`}
              onClick={() => setTabs(option.name)}
            >
              {<option.icon strokeWidth={1.5} className="size-4.5" />}{" "}
              {option.name}
            </p>
          ))}
        </div>
        <marquee behavior="scroll" direction="right" scrollamount="10" className="text-sm font-bold text-primary/80 mt-4">
  Please note: No refunds will be allowed before or after check-in. All bookings are final.
</marquee>

        <AnimatePresence mode="wait">
          <motion.div
            key={tabs}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {tabs === "Book Now" && <BookNow />}
            {tabs === "Check In" && <GuestCheckIn />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Reservation;
