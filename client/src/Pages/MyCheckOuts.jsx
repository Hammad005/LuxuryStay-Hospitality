import React, { useEffect } from "react";
import {
  ArrowLeft,
  ClipboardCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { checkOutStore } from "@/store/checkOutStore";

const MyCheckOuts = () => {
  const { userCheckOuts } = checkOutStore();
  const navigateTo = useNavigate();
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

  const getServicesTotal = (services) => {
    return services.reduce(
      (sum, item) => sum + (item?.service?.servicePrice || 0),
      0
    );
  };
  return (
    <>
      <div className="p-4 md:px-16 md:py-10 flex flex-col md:gap-8 gap-4 w-full min-h-screen z-10">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-accent/70 p-6 rounded-md border border-primary">
                <ArrowLeft
                            strokeWidth={1.5}
                            className="size-5.5 cursor-pointer mb-2"
                            onClick={() => navigateTo(-1)}
                          />
              <div className="flex flex-col items-center">
                <h1 className="font-semibold md:text-3xl text-2xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 uppercase">
                  <ClipboardCheck className="size-8 text-primary" /> My Check Outs
                </h1>
                <p className="text-base text-primary/80 mt-2 text-center max-w-xl">
                  Here you can view your check outs history.
                </p>
              </div>

              {userCheckOuts.length > 0 ? (
                userCheckOuts?.map((checkOut) => {
                  return (
                    <div
                      key={checkOut._id}
                      className="w-full p-4 bg-background/70 rounded-lg border border-primary/80 mt-3"
                    >
                      <p className="text-xs text-primary/80 text-center font-semibold lg:hidden mb-2">
                        Scroll right or left to view more details
                      </p>
                      <Table>
                        <TableHeader>
                          <TableRow
                            className={
                              "hover:bg-transparent md:border border-b border-primary"
                            }
                          >
                            <TableHead className={"text-primary"}>
                              Guests
                            </TableHead>
                            <TableHead className={"text-primary"}>
                              Check-In
                            </TableHead>
                            <TableHead className={"text-primary"}>
                              Check-Out
                            </TableHead>
                            <TableHead className={"text-primary"}>
                              Total Amount
                            </TableHead>
                            <TableHead className={"text-primary text-right"}>
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>{checkOut.numberOfGuests}</TableCell>
                            <TableCell>
                              {format(
                                checkOut.checkIn,
                                "dd-MM-yyyy / hh:mm aa"
                              )}
                            </TableCell>
                            <TableCell>
                              {format(
                                checkOut.createdAt,
                                "dd-MM-yyyy / hh:mm aa"
                              )}
                            </TableCell>
                            <TableCell>
                              Rs.{" "}
                              {checkOut.totalAmount +
                                getServicesTotal(checkOut?.servicesUsed)}
                              /-
                            </TableCell>
                            <TableCell className={"text-right"}>
                              <Button
                                variant={"secondary"}
                                onClick={() => {
                                  navigateTo(`/history/${checkOut._id}`);
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  );
                })
              ) : (
                <div className="w-full p-8 flex flex-col justify-center items-center gap-4">
                  <span className="text-lg uppercase font-black animate-pulse">
                    You have no check outs history yet.
                  </span>
                  <Button
                    variant={"secondary"}
                    className={"rounded-full text-xs px-8 py-5 uppercase"}
                    onClick={() => navigateTo("/reservation")}
                  >
                    Check In
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default MyCheckOuts;
