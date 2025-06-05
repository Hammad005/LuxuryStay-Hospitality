import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  BedDouble,
  BookCheck,
  CircleUser,
  HandPlatter,
  LayoutDashboard,
  Menu,
  MessageCircle,
  PanelLeftOpen,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { staffStore } from "@/store/staffStore";
import DashboardTab from "@/components/DashboardTab";
import CheckInTab from "@/components/CheckInTab";
import BookingsTab from "@/components/BookingsTab";
import RoomsTab from "@/components/RoomsTab";
import ServicesTab from "@/components/ServicesTab";
import MessagesTab from "@/components/MessagesTab";
import StaffTab from "@/components/StaffTab";
import ProfileTab from "@/components/ProfileTab";

const Dashboard = () => {
  const { staff } = staffStore();

  const tabs = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="size-4.5" />,
      show: true,
    },
    {
      name: "Bookings",
      icon: <BookCheck className="size-4.5" />,
      show: true,
    },
    {
      name: "Check-Ins",
      icon: <BadgeCheck className="size-4.5" />,
      show: true,
    },
    {
      name: "Rooms",
      icon: <BedDouble className="size-4.5" />,
      show: true,
    },
    {
      name: "Services",
      icon: <HandPlatter className="size-4.5" />,
      show: true,
    },
    {
      name: "Messages",
      icon: <MessageCircle className="size-4.5" />,
      show: staff?.role === "Admin" || staff?.role === "General Manager",
    },

    {
      name: "Senior Staff",
      icon: (
        <div className="relative ml-1">
          <Users className="size-4.5" />{" "}
          <Users className="size-4.5 absolute top-0 right-0 -scale-x-100 -translate-x-1/4" />
        </div>
      ),
      show: staff?.role === "Admin" || staff?.role === "General Manager",
    },
    { name: "Profile", icon: <CircleUser className="size-4.5" />, show: true },
  ];

  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  useEffect(() => {
    setOpenSheet(false);
  }, [selectedTab]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center z-10 w-full">
        <div className="flex md:flex-row flex-col w-full min-h-screen md:h-screen md:relative md:overflow-hidden">
          <aside className="relative md:block hidden">
            <AnimatePresence mode="wait">
              {openSideBar ? (
                <motion.aside
                  key="open"
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/30 backdrop-blur border-r border-primary/50 p-10 min-h-screen w-60"
                >
                  <button
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={() => setOpenSideBar(false)}
                  >
                    <X className="size-5 text-primary" />
                  </button>
                  <h1 className="text-3xl font-bold text-white text-shadow-md text-shadow-black font-serif">
                    Dashboard
                  </h1>
                  <p className="text-primary text-xs">
                    Welcome to dashboard, here you can manage hotel bookings and
                    services.
                  </p>
                  {tabs.map((tab) => (
                    tab.show && (
                      <Button
                        key={tab.name}
                        variant={"secondary"}
                        className={`mt-6 w-full flex items-center justify-start ${
                          selectedTab === tab.name && "bg-background text-primary"
                        }`}
                        onClick={() => setSelectedTab(tab.name)}
                      >
                        {tab.icon}
                        {tab.name}
                      </Button>
                    )
                  ))}
                </motion.aside>
              ) : (
                <motion.aside
                  key="compact"
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background/30 backdrop-blur border-r border-primary/50 p-10 min-h-screen h-full w-20 md:flex flex-col items-center hidden"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size={"icon"}
                          className={`mt-2`}
                          onClick={() => setOpenSideBar(true)}
                        >
                          <PanelLeftOpen className="size-4.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">Open Menu</TooltipContent>
                    </Tooltip>
                    <span className="min-w-[4rem] border-t border-primary/50 mt-4" />
                    {tabs.map((tab) => (
                      tab.show &&
                      <Tooltip key={tab.name}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size={"icon"}
                            className={`mt-6 ${
                              selectedTab === tab.name &&
                              "bg-accent text-primary"
                            }`}
                            onClick={() => setSelectedTab(tab.name)}
                          >
                            {tab.icon}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">{tab.name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </motion.aside>
              )}
            </AnimatePresence>
          </aside>

          <motion.div
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8 }}
            className="px-6 py-3  w-full flex items-center justify-between md:hidden"
          >
            <Button
              variant="outline"
              size={"icon"}
              onClick={() => setOpenSheet(true)}
            >
              <PanelLeftOpen className="size-4.5" />
            </Button>
            <div className="flex flex-col items-end">
              <h1 className="text-lg font-bold text-white font-serif">
                Hello, {staff?.name}
              </h1>
            </div>
          </motion.div>
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-3xl font-bold text-white text-shadow-md text-shadow-black font-serif">
                  Dashboard
                </SheetTitle>
                <SheetDescription className="text-primary text-xs">
                  Welcome to dashboard, here you can manage hotel bookings and
                  services.
                </SheetDescription>
              </SheetHeader>
              <div className="px-4">
                {tabs.map((tab) => (
                  tab.show &&
                  <Button
                    key={tab.name}
                    variant={"secondary"}
                    className={`mt-6 w-full flex items-center justify-start ${
                      selectedTab === tab.name && "bg-background"
                    }`}
                    onClick={() => setSelectedTab(tab.name)}
                  >
                    {tab.icon}
                    {tab.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <div className="md:p-10 p-4 w-full md:overflow-y-auto md:h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {selectedTab === "Dashboard" && <DashboardTab />}
                {selectedTab === "Check-Ins" && <CheckInTab />}
                {selectedTab === "Bookings" && <BookingsTab />}
                {selectedTab === "Rooms" && <RoomsTab />}
                {selectedTab === "Services" && <ServicesTab />}
                {selectedTab === "Messages" && <MessagesTab />}
                {selectedTab === "Senior Staff" && <StaffTab />}
                {selectedTab === "Profile" && <ProfileTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
