import React, { useState } from "react";
import { BadgeCheck, BookCheck, ChevronDownIcon, ClipboardCheck } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { checkInStore } from "@/store/checkInStore";
import AddServiceToRoom from "./AddServiceToRoom";

const AllCheckIns = () => {
  const { allCheckIns } = checkInStore();
  const navigateTo = useNavigate();
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

  return (
    <>
      <div className="bg-accent/70 p-6 rounded-md border border-primary mt-4">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold md:text-3xl text-2xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 uppercase">
          <BadgeCheck className="size-8 text-primary" /> CheckIns
        </h1>
        <p className="text-base text-primary/80 mt-2 text-center max-w-xl">
          Here you can view all confirmed check-ins.
        </p>
      </div>

        {allCheckIns.length > 0 ? (
          allCheckIns?.map((checkIn) => {
            return (
              <div
                key={checkIn._id}
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
                      <TableHead className={"text-primary"}>Name</TableHead>
                      <TableHead className={"text-primary"}>Guests</TableHead>
                      <TableHead className={"text-primary"}>Check-In</TableHead>
                      <TableHead className={"text-primary"}>
                        Check-Out
                      </TableHead>
                      <TableHead className={"text-primary text-right"}>
                        Total Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>{checkIn.registeredGuest.name}</TableCell>
                      <TableCell>{checkIn.numberOfGuests}</TableCell>
                      <TableCell>
                        {format(checkIn.createdAt, "dd-MM-yyyy / hh:mm aa")}
                      </TableCell>
                      <TableCell>
                        {format(checkIn.checkOut, "dd-MM-yyyy / hh:mm aa")}
                      </TableCell>
                      <TableCell className={"text-right"}>
                        Rs.{" "}
                        {checkIn.totalAmount +
                          getServicesTotal(checkIn?.servicesUsed)}
                        /-
                      </TableCell>
                      
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={7} className={"p-0"}>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger
                              icon={ChevronDownIcon}
                              label="Room Details & Billing"
                              value={`Rs. ${
                                checkIn.totalAmount +
                                getServicesTotal(checkIn?.servicesUsed)
                              }/-`}
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
                                  {checkIn.roomsId.map((room) => (
                                    <>
                                      <TableRow key={room._id}>
                                        <TableCell>{room.roomNumber}</TableCell>
                                        <TableCell>{room.roomFloor}</TableCell>
                                        <TableCell>{room.roomType}</TableCell>
                                        <TableCell className={"text-right"}>
                                          Rs. {room.roomPrice}/-
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  ))}
                                  <TableRow>
                                    <TableCell colSpan={4}>
                                      <h3 className="font-semibold  mb-1 md:text-lg text-sm">
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
                                              checkIn.roomsId
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
                                              getRoomsSubtotal(checkIn.roomsId)
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
                                                checkIn.roomsId
                                              ) +
                                              getTaxes(
                                                getRoomsSubtotal(
                                                  checkIn.roomsId
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
                                              checkIn.createdAt,
                                              checkIn.checkOut
                                            )}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium">
                                            Total:
                                            <span className="text-xs pl-1 text-primary/80">
                                              (Paid)
                                            </span>
                                          </span>{" "}
                                          <span>
                                            Rs.{" "}
                                            {(getTotalNights(
                                              checkIn.createdAt,
                                              checkIn.checkOut
                                            ) > 0
                                              ? (getRoomsSubtotal(
                                                  checkIn.roomsId
                                                ) +
                                                  getTaxes(
                                                    getRoomsSubtotal(
                                                      checkIn.roomsId
                                                    )
                                                  )) *
                                                getTotalNights(
                                                  checkIn.createdAt,
                                                  checkIn.checkOut
                                                )
                                              : getRoomsSubtotal(
                                                  checkIn.roomsId
                                                ) +
                                                getTaxes(
                                                  getRoomsSubtotal(
                                                    checkIn.roomsId
                                                  )
                                                )
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between border-b">
                                          <span className="font-medium">
                                            Services:
                                            <span className="text-xs pl-1 text-red-600">
                                              (Unpaid)
                                            </span>
                                          </span>{" "}
                                          <span>
                                            <span className="text-sm pr-1 text-primary">
                                              +
                                            </span>
                                            Rs.{" "}
                                            {getServicesTotal(
                                              checkIn?.servicesUsed
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                        <div className="font-bold text-primary text-lg flex items-center justify-between">
                                          <p>Grand Total:</p>
                                          <p>
                                            Rs.{" "}
                                            {(
                                              checkIn.totalAmount +
                                              getServicesTotal(
                                                checkIn?.servicesUsed
                                              )
                                            ).toFixed(2)}
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
              You have no check-ins yet.
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
    </>
  );
};

export default AllCheckIns;
