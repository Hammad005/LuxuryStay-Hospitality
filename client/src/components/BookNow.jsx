import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { roomStore } from "@/store/roomStore";
import standard from "../assets/rooms/standard.jpg";
import premium from "../assets/rooms/premium.jpg";
import suite from "../assets/rooms/suite.jpg";
import business from "../assets/rooms/Business-Oriented.png";
import { Input } from "@/components/ui/input";
import { DateTime } from "@/components/ui/dateTime";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarIcon, CreditCard, Info, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { bookingStore } from "@/store/bookingStore";

const BookNow = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { rooms } = roomStore();
  const { createBooking, bookingLoading, resetSuccess} = bookingStore();
  const uniqueRooms = [
    ...new Map(
      rooms.map((room) => [`${room.roomType}-${room.roomPrice}`, room])
    ).values(),
  ];

  const [data, setData] = useState({
    numberOfGuests: null,
    checkIn: "",
    checkOut: "",
    roomsId: [],
    totalAmount: null,
  });
  const [cardData, setCardData] = useState({
    cardNumber: "",
    monthYear: "",
    securityCode: "",
  });
  const [selectedRoomType, setSelectedRoomType] = useState(["Standard"]);
  const [errors, setErrors] = useState({});
  const navigateTo = useNavigate()

  const handleToggle = (type) => {
    if (selectedRoomType.includes(type)) {
      if (selectedRoomType.length > 1) {
        setSelectedRoomType(
          selectedRoomType.filter((roomType) => roomType !== type)
        );
      }
    } else {
      setSelectedRoomType([...selectedRoomType, type]);
    }
  };

  const isNumericString = (value) => {
    return typeof value === "string" && !isNaN(Number(value));
  };

  const [randomRoom, setRandomRoom] = useState({});
  const [availRoom, setAvailRoom] = useState([]);

  const getAvailableRoom = (type, nor) => {
    //check the user is writing a number or not
    if (!isNumericString(nor)) {
      setErrors((prev) => ({
        ...prev,
        [`roomsId_${type}`]: "Please enter a valid number",
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        [`roomsId_${type}`]: "",
      }));
    }
    const numberOfRooms = Number(nor);
    const availableRooms = rooms
      .filter(
        (room) => room.roomType === type && room.roomStatus === "Available"
      )
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfRooms);

    setAvailRoom((prev) => {
      const existingIds = new Set(prev.map((room) => room._id));
      const newRooms = availableRooms.filter(
        (room) => !existingIds.has(room._id)
      );
      return [...prev, ...newRooms];
    });

    setRandomRoom((prev) => ({
      ...prev,
      [type]: numberOfRooms,
    }));

    const gettingIds = availableRooms.map((room) => room._id);
    if (numberOfRooms > availableRooms.length) {
      setErrors((prev) => ({
        ...prev,
        [`roomsId_${type}`]: `Not enough available rooms`,
      }));
    }

    setData((prev) => ({
      ...prev,
      roomsId: [
        ...prev.roomsId.filter((id) => {
          const room = rooms.find((r) => r._id === id);
          return room && room.roomType !== type;
        }),
        ...gettingIds,
      ],
    }));
  };

  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [nightState, setNightState] = useState(0);

  useEffect(() => {
    let totalRoomPrice = 0;
    data.roomsId.forEach((roomId) => {
      const room = rooms.find((r) => r._id === roomId);
      if (room) totalRoomPrice += Number(room.roomPrice);
    });

    let nights = 0;
    if (data.checkIn && data.checkOut) {
      const inDate = new Date(data.checkIn);
      const outDate = new Date(data.checkOut);
      const diffMs = outDate - inDate;
      const diffHrs = diffMs / (1000 * 60 * 60);

      // ✅ If less than 24 hours, count as 0 nights
      // ✅ Else, calculate full nights
      if (diffHrs >= 24) {
        nights = Math.floor(diffHrs / 24);
      } else {
        nights = 0;
      }
    }

    const computedNight = nights;
    const computedSubtotal = totalRoomPrice;
    const computedTaxes = computedSubtotal * 0.12;
    const computedTotal = computedNight > 0 ? (computedSubtotal + computedTaxes) * computedNight : computedSubtotal + computedTaxes

    setNightState(computedNight);
    setSubtotal(computedSubtotal);
    setTaxes(computedTaxes);
    setTotal(computedTotal);

    setData((prev) => ({ ...prev, totalAmount: computedTotal }));
  }, [data.roomsId, data.checkIn, data.checkOut, rooms]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Check if user selected a room type but did not enter how many rooms for each type
    selectedRoomType.forEach((type) => {
      const hasRoom = rooms.some(
        (r) => r.roomType === type && data.roomsId.includes(r._id)
      );
      if (!hasRoom) {
        newErrors[`roomsId_${type}`] = `Please select at least one room.`;
      }
    });

    const uniqueTypes = [...new Set(availRoom.map((room) => room.roomType))];

    uniqueTypes.forEach((type) => {
      if (
        (randomRoom[type] || 0) >
        availRoom.filter((room) => room.roomType === type).length
      ) {
        newErrors[`roomsId_${type}`] = "Not enough available rooms";
      }
    });

    if (!data.numberOfGuests) {
      newErrors.numberOfGuests = "Number of Guests is required.";
    }

    if (!data.checkIn) {
      newErrors.checkIn = "Check-in date and time is required.";
    }

    if (!data.checkOut) {
      newErrors.checkOut = "Check-out date and time is required.";
    }

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
      const response = await createBooking(data);
      if (response.success) {
        resetSuccess();
        navigateTo('/guestDetails/My-Bookings')
      }
    }
  };

  return (
    <>
      <div className="p-4 md:p-16 flex flex-col min-h-screen z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:text-5xl text-4xl font-bold font-serif uppercase text-primary text-center   text-shadow-md text-shadow-black"
        >
          Book Now
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:text-sm text-xs font-semibold text-white text-center md:w-2/3 md:mx-auto md:px-0 px-4 mb-10"
        >
          Choose the best room for you and book now for a hassle-free stay, Your
          comfort is our priority, and we're here to make your stay
          unforgettable.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold md:text-lg text-sm">
              Choose Your Room Type:
            </h3>
            <Link
              to="/discoverRooms"
              className="text-primary flex items-center border-b border-white md:text-sm text-xs"
            >
              Read More <ArrowRight className="size-5 pt-1" />
            </Link>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full">
            {uniqueRooms.map((room) => (
              <div
                key={room.roomType}
                className={`rounded-md border  cursor-pointer h-fit
                ${
                  selectedRoomType.includes(room.roomType)
                    ? errors[`roomsId_${room.roomType}`]
                      ? "border-3 border-red-600"
                      : "border-3 border-primary"
                    : ""
                }
                `}
              >
                <div
                  onClick={() => {
                    handleToggle(room.roomType);
                  }}
                >
                  <div className="h-[200px] w-full  overflow-hidden rounded-t-md">
                    <img
                      src={
                        (room.roomType === "Standard" && standard) ||
                        (room.roomType === "Premium" && premium) ||
                        (room.roomType === "Suite" && suite) ||
                        (room.roomType === "Business-Oriented" && business)
                      }
                      alt={room.roomType}
                      className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <h3 className="md:text-2xl text-sm font-semibold text-primary text-shadow-md text-shadow-black">
                      {room.roomType === "Business-Oriented"
                        ? "Business"
                        : room.roomType}
                    </h3>
                    <p className="md:text-xl text-xs font-bold  text-end flex flex-col">
                      Rs. {room.roomPrice}/-
                      <span className="text-xs">per night</span>
                    </p>
                  </div>
                </div>
                {selectedRoomType.includes(room.roomType) && (
                  <div className="flex flex-col gap-1 p-2">
                    <Input
                      type="text"
                      name="numberOfRooms"
                      placeholder={"How many rooms?"}
                      onChange={(e) => {
                        getAvailableRoom(room.roomType, e.target.value);
                      }}
                    />
                    {errors[`roomsId_${room.roomType}`] && (
                      <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                        <Info className="size-[0.75rem]" />{" "}
                        {errors[`roomsId_${room.roomType}`]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-3">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold  mb-1 md:text-lg text-sm">
                Number of Guests:
              </h3>
              <Input
                type="text"
                name="numberofGuests"
                placeholder="Number of Guests"
                value={data.numberOfGuests}
                onChange={(e) => {
                  let val = e.target.value.replace(/[^0-9]/g, "");
                  setData((prev) => ({
                    ...prev,
                    numberOfGuests: val,
                  }));
                }}
              />
              {errors.numberOfGuests && (
                <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                  <Info className="size-[0.75rem]" /> {errors.numberOfGuests}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold  mb-1 md:text-lg text-sm">
                Check-in Date and Time:
              </h3>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={
                        "rounded-md bg-transparent hover:bg-transparent border flex items-center justify-start w-full"
                      }
                    >
                      <CalendarIcon
                        className={`mr-2 h-4 w-4 ${
                          data.checkIn
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                      {data.checkIn ? (
                        <span className="text-foreground text-sm font-normal">
                          {format(data.checkIn, "dd-MM-yyyy / hh:mm aa")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm font-normal">
                          Check-in Date and Time
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateTime
                      mode="single"
                      selected={data.checkIn}
                      onSelect={(date) =>
                        setData((prev) => ({ ...prev, checkIn: date }))
                      } // date is full JS Date obj with time
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        date >
                          new Date(
                            new Date().setMonth(new Date().getMonth() + 1)
                          )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setData((prev) => ({ ...prev, checkIn: null }));
                  }}
                  variant={"secondary"}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  Reset
                </Button>
              </div>
              {errors.checkIn && (
                <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                  <Info className="size-[0.75rem]" /> {errors.checkIn}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold  mb-1 md:text-lg text-sm">
                Check-out Date and Time:
              </h3>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={
                        "rounded-md bg-transparent hover:bg-transparent border flex items-center justify-start w-full"
                      }
                    >
                      <CalendarIcon
                        className={`mr-2 h-4 w-4 ${
                          data.checkOut
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      />
                      {data.checkOut ? (
                        <span className="text-foreground text-sm font-normal">
                          {format(data.checkOut, "dd-MM-yyyy / hh:mm aa")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm font-normal">
                          Check-out Date and Time
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DateTime
                      mode="single"
                      selected={data.checkOut}
                      onSelect={(date) =>
                        setData((prev) => ({ ...prev, checkOut: date }))
                      } // date is full JS Date obj with time
                      disabled={(date) =>
                        !data.checkIn || date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setData((prev) => ({ ...prev, checkOut: null }));
                  }}
                  variant={"secondary"}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2"
                >
                  Reset
                </Button>
              </div>
              {errors.checkOut && (
                <p className="text-red-600 text-xs flex gap-1 items-center font-semibold">
                  <Info className="size-[0.75rem]" /> {errors.checkOut}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-3 mt-3 ">
            <div className="flex flex-col gap-2 w-full">
              <h3 className="font-semibold  mb-1 md:text-lg text-sm">
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
                      <Info className="size-[0.75rem]" /> {errors.monthYear}
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
                      <Info className="size-[0.75rem]" /> {errors.securityCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col gap-2 md:w-1/2 border ${
                total && "border-primary"
              } rounded-md p-4`}
            >
              <h3 className="font-semibold  mb-1 md:text-lg text-sm">
                Total Price:
              </h3>
              <div className="text-right ">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Rooms Total:</p>
                  <p>Rs. {subtotal.toFixed(2)}</p>
                </div>
                <div className="border-b pb-1 flex items-center justify-between">
                  <p className="font-medium">Taxes (12%):</p>
                  <p><span className="text-sm pr-1 text-primary">+</span>Rs. {taxes.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium">Subtotal:</p>{" "}
                  <p>Rs. {(subtotal + taxes).toFixed(2)}</p>
                </div>
                <div className="border-b pb-1 flex items-center justify-between">
                  <p className="font-medium">Total Nights:</p>{" "}
                  <p><span className="text-sm pr-1 text-primary">x</span>{nightState}</p>
                </div>
                
                
                <div className="font-bold text-primary text-lg flex items-center justify-between">
                  <p>Total Amount:</p>
                  <p>Rs. {total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:mt-12 mt-6 flex justify-center">
            <Button
              type="submit"
              variant={"secondary"}
              className={"md:w-1/3 w-full"}
              disabled={bookingLoading}
            >
              {
                bookingLoading ? <Loader2 className="animate-spin"/> : "Book Now"
              }
            </Button>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default BookNow;
