import { checkInStore } from "@/store/checkInStore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronDownIcon,
  ClipboardCheck,
  CreditCard,
  Info,
  Loader,
  Loader2,
} from "lucide-react";
import { guestStore } from "@/store/guestStore";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { checkOutStore } from "@/store/checkOutStore";

const CheckOutHistory = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { id } = useParams();
  const { guest } = guestStore();
  const { userCheckOuts } = checkOutStore();
  const navigateTo = useNavigate();
  const [checkOutData, setCheckOutData] = useState(
    userCheckOuts?.find((checkOut) => checkOut._id === id)
  );
  useEffect(() => {
    setCheckOutData(userCheckOuts?.find((checkOut) => checkOut._id === id));
  }, [userCheckOuts, id]);
  const getTotalNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate - inDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    // If less than 24 hours, return 0 nights
    return diffDays < 1 ? 0 : Math.floor(diffDays);
  };
  const getRoomsSubtotal = (rooms) => {
    return rooms.reduce((sum, room) => sum + room.roomPrice, 0);
  };

  const getServicesTotal = (services) => {
    return services.reduce(
      (sum, item) => sum + (item?.service?.servicePrice || 0),
      0
    );
  };

  // Helper to calculate taxes (12%)
  const getTaxes = (subtotal) => {
    return Math.round(subtotal * 0.12);
  };
  const nights = getTotalNights(checkOutData?.checkIn, checkOutData?.createdAt);
  
  return (
    <>
      <div className="p-4 flex flex-col items-center md:gap-8 gap-4 w-full min-h-screen z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-background lg:w-[80%] md:w-[90%] w-full p-6 rounded-md border border-primary flex flex-col"
        >
          <ArrowLeft
            strokeWidth={1.5}
            className="size-5.5 cursor-pointer"
            onClick={() => navigateTo(-1)}
          />

          <h1 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 uppercase mt-4">
            <ClipboardCheck className="size-8 text-primary" /> Check Out
          </h1>
          <p className="md:text-sm text-xs text-primary/60 pt-1">
            Thank you for staying with us. Below is your check-out summary,
            detailing your stay and associated charges.
          </p>
          <div className="border-t border-white border-dashed divide-dashed my-4" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Name:</h3>
              <p className="text-primary text-sm md:text-base">{guest?.name}</p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Number of Guests:</h3>
              <p className="text-primary text-sm md:text-base">
                {checkOutData?.numberOfGuests}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Check In:</h3>
              <p className="text-primary text-sm md:text-base">
                {format(new Date(checkOutData?.checkIn), "dd-MM-yyyy / hh:mm aa")}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Check Out:</h3>
              <p className="text-primary text-sm md:text-base">
                {format(new Date(checkOutData?.createdAt), "dd-MM-yyyy / hh:mm aa")}
              </p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  icon={ChevronDownIcon}
                  label="Total Rooms"
                  value={checkOutData?.roomsId.length}
                  className="border border-dashed border-white rounded-none sm:text-base text-[10px] flex items-center font-bold mb-2 bg-accent/70"
                />
                <AccordionContent className={"border border-primary p-0"}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          className={"text-primary border border-primary"}
                        >
                          Room Number
                        </TableHead>
                        <TableHead
                          className={"text-primary border border-primary"}
                        >
                          Room Floor
                        </TableHead>
                        <TableHead
                          className={"text-primary border border-primary"}
                        >
                          Room Type
                        </TableHead>
                        <TableHead
                          className={
                            "text-primary text-right border border-primary"
                          }
                        >
                          Room Price
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {checkOutData?.roomsId.map((room) => (
                        <>
                          <TableRow
                            key={room._id}
                            className={"border-none bg-accent hover:bg-accent"}
                          >
                            <TableCell>{room.roomNumber}</TableCell>
                            <TableCell>{room.roomFloor}</TableCell>
                            <TableCell>{room.roomType}</TableCell>
                            <TableCell className={"text-right"}>
                              Rs. {room.roomPrice}/-
                            </TableCell>
                          </TableRow>
                          {checkOutData?.servicesUsed?.filter(
                            (service) => service.room === room._id
                          )?.length > 0 && (
                            <TableRow key={room._id}>
                              <TableCell colSpan={4}>
                                <h3 className="text-primary font-semibold">
                                  Services:
                                </h3>
                                <div className="flex flex-col gap-2 mt-2">
                                  {checkOutData?.servicesUsed
                                    ?.filter(
                                      (service) => service.room === room._id
                                    )
                                    ?.map((service) => (
                                      <div
                                        key={service._id}
                                        className="flex justify-between items-center"
                                      >
                                        <p className="text-sm">
                                          {service.service.serviceName}:
                                        </p>
                                        <p className="text-sm text-primary">
                                          Rs. {service.service.servicePrice}/-
                                        </p>
                                      </div>
                                    ))}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Rooms Total:</h3>
              <p className="text-primary text-sm md:text-base">
                Rs. {getRoomsSubtotal(checkOutData?.roomsId).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-base font-semibold">Taxes (12%):</h3>
              <p className="text-primary text-sm md:text-base">
                <span className="text-sm pr-1 text-white">+</span>
                Rs. {getTaxes(getRoomsSubtotal(checkOutData?.roomsId)).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Subtotal:</h3>
              <p className="text-primary text-sm md:text-base">
                Rs.{" "}
                {(
                  getRoomsSubtotal(checkOutData?.roomsId) +
                  getTaxes(getRoomsSubtotal(checkOutData?.roomsId))
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-base font-semibold">Nights:</h3>
              <p className="text-primary text-sm md:text-base">
                <span className="text-sm pr-1 text-white">x</span>
                {getTotalNights(checkOutData?.checkIn, checkOutData?.createdAt)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">
                Total:
              </h3>
              <p className="text-primary text-sm md:text-base">
                Rs.{" "}
                {(nights > 0
                  ? (getRoomsSubtotal(checkOutData?.roomsId) +
                      getTaxes(getRoomsSubtotal(checkOutData?.roomsId))) *
                    getTotalNights(checkOutData?.checkIn, checkOutData?.createdAt)
                  : getRoomsSubtotal(checkOutData?.roomsId) +
                    getTaxes(getRoomsSubtotal(checkOutData?.roomsId))
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center ">
              <h3 className="text-base font-bold">
                Services:
              </h3>
              <p className="text-primary text-sm md:text-base font-bold">
                <span className="text-sm pr-1 text-white">+</span>
                Rs. {getServicesTotal(checkOutData?.servicesUsed).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-y-2 py-4 border-primary border-dashed">
              <h3 className="text-base font-bold">Grand Total:</h3>
              <p className="text-primary text-lg  font-bold">
                Rs.{" "}
                {(
                  checkOutData?.totalAmount +
                  getServicesTotal(checkOutData?.servicesUsed)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CheckOutHistory;
