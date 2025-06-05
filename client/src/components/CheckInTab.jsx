import {  BadgeCheck, BookCheck, CheckCircle, ClipboardX, NotebookTabs, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from './ui/button';
import ConfirmBookings from './ConfirmBookings';
import CancelledBookings from './CancelledBookings';
import AllCheckIns from './AllCheckIns';
import AllCheckOuts from './AllCheckOuts';
const CheckInTab = () => {
    const [tab, setTab] = useState("Check Ins");
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
                  <BadgeCheck className="size-7 text-primary" /> Check Ins
                </h2>
                <p className="text-sm text-primary/80">
                  This is the check In tab where you can view all check ins and check outs.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Button className={'w-full'}
                    onClick={() => setTab("Check Ins")}
                    variant={tab === "Check Ins" ? "secondary" : "outline"}
                    >
                      Check Ins
                    </Button>
                  </motion.div>
        
                  <motion.div
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Button className={'w-full'}
                    onClick={() => setTab("Check Outs")}
                    variant={tab === "Check Outs" ? "secondary" : "outline"}>
                      Check Outs
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
                    {tab === "Check Ins" && <AllCheckIns />}
                    {tab === "Check Outs" && <AllCheckOuts />}
                  </motion.div>
                  </AnimatePresence>
              </div>
    </>
  )
}

export default CheckInTab