import { BedDouble, NotebookTabs, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from './ui/button';
import RoomsDetails from './RoomsDetails';
import AddNewRoom from './AddNewRoom';
import { staffStore } from '@/store/staffStore';

const RoomsTab = () => {
  const {staff} = staffStore();
  const [tab, setTab] = useState("Rooms Details");
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
              <BedDouble className="size-7 text-primary" /> Rooms
            </h2>
            <p className="text-sm text-primary/80">
              This is the rooms tab where you can view rooms available and their
              details.
            </p>
            {(staff?.role === "Admin" || staff?.role === "General Manager") && <div className="grid grid-cols-2 gap-4 mt-4">
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button className={'w-full'}
                onClick={() => setTab("Rooms Details")}
                variant={tab === "Rooms Details" ? "secondary" : "outline"}
                >
                  <NotebookTabs className="size-4" />
                  Rooms Details
                </Button>
              </motion.div>
    
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Button className={'w-full'}
                onClick={() => setTab("Add New Room")}
                variant={tab === "Add New Room" ? "secondary" : "outline"}>
                  <Plus className="size-4" />
                  Add New Room
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
                {tab === "Rooms Details" && <RoomsDetails/>}
                {tab === "Add New Room" && <AddNewRoom/>}
              </motion.div>
              </AnimatePresence>
          </div>
    </>
  )
}

export default RoomsTab