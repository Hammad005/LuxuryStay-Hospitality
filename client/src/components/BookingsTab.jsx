import { BedDouble, BookCheck, CheckCircle, ClipboardX, NotebookTabs, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from './ui/button';
import RoomsDetails from './RoomsDetails';
import AddNewRoom from './AddNewRoom';
import ConfirmBookings from './ConfirmBookings';
import CancelledBookings from './CancelledBookings';
const BookingsTab = () => {
    const [tab, setTab] = useState("Confirmed Bookings");
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
                  <BookCheck className="size-7 text-primary" /> Bookings
                </h2>
                <p className="text-sm text-primary/80">
                  This is the booking tab where you can view all confirmed and cancelled bookings and also manage them.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <motion.div
                    initial={{ x: -300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Button className={'w-full'}
                    onClick={() => setTab("Confirmed Bookings")}
                    variant={tab === "Confirmed Bookings" ? "secondary" : "outline"}
                    >
                      <CheckCircle className="size-4" />
                      Confirmed
                    </Button>
                  </motion.div>
        
                  <motion.div
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Button className={'w-full'}
                    onClick={() => setTab("Cancelled Bookings")}
                    variant={tab === "Cancelled Bookings" ? "secondary" : "outline"}>
                      <ClipboardX className="size-4" />
                      Cancelled
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
                    {tab === "Confirmed Bookings" && <ConfirmBookings/>}
                    {tab === "Cancelled Bookings" && <CancelledBookings/>}
                  </motion.div>
                  </AnimatePresence>
              </div>
    </>
  )
}

export default BookingsTab