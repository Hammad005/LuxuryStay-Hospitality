import { Plus, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import AddStaff from "./AddStaff";
import StaffDetails from "./StaffDetails";
const StaffTab = () => {
  const [tab, setTab] = useState("Staff Details");
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
          <div className="relative ml-1">
            <Users className="size-7 text-primary" />{" "}
            <Users className="size-7 text-primary absolute top-0 right-0 -scale-x-100 -translate-x-1/4" />
          </div>{" "}
          Senior Staff
        </h2>
        <p className="text-sm text-primary/80">
          This is the senior Staff tab where you can view senior Staff members and their
          details.
        </p>
        <div className="grid grid-cols-2 gap-4 my-4">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              className={"w-full"}
              onClick={() => setTab("Staff Details")}
              variant={tab === "Staff Details" ? "secondary" : "outline"}
            >
              <Users className="size-4" />
              Staff Details
            </Button>
          </motion.div>

          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              className={"w-full"}
              onClick={() => setTab("Add New Staff Member")}
              variant={tab === "Add New Staff Member" ? "secondary" : "outline"}
            >
              <Plus className="size-4" />
              Add New Staff
            </Button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {tab === "Staff Details" && <StaffDetails/>}
            {tab === "Add New Staff Member" && <AddStaff/>}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default StaffTab;
