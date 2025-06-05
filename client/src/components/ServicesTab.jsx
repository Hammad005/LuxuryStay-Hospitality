import { HandHeart, HandPlatter, Plus, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import AddStaff from "./AddStaff";
import StaffDetails from "./StaffDetails";
import { staffStore } from "@/store/staffStore";
import AddService from "./AddService";
import AllServices from "./AllServices";


const ServicesTab = () => {
  const {staff} = staffStore();
  const [tab, setTab] = useState("All Services");
  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, [])
  return (
    <>
    <div className="flex flex-col w-full bg-accent border border-primary rounded-lg p-4">
            <h2 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2">
                <HandPlatter className="size-7 text-primary" />{" "}
                Services
            </h2>
            <p className="text-sm text-primary/80">
              This is the services tab where you can view all available services.
            </p>
            {(staff?.role === "Admin" || staff?.role === "General Manager") && <div className="grid grid-cols-2 gap-4 my-4">
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  className={"w-full"}
                  onClick={() => setTab("All Services")}
                  variant={tab === "All Services" ? "secondary" : "outline"}
                >
                  <HandHeart className="size-4" />
                  All Services
                </Button>
              </motion.div>
    
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button
                  className={"w-full"}
                  onClick={() => setTab("Add New Service")}
                  variant={tab === "Add New Service" ? "secondary" : "outline"}
                >
                  <Plus className="size-4" />
                  Add New Service
                </Button>
              </motion.div>
            </div>}
    
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                {tab === "All Services" && <AllServices/>}
                {tab === "Add New Service" && <AddService/>}
              </motion.div>
            </AnimatePresence>
          </div>
    </>
  )
}

export default ServicesTab