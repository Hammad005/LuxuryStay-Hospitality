import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";
import { bookingStore } from "@/store/bookingStore";
import { checkInStore } from "@/store/checkInStore";
import { staffStore } from "@/store/staffStore";
import { checkOutStore } from "@/store/checkOutStore";
import { RevenueChart } from "./RevenueChart";
import { NormalCalendar } from "./ui/normal-calendar";
import { DigitalClock } from "./ui/DigitalClock";
const DashboardTab = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { allBookings } = bookingStore();
  const { allCheckIns } = checkInStore();
  const { allCheckOuts } = checkOutStore();
  const { staff } = staffStore();

  const allBookingPayments = allBookings?.reduce(
    (total, booking) => total + booking.totalAmount,
    0
  );
  const allCheckInsPayments = allCheckIns?.reduce(
    (total, checkIn) => total + checkIn.totalAmount,
    0
  );
  const allCheckOutsPayments = allCheckOuts?.reduce(
    (total, checkOut) => total + checkOut.totalAmount,
    0
  );

  const getServicesTotal = (services) => {
    return services.reduce(
      (sum, item) => sum + (item?.service?.servicePrice || 0),
      0
    );
  };
  const allServicesUsed = allCheckOuts?.reduce(
    (total, checkOut) => total + getServicesTotal(checkOut.servicesUsed),
    0
  );

  const totalRevenue =
    allBookingPayments +
    allCheckInsPayments +
    allCheckOutsPayments +
    allServicesUsed;

  function formatNumber(num) {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2).replace(/\.0$/, "") + "T";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2).replace(/\.0$/, "") + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2).replace(/\.0$/, "") + "M";
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2).replace(/\.0$/, "") + "K";
    } else {
      return num.toString();
    }
  }

  return (
    <>
      <div className="flex flex-col w-full bg-accent border border-primary rounded-lg p-4">
        <h2 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2">
          <LayoutDashboard className="size-7 text-primary" /> Dashboard
        </h2>
        <p className="text-sm text-primary/80">
          This is the dashboard tab where you can view your data and statistics.
        </p>
        <div className="flex md:flex-row flex-col  gap-4 my-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-background  rounded-lg border border-primary/80 w-full"
          >
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-primary/80 text-xs">
              Here you can see the total number of today's bookings made.
            </p>
            <p className="text-7xl font-bold  text-end mt-4 text-transparent [-webkit-text-stroke:1px_var(--primary)]">
              {allBookings?.filter(
                (booking) => booking.bookingStatus === "Confirmed"
              ).length < 10
                ? "0" +
                  allBookings?.filter(
                    (booking) => booking.bookingStatus === "Confirmed"
                  ).length
                : allBookings?.filter(
                    (booking) => booking.bookingStatus === "Confirmed"
                  ).length}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-background  rounded-lg border border-primary/80 w-full"
          >
            <h3 className="text-lg font-semibold">Total Check-Ins</h3>
            <p className="text-primary/80 text-xs">
              Here you can see the total number of today's check-ins made.
            </p>
            <p className="text-7xl font-bold  text-end mt-4 text-transparent [-webkit-text-stroke:1px_var(--primary)]">
              {allCheckIns?.length < 10
                ? "0" + allCheckIns?.length
                : allCheckIns?.length}
            </p>
          </motion.div>
          {(staff?.role === "Admin" || staff?.role === "General Manager") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-4 bg-background  rounded-lg border border-primary/80 w-full"
            >
              <h3 className="text-lg font-semibold">Total Revenue</h3>
              <p className="text-primary/80 text-xs">
                Here you can see the total revenue made.
              </p>
              <p className="text-7xl font-bold  text-end mt-4 text-transparent [-webkit-text-stroke:1px_var(--primary)]">
                {formatNumber(totalRevenue)}
              </p>
            </motion.div>
          )}
        </div>
        <div className="flex md:flex-row flex-col justify-between gap-4 my-4">
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <NormalCalendar />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <DigitalClock />
          </motion.div>
        </div>
        {(staff?.role === "Admin" || staff?.role === "General Manager") && (
          <RevenueChart
            bookings={allBookingPayments}
            checkIn={allCheckInsPayments}
            checkOut={allCheckOutsPayments}
            services={allServicesUsed}
          />
        )}
      </div>
    </>
  );
};

export default DashboardTab;
