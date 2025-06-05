import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { serviceStore } from "@/store/serviceStore";
import { Loader2, Plus } from "lucide-react";
import { checkInStore } from "@/store/checkInStore";
import { useState } from "react";
const AddServiceToRoom = ({
  open,
  setOpen,
  select,
  setSelect,
  selectCheckIn,
  setSelectCheckIn,
}) => {
  const { services } = serviceStore();
  const { addService, checkInLoading } = checkInStore();

  const [data, setData] = useState({
    checkinId: selectCheckIn,
    roomId: select?._id,
    service: null,
  });
  useEffect(() => {
    setData({
      checkinId: selectCheckIn,
      roomId: select?._id,
      service: null,
    });
  }, [select, selectCheckIn]);
  

  const handleAddService = async (id) => {
      const newData = { ...data, service: id };
      setData(newData);
      addService(newData);
  };
  return (
    <>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
            <DialogDescription>
              Here you can add a service to a room, <br />
              Selected room: {select?.roomNumber}
            </DialogDescription>
          </DialogHeader>

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="md:text-5xl text-3xl font-bold font-serif uppercase text-primary text-center   text-shadow-md text-shadow-black"
          >
            Our Services
          </motion.h1>
          <div className="grid grid-cols-1  gap-4 h-[250px] overflow-auto">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              const initial = { opacity: 0, x: isEven ? -100 : 100 };
              return (
                <motion.div
                  key={service._id}
                  initial={initial}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-4 bg-background  rounded-lg border border-primary/80"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {service.serviceName}
                        
                      </h3>
                      <p className="text-primary/80 md:text-sm text-xs">
                        {service.serviceDescription}
                      </p>
                    </div>

                    <Button
                      size="icon"
                      className="text-background hover:text-background/80"
                      disabled={checkInLoading}
                      onClick={() => {
                        handleAddService(service._id);
                      }}
                    >
                      {checkInLoading && data.service === service._id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Plus />
                      )}
                    </Button>
                  </div>
                  <p className="md:text-6xl text-3xl font-bold  text-end mt-4 text-transparent [-webkit-text-stroke:1px_var(--primary)]">
                    Rs. {service.servicePrice}/-
                  </p>
                </motion.div>
              );
            })}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSelect(null);
                setSelectCheckIn(null);
                setOpen(false);
              }}
              disabled={checkInLoading}
            >
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddServiceToRoom;
