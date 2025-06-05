import { useEffect, useState } from "react";
import Logo from "./Logo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  BadgeCheck,
  BedDouble,
  BookCheck,
  ChevronDown,
  CircleUser,
  ClipboardCheck,
  Kanban,
  Loader2,
  LogOut,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { guestStore } from "@/store/guestStore";
import { staffStore } from "@/store/staffStore";

const Navbar = () => {
  const [openNavbarDropDown, setOpenNavbarDropDown] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    setOpenNavbarDropDown(false);
  }, [navigateTo]);
  const { guest, logout, guestLoading } = guestStore();
  const { staff, staffLoading, staffLogout } = staffStore();
  const handleLogout = async () => {
    if (guest) {
      await logout();
      setOpenNavbarDropDown(false);
    } else if (staff) {
      await staffLogout();
      setOpenNavbarDropDown(false);
    }
  };
  return (
    <>
      <nav className="flex justify-between items-center p-2 md:px-20 px-6 bg-background/30 sticky border-b border-primary/50 top-0 backdrop-blur z-50 w-full">
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            onClick={() => setOpenNavbarDropDown(!openNavbarDropDown)}
            size={"icon"}
          >
            {openNavbarDropDown ? <X /> : <Kanban className="size-5" />}
          </Button>
          <h1
            className="text-sm font-semibold hover:text-primary hover:border-b hover:border-primary hover:cursor-pointer uppercase md:block hidden"
            onClick={() => navigateTo("/our-story")}
          >
            Our Story
          </h1>
          <h1
            className="text-sm font-semibold hover:text-primary hover:border-b hover:border-primary hover:cursor-pointer uppercase md:block hidden"
            onClick={() => navigateTo("/our-services")}
          >
            Our Services
          </h1>
        </div>
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          {!guest && !staff && (
            <>
              <Button
                variant={"outline"}
                className={"uppercase md:block hidden"}
                onClick={() => navigateTo("/authenticate")}
              >
                login
              </Button>
              <Button
                variant={"secondary"}
                className={"uppercase md:hidden block"}
                onClick={() => navigateTo("/authenticate")}
              >
                login
              </Button>
            </>
          )}
          {guest && (
            <Popover>
              <PopoverTrigger>
                <Button variant={"secondary"} className={"uppercase"}>
                  Account <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={"w-fit bg-accent"}>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={"outline"}
                    className="text-xs flex justify-start"
                    onClick={() => navigateTo("/guestDetails/Profile")}
                  >
                    <CircleUser className="text-primary" /> Profile
                  </Button>
                  <Button
                    variant={"outline"}
                    className="text-xs flex justify-start"
                    onClick={() => navigateTo("/guestDetails/My-CheckIns")}
                  >
                    <BadgeCheck className="text-primary" /> My CheckIns
                  </Button>
                  <Button
                    variant={"outline"}
                    className="text-xs flex justify-start"
                    onClick={() => navigateTo("/my-CheckOuts")}
                  >
                    <ClipboardCheck className="text-primary" /> My CheckOuts
                  </Button>
                  <Button
                    variant={"outline"}
                    className="text-xs flex justify-start"
                    onClick={() => navigateTo("/guestDetails/My-Bookings")}
                  >
                    <BookCheck className="text-primary" /> My Bookings
                  </Button>
                  <Button
                    variant={"outline"}
                    className={"text-xs flex justify-start"}
                    onClick={logout}
                    disabled={guestLoading}
                  >
                    {guestLoading ? (
                      <>
                      <Loader2 className="animate-spin " />
                      Logging Out
                      </>
                    ) : (
                      <>
                      <LogOut className="text-primary" />
                      Logout
                      </>
                    )}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {staff && (
            <Button
              variant={"outline"}
              className="text-xs"
              onClick={() => navigateTo("/dashboard")}
            >
              Dashboard
            </Button>
          )}
          <div className="border border-r-primary min-h-[70px] md:block hidden" />
          {staff && (
            <Button
              variant={"secondary"}
              className={"uppercase md:block hidden"}
              onClick={staffLogout}
              disabled={staffLoading}
            >
              {staffLoading ? <Loader2 className="animate-spin " /> : "Logout"}
            </Button>
          )}
          {guest ? (
            <>
              <Button
                variant={"secondary"}
                className={"uppercase md:block hidden"}
                onClick={() => navigateTo("/reservation")}
              >
                Book Now
              </Button>
            </>
          ) : (
            !staff && (
              <Button
                variant={"secondary"}
                className={"uppercase md:block hidden"}
                onClick={() => navigateTo("/contactUs")}
              >
                Contact Us
              </Button>
            )
          )}
        </div>
      </nav>

      {/* Manually placed popover */}
      <AnimatePresence>
        {openNavbarDropDown && (
          <Popover open={openNavbarDropDown}>
            <PopoverContent
              align="start"
              side="bottom"
              className="absolute md:top-28 top-24 w-screen z-50 rounded-none  border-x-0 border-b-0 h-screen border-t-primary/50 bg-background/30 backdrop-blur"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:px-20 px-6"
              >
                <Link
                  to="/"
                  className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                >
                  Home
                </Link>
                <Link
                  to="/our-story"
                  className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                >
                  Our Story
                </Link>
                <Link
                  to="/our-services"
                  className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                >
                  Our Services
                </Link>
                <Link
                  to="/discoverRooms"
                  className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                >
                  Discover Rooms
                </Link>
                <Link
                  to="/contactUs"
                  className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                >
                  Contact
                </Link>
                {!guest && !staff ? (
                  <Link
                    to="/authenticate"
                    className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                  >
                    login
                  </Link>
                ) : (
                  <Link
                    to={guest ? "/guestDetails/Profile" : "/dashboard"}
                    className="border-b border-primary flex w-full pb-2 text-lg hover:text-primary uppercase"
                  >
                    Profile
                  </Link>
                )}

                {(guest || staff) && (
                  <Button
                    variant="outline"
                    className="text-xs"
                    onClick={handleLogout}
                    disabled={guestLoading || staffLoading}
                  >
                    {guestLoading || staffLoading ? (
                      <div className="flex items-center gap-1">
                        Logging Out
                        <Loader2 className="animate-spin size-4" />
                      </div>
                    ) : (
                      "Logout"
                    )}
                  </Button>
                )}
              </motion.div>
            </PopoverContent>
          </Popover>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
