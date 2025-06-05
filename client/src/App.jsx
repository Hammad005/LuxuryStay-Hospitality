import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import DiscoverRooms from "./Pages/DiscoverRooms";
import Footer from "./components/Footer";
import FloatingShape from "./components/FloatingShape";
import ContactUs from "./Pages/ContactUs";
import Auth from "./Pages/Auth";
import { guestStore } from "./store/guestStore";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { staffStore } from "./store/staffStore";
import Dashboard from "./Pages/Dashboard";
import { roomStore } from "./store/roomStore";
import { messageStore } from "./store/messageStore";
import { serviceStore } from "./store/serviceStore";
import OurServices from "./Pages/OurServices";
import GuestDetails from "./Pages/GuestDetails";
import Reservation from "./Pages/Reservation";
import { bookingStore } from "./store/bookingStore";
import { checkInStore } from "./store/checkInStore";
import CheckOutForm from "./Pages/CheckOutForm";
import MyCheckOuts from "./Pages/MyCheckOuts";
import { checkOutStore } from "./store/checkOutStore";
import CheckOutHistory from "./Pages/CheckOutHistory";

const ProtectedRoute = ({ condition, redirectTo = "/", children }) => {
  if (condition) {
    return children;
  }

  return <Navigate to={redirectTo} replace />;
};
function App() {
  const { guest, checkingGuestAuth, checkGuestAuth } = guestStore();
  const { staff, checkingstaffAuth, checkStaffAuth, getAllStaff } =
    staffStore();
  const { getRooms } = roomStore();
  const { getMessage } = messageStore();
  const { getServices } = serviceStore();
  const {getAllBookings, getGuestBookings} = bookingStore();
  const {getUserCheckIns, getAllCheckIns} = checkInStore();
  const {getUserCheckOuts, getAllCheckOuts} = checkOutStore();

  useEffect(() => {
    const waitLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 6000));
      await checkGuestAuth(); // this runs AFTER 6 seconds
      await checkStaffAuth();
    };

    waitLoading();
  }, [checkGuestAuth, checkStaffAuth]);

  useEffect(() => {
    const currentStaff = staffStore.getState().staff;
    if (currentStaff) {
      getMessage(); // Fetch messages only if staff is logged in
      getAllBookings();
      getAllCheckIns();
      getAllCheckOuts();
    }
    if (
      currentStaff?.role === "Admin" ||
      currentStaff?.role === "General Manager"
    ) {
      getAllStaff(); // Fetch all staff if no staff is logged in
    }
  }, [getMessage, staff, getAllStaff, getAllBookings, getAllCheckIns, getAllCheckOuts]);

  useEffect(() => {
    const currentGuest = guestStore.getState().guest;
    if (currentGuest) {
      getGuestBookings();
      getUserCheckIns();
      getUserCheckOuts();
    }
  }, [getGuestBookings, guest, getUserCheckIns, getUserCheckOuts]);

  useEffect(() => {
    getRooms();
    getServices();
  }, [getRooms, getServices]);

  if (checkingGuestAuth || checkingstaffAuth) return <Loading />;
  return (
    <>
      <div className="bg-gradient-to-b from-accent via-background to-background min-h-screen">
        <Navbar />

        <div
          className="min-h-screen flex flex-col items-center 
      justify-center relative overflow-hidden"
        >
          <FloatingShape
            color="text-primary/90"
            size="w-64 h-64"
            top="-5%"
            left="0%"
            delay={0}
          />
          <FloatingShape
            color="text-primary/90"
            size="w-64 h-64"
            top="20%"
            left="50%"
            delay={0}
          />

          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/discoverRooms" element={<DiscoverRooms />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/guestDetails/:path" element={
              <ProtectedRoute condition={guest} redirectTo="/">
                  <GuestDetails />
                </ProtectedRoute>
            } />
            <Route path="/reservation" element={
              <ProtectedRoute condition={guest} redirectTo="/">
                  <Reservation />
                </ProtectedRoute>
            } />
            <Route path="/checkOut/:id" element={
              <ProtectedRoute condition={guest} redirectTo="/">
                  <CheckOutForm />
                </ProtectedRoute>
            } />
            <Route path="/my-CheckOuts" element={
              <ProtectedRoute condition={guest} redirectTo="/">
                  <MyCheckOuts />
                </ProtectedRoute>
            } />
            <Route path="/history/:id" element={
              <ProtectedRoute condition={guest} redirectTo="/">
                  <CheckOutHistory />
                </ProtectedRoute>
            } />
            <Route
              path="/authenticate"
              element={
                <ProtectedRoute condition={!guest && !staff} redirectTo="/">
                  <Auth />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute condition={staff} redirectTo="/">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
