import GuestBookings from "@/components/GuestBookings";
import GuestProfile from "@/components/GuestProfile";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, BedDouble, BookCheck, CircleUser } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyCheckIns from "@/components/MyCheckIns";

const GuestDetails = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { path } = useParams();

  const [tab, setTab] = useState(path || "Profile");
  useEffect(() => {
    setTab(path);
  }, [path])
  
  const options = [
      { name: "Profile", icon: CircleUser},
      {name: "My-CheckIns", icon: BadgeCheck},
      {name: "My-Bookings", icon: BookCheck},
    ];
  return (
    <>
    <div className="p-4 md:px-16 md:py-10 flex flex-col md:gap-8 gap-4 w-full min-h-screen z-10">
        <div className="w-full border-b border-primary/30 flex">
          {options.map(
            (option) =>
                <p
                  key={option.name}
                  className={`flex items-center gap-1 ${
                    tab === option.name
                      ? "border-b-2 border-primary"
                      : "border-b-2 border-transparent text-white/70"
                  } px-auto w-full justify-center text-sm cursor-pointer font-semibold`}
                  onClick={() => setTab(option.name)}
                >
                  {
                    <option.icon
                      strokeWidth={1.5}
                      className="size-4.5 xl:block hidden"
                    />
                  }{" "}
                  {option.name}
                </p>
              )
          }
        </div>

        <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {tab === "Profile" && <GuestProfile/>}
                    {tab === "My-CheckIns" && <MyCheckIns/>}
                    {tab === "My-Bookings" && <GuestBookings/>}
                  </motion.div>
                </AnimatePresence>
    </div>
    </>
  );
};

export default GuestDetails;
