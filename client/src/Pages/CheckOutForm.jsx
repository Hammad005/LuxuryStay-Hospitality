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

const CheckOutForm = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { userCheckIns } = checkInStore();
  const { id } = useParams();
  const { guest } = guestStore();
  const { createCheckOut, checkOutLoading, resetSuccess } = checkOutStore();
  const navigateTo = useNavigate();
  const [checkInData, setCheckInData] = useState(
    userCheckIns?.find((checkIn) => checkIn._id === id)
  );
  useEffect(() => {
    setCheckInData(userCheckIns?.find((checkIn) => checkIn._id === id));
  }, [userCheckIns, id]);
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
  const nights = getTotalNights(checkInData?.createdAt, checkInData?.checkOut);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    monthYear: "",
    securityCode: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInData?.servicesUsed.length > 0) {
      const newErrors = {};

      if (!cardData.cardNumber) {
        newErrors.cardNumber = "Card number is required.";
      } else if (cardData.cardNumber.length < 19) {
        newErrors.cardNumber = "Please enter a valid card number.";
      }

      if (!cardData.monthYear) {
        newErrors.monthYear = "Month and year is required.";
      } else if (cardData.monthYear.length < 5) {
        newErrors.monthYear = "Please enter a valid month and year.";
      }

      if (!cardData.securityCode) {
        newErrors.securityCode = "Security code is required.";
      } else if (cardData.securityCode.length < 3) {
        newErrors.securityCode = "Please enter a valid security code.";
      }
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const response = await createCheckOut({
          _id: checkInData?._id,
          numberOfGuests: checkInData?.numberOfGuests,
          checkIn: checkInData?.createdAt,
          roomsId: checkInData?.roomsId,
          servicesUsed: checkInData?.servicesUsed,
          totalAmount: checkInData?.totalAmount,
        });
        if (response?.success) {
          navigateTo("/guestDetails/My-CheckIns");
          resetSuccess();
        }
      }
    }else {
      const response = await createCheckOut({
          _id: checkInData?._id,
          numberOfGuests: checkInData?.numberOfGuests,
          checkIn: checkInData?.createdAt,
          roomsId: checkInData?.roomsId,
          servicesUsed: checkInData?.servicesUsed,
          totalAmount: checkInData?.totalAmount,
        });
        if (response?.success) {
          navigateTo("/guestDetails/My-CheckIns");
          resetSuccess();
        }
    }
  };
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
            onClick={() => navigateTo("/guestDetails/My-CheckIns")}
          />

          <h1 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 uppercase mt-4">
            <ClipboardCheck className="size-8 text-primary" /> Check Out
          </h1>
          <p className="md:text-sm text-xs text-primary/60 pt-1">
            Thank you for staying with us. Below is your check-out summary,
            detailing your stay and associated charges. Kindly settle any
            outstanding dues to proceed with the check-out process.
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
                {checkInData?.numberOfGuests}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Check In:</h3>
              <p className="text-primary text-sm md:text-base">
                {format(
                  new Date(checkInData?.createdAt),
                  "dd-MM-yyyy / hh:mm aa"
                )}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Check Out:</h3>
              <p className="text-primary text-sm md:text-base">
                {format(new Date(), "dd-MM-yyyy / hh:mm aa")}
              </p>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  icon={ChevronDownIcon}
                  label="Total Rooms"
                  value={checkInData?.roomsId.length}
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
                      {checkInData?.roomsId.map((room) => (
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
                          {checkInData?.servicesUsed?.filter(
                            (service) => service.room === room._id
                          )?.length > 0 && (
                            <TableRow key={room._id}>
                              <TableCell colSpan={4}>
                                <h3 className="text-primary font-semibold">
                                  Services:
                                </h3>
                                <div className="flex flex-col gap-2 mt-2">
                                  {checkInData?.servicesUsed
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
                Rs. {getRoomsSubtotal(checkInData.roomsId).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-base font-semibold">Taxes (12%):</h3>
              <p className="text-primary text-sm md:text-base">
                <span className="text-sm pr-1 text-white">+</span>
                Rs. {getTaxes(getRoomsSubtotal(checkInData.roomsId)).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Subtotal:</h3>
              <p className="text-primary text-sm md:text-base">
                Rs.{" "}
                {(
                  getRoomsSubtotal(checkInData.roomsId) +
                  getTaxes(getRoomsSubtotal(checkInData.roomsId))
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-base font-semibold">Nights:</h3>
              <p className="text-primary text-sm md:text-base">
                <span className="text-sm pr-1 text-white">x</span>
                {getTotalNights(checkInData.createdAt, checkInData.checkOut)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">
                Total:
                <span className="text-xs pl-1 text-primary/80">(Paid)</span>
              </h3>
              <p className="text-primary text-sm md:text-base">
                Rs.{" "}
                {(nights > 0
                  ? (getRoomsSubtotal(checkInData.roomsId) +
                      getTaxes(getRoomsSubtotal(checkInData.roomsId))) *
                    getTotalNights(checkInData.createdAt, checkInData.checkOut)
                  : getRoomsSubtotal(checkInData.roomsId) +
                    getTaxes(getRoomsSubtotal(checkInData.roomsId))
                ).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center ">
              <h3 className="text-base font-bold">
                Services:
                {checkInData?.servicesUsed.length > 0 && (
                  <span className="text-xs pl-1 text-red-600">(Unpaid)</span>
                )}
              </h3>
              <p className="text-primary text-sm md:text-base font-bold">
                <span className="text-sm pr-1 text-white">+</span>
                Rs. {getServicesTotal(checkInData?.servicesUsed).toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center border-y-2 py-4 border-primary border-dashed">
              <h3 className="text-base font-bold">Grand Total:</h3>
              <p className="text-primary text-lg  font-bold">
                Rs.{" "}
                {(
                  checkInData?.totalAmount +
                  getServicesTotal(checkInData?.servicesUsed)
                ).toFixed(2)}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 w-full">
                {checkInData?.servicesUsed.length > 0 && (
                  <>
                    <h3 className="font-bold  mb-1 text-base">
                      Enter your card details:
                    </h3>
                    <div className="relative flex items-center gap-2">
                      <Input
                        type="text"
                        className="w-full pl-10"
                        placeholder="Card Number"
                        value={cardData.cardNumber}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, ""); // keep digits only
                          val = val.substring(0, 16); // max 16 digits
                          let formatted = val.match(/.{1,4}/g)?.join("-") || ""; // group into chunks of 4
                          setCardData({
                            ...cardData,
                            cardNumber: formatted,
                          });
                        }}
                      />
                      <Info
                        className="cursor-pointer text-muted-foreground hover:text-primary"
                        onClick={() =>
                          toast.info("Accepted Cards: Visa, Mastercard, Amex")
                        }
                      />
                      <div className="absolute top-2 left-2">
                        <CreditCard className="text-muted-foreground" />
                      </div>
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                        <Info className="size-[0.75rem]" /> {errors.cardNumber}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-1 w-full">
                        <Input
                          type="text"
                          className="w-full"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={cardData.monthYear}
                          onChange={(e) => {
                            let val = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
                            if (val.length >= 3) {
                              val = val.slice(0, 2) + "/" + val.slice(2, 4);
                            }
                            setCardData({
                              ...cardData,
                              monthYear: val,
                            });
                          }}
                        />
                        {errors.monthYear && (
                          <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                            <Info className="size-[0.75rem]" />{" "}
                            {errors.monthYear}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between gap-2 w-full">
                          <Input
                            type="password"
                            className="w-full"
                            placeholder="Security Code"
                            maxLength={3}
                            value={cardData.securityCode}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
                              val = val.slice(0, 3);
                              setCardData({
                                ...cardData,
                                securityCode: val,
                              });
                            }}
                          />
                          <Info
                            className="cursor-pointer text-muted-foreground hover:text-primary size-6.5"
                            onClick={() =>
                              toast.info(
                                "The security code is the 3 digits on the back of your card"
                              )
                            }
                          />
                        </div>

                        {errors.securityCode && (
                          <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                            <Info className="size-[0.75rem]" />{" "}
                            {errors.securityCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-center items-center">
                  <Button
                    type="submit"
                    className="mt-4 md:w-1/4 w-full"
                    variant={"secondary"}
                    disabled={checkOutLoading}
                  >
                    {checkOutLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <ClipboardCheck /> Check Out
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CheckOutForm;
