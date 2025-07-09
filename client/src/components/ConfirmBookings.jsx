import React, { useState } from "react";
import {
  BookCheck,
  CalendarIcon,
  CheckCircle,
  ChevronDownIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookingStore } from "@/store/bookingStore";
import { format } from "date-fns";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CancelBookingAlert from "./CancelBookingAlert";
import BookingCheckInAlert from "./BookingCheckInAlert";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { staffStore } from "@/store/staffStore";
import CancelBookingByStaff from "./CancelBookingByStaff";
import BookingCheckInByStaff from "./BookingCheckInByStaff";

const ConfirmBookings = () => {
  const { allBookings } = bookingStore();
  const { staff } = staffStore();
  const [selectBooking, setSelectBooking] = useState(null);
  const [open, setOpen] = useState(false);
  const [openCheckIn, setOpenCheckIn] = useState(false);
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

  // Helper to calculate taxes (12%)
  const getTaxes = (subtotal) => {
    return Math.round(subtotal * 0.12);
  };

  const [checkInDate, setCheckInDate] = useState(new Date());
  return (
    <>
      <BookingCheckInByStaff
        openCheckIn={openCheckIn}
        setOpenCheckIn={setOpenCheckIn}
        selectBooking={selectBooking}
        setSelectBooking={setSelectBooking}
      />
      <CancelBookingByStaff
        open={open}
        setOpen={setOpen}
        selectBooking={selectBooking}
        setSelectBooking={setSelectBooking}
      />
      <div className="bg-accent/70 p-6 rounded-md border border-primary flex flex-col items-center mt-5">
        <h1 className="font-semibold md:text-3xl text-2xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 uppercase">
          <CheckCircle className="size-8 text-primary" /> Confirmed Bookings
        </h1>
        <p className="text-base text-primary/80 mt-2 text-center max-w-xl">
          Here you can review and manage all confirmed bookings with ease.
        </p>

        <div className="flex justify-end w-full mt-2">
          <div>
            <h2 className="font-semiboldtext-shadow-md text-shadow-black font-serif uppercase">
              Check-In Date:
            </h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={
                    "rounded-md bg-transparent hover:bg-transparent border border-primary flex items-center justify-start w-full"
                  }
                >
                  <CalendarIcon
                    className={`mr-2 h-4 w-4 ${
                      checkInDate ? "text-foreground" : "text-muted-foreground"
                    }`}
                  />
                  {checkInDate ? (
                    <span className="text-foreground text-sm font-normal">
                      {format(checkInDate, "dd-MM-yyyy")}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm font-normal">
                      Check-In Date
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={(date) =>
                    setCheckInDate(date ? new Date(date) : null)
                  }
                  disabled={checkInDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {allBookings.filter((booking) => {
          const bookingDate = new Date(booking.checkIn);
          return (
            booking.bookingStatus === "Confirmed" &&
            bookingDate.getFullYear() === checkInDate.getFullYear() &&
            bookingDate.getMonth() === checkInDate.getMonth() &&
            bookingDate.getDate() === checkInDate.getDate()
          );
        }).length > 0 ? (
          allBookings
            .filter((booking) => {
              const bookingDate = new Date(booking.checkIn);
              return (
                booking.bookingStatus === "Confirmed" &&
                bookingDate.getFullYear() === checkInDate.getFullYear() &&
                bookingDate.getMonth() === checkInDate.getMonth() &&
                bookingDate.getDate() === checkInDate.getDate()
              );
            })
            ?.map((booking) => {
              const now = new Date();
              const checkInDate = new Date(booking.checkIn);
              const showCancel = now < checkInDate;
              return (
                <div
                  key={booking._id}
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
                          Booking-ID
                        </TableHead>
                        <TableHead className={"text-primary"}>Name</TableHead>
                        <TableHead className={"text-primary"}>Guests</TableHead>
                        <TableHead className={"text-primary"}>
                          Check-In
                        </TableHead>
                        <TableHead className={"text-primary"}>
                          Check-Out
                        </TableHead>
                        <TableHead className={"text-primary"}>
                          Booking-Time
                        </TableHead>
                        <TableHead className={"text-primary text-right"}>
                          Total Amount
                        </TableHead>
                        {(staff?.role === "Admin" ||
                          staff?.role === "General Manager" ||
                          staff?.role === "Receptionist") && (
                          <TableHead className={"text-primary text-right"}>
                            Action
                          </TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>#{booking._id.slice(-4)}</TableCell>
                        <TableCell>{booking.registeredGuest?.name}</TableCell>
                        <TableCell>{booking.numberOfGuests}</TableCell>
                        <TableCell>
                          {format(booking.checkIn, "dd-MM-yyyy / hh:mm aa")}
                        </TableCell>
                        <TableCell>
                          {format(booking.checkOut, "dd-MM-yyyy / hh:mm aa")}
                        </TableCell>
                        <TableCell>
                          {format(booking.createdAt, "dd-MM-yyyy / hh:mm aa")}
                        </TableCell>
                        <TableCell className={"text-right"}>
                          Rs. {booking.totalAmount}/-
                        </TableCell>
                        {(staff?.role === "Admin" ||
                          staff?.role === "General Manager" ||
                          staff?.role === "Receptionist") && (
                          <TableCell className={"text-right"}>
                            {showCancel ? (
                            <Button
                              variant={"secondary"}
                              onClick={() => {
                                setSelectBooking(booking);
                                setOpen(true);
                              }}
                            >
                              Cancel
                            </Button>
                            ) : (
                            <Button
                              variant={"secondary"}
                              onClick={() => {
                                setSelectBooking(booking);
                                setOpenCheckIn(true);
                              }}
                            >
                              Check In
                            </Button>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={
                            staff?.role === "Admin" ||
                            staff?.role === "General Manager" ||
                            staff?.role === "Receptionist"
                              ? 8
                              : 7
                          }
                          className={"p-0"}
                        >
                          <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                              <AccordionTrigger
                                icon={ChevronDownIcon}
                                label="Room Details & Billing"
                                value={`Rs. ${booking.totalAmount}/-`}
                                className="border-b rounded-none text-primary font-semibold"
                              />
                              <AccordionContent className={"border"}>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead
                                        className={
                                          "text-primary border border-primary"
                                        }
                                      >
                                        Room Number
                                      </TableHead>
                                      <TableHead
                                        className={
                                          "text-primary border border-primary"
                                        }
                                      >
                                        Room Floor
                                      </TableHead>
                                      <TableHead
                                        className={
                                          "text-primary border border-primary"
                                        }
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
                                    {booking.roomsId.map((room) => (
                                      <>
                                        <TableRow key={room._id}>
                                          <TableCell>
                                            {room.roomNumber}
                                          </TableCell>
                                          <TableCell>
                                            {room.roomFloor}
                                          </TableCell>
                                          <TableCell>{room.roomType}</TableCell>
                                          <TableCell className={"text-right"}>
                                            Rs. {room.roomPrice}/-
                                          </TableCell>
                                        </TableRow>
                                      </>
                                    ))}
                                    <TableRow>
                                      <TableCell colSpan={4}>
                                        <h3 className="font-semibold text-primary mb-1 md:text-lg text-sm">
                                          Total Price:
                                        </h3>
                                        <div className="flex flex-col gap-1">
                                          <div className="flex items-center justify-between">
                                            <span className="font-medium">
                                              Rooms Total:
                                            </span>
                                            <span>
                                              Rs.{" "}
                                              {getRoomsSubtotal(
                                                booking.roomsId
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between border-b">
                                            <span className="font-medium">
                                              Taxes (12%):
                                            </span>{" "}
                                            <span>
                                              <span className="text-sm pr-1 text-primary">
                                                +
                                              </span>
                                              Rs.{" "}
                                              {getTaxes(
                                                getRoomsSubtotal(
                                                  booking.roomsId
                                                )
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="font-medium">
                                              Subtotal:
                                            </span>{" "}
                                            <span>
                                              Rs.{" "}
                                              {(
                                                getRoomsSubtotal(
                                                  booking.roomsId
                                                ) +
                                                getTaxes(
                                                  getRoomsSubtotal(
                                                    booking.roomsId
                                                  )
                                                )
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                          <div className="flex items-center justify-between border-b">
                                            <span className="font-medium">
                                              Total Nights:
                                            </span>{" "}
                                            <span>
                                              <span className="text-sm pr-1 text-primary">
                                                x
                                              </span>
                                              {getTotalNights(
                                                booking.checkIn,
                                                booking.checkOut
                                              )}
                                            </span>
                                          </div>
                                          <div className="font-bold text-primary text-lg flex items-center justify-between">
                                            <p>Total Amount:</p>
                                            <p>
                                              Rs.{" "}
                                              {booking.totalAmount.toFixed(2)}
                                            </p>
                                          </div>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
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
              No bookings found on the selected date.
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmBookings;
