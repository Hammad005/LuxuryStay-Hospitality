import React, { useEffect } from "react";
import standard from "../assets/rooms/standard.jpg";
import premium from "../assets/rooms/Premium.jpg";
import suite from "../assets/rooms/suite.jpg";
import business from "../assets/rooms/Business-Oriented.png";
import { Card } from "@/components/ui/card";
import {
  AirVent,
  Bath,
  CarTaxiFront,
  DoorOpen,
  Dumbbell,
  Grape,
  Martini,
  Newspaper,
  Refrigerator,
  Sofa,
  TvMinimal,
  Vault,
  Wifi,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { guestStore } from "@/store/guestStore";
import { useNavigate } from "react-router-dom";
const DiscoverRooms = () => {
  const {guest} =  guestStore();

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const rooms = [
    {
      name: "Standard",
      description:
        "Stylish room with upscale furnishings with a double bed and basic luxury amenities.",
      image: standard,
      amenities: [
        { name: "Welcome drink upon arrival", icon: Martini },
        { name: "Mini refrigerator in room", icon: Refrigerator },
        { name: "Newspaper upon request", icon: Newspaper },
        { name: "Free use of fitness center", icon: Dumbbell },
        { name: " Air-conditioning", icon: AirVent },
        { name: "Bathroom amenities", icon: Bath },
        { name: "Free Wifi", icon: Wifi },
        { name: "Safe locker in room", icon: Vault },
        { name: "LCD/LED TV", icon: TvMinimal },
      ],
      roomSize: "162 sq feet",
      bedSize: "1 king/Queen or Twin",
      view: "City View, Garden View",
    },
    {
      name: "Premium",
      description:
        "Premium room with exclusive lounge access with a king-sized bed and added services.",
      image: premium,
      amenities: [
        {
          name: "Airport pick and drop service van/coaster upon request",
          icon: CarTaxiFront,
        },
        { name: "Welcome drink upon arrival", icon: Martini },
        { name: "Fruit Platter on first day of check in", icon: Grape },
        {
          name: "Free use of fitness center",
          icon: Dumbbell,
        },
        { name: "LCD/LED TV", icon: TvMinimal },
        { name: "Safe locker in room", icon: Vault },
        { name: "Free Wifi", icon: Wifi },
        { name: "Air-conditioning", icon: AirVent },
        { name: "Mini refrigerator in room", icon: Refrigerator },
      ],
      roomSize: "172 sq feet",
      bedSize: "1 king/Queen or Twin",
      view: "City View",
    },
    {
      name: "Suite",
      description:
        "Luxurious multi-room suite with VIP services, a separate living room and top-tier privacy.",
      image: suite,
      amenities: [
        {
          name: "Airport pick and drop service van/coaster upon request",
          icon: CarTaxiFront,
        },
        { name: "Mini refrigerator in room", icon: Refrigerator },
        { name: " Express check-in / check-outt", icon: DoorOpen },
        { name: " Air-conditioning", icon: AirVent },
        { name: "Free use of fitness center", icon: Dumbbell },
        { name: "Welcome drink upon arrival", icon: Martini },
        { name: "Free Wifi", icon: Wifi },
        { name: "Safe locker in room", icon: Vault },
        { name: "LCD/LED TV", icon: TvMinimal },
      ],
      roomSize: "232 sq feet",
      bedSize: "1 king",
      view: "City View, Garden View",
    },
    {
      name: "Business-Oriented",
      description:
        "Business-focused room with executive amenities, a private lounge and a meeting room.",
      image: business,
      amenities: [
        { name: "Welcome drink upon arrival", icon: Martini },
        { name: "Free Wifi", icon: Wifi },
        { name: "Separate meeting room", icon: Sofa },
        { name: " Air-conditioning", icon: AirVent },
        { name: "Mini refrigerator in room", icon: Refrigerator },
        { name: "Free use of fitness center", icon: Dumbbell },
        { name: "Bathroom amenities", icon: Bath },
        { name: "Safe locker in room", icon: Vault },
        { name: "LCD/LED TV", icon: TvMinimal },
      ],
      roomSize: "230 sq feet",
      bedSize: "1 king",
      view: "City View",
    },
  ];
  const navigateTo = useNavigate();
  return (
    <>
      <div className="p-4 md:p-16 flex flex-col items-center justify-center min-h-screen z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:text-5xl text-4xl font-bold font-serif uppercase text-primary text-center   text-shadow-md text-shadow-black"
        >
          Discover Our Rooms
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:text-sm text-xs font-semibold text-white text-center md:w-1/2 md:mx-auto md:px-0 px-4 mb-10"
        >
          Choose from an exquisite collection of 288 rooms and suites as you
          step into our five-star sanctuary. Whether you prefer contemporary
          elegance or timeless classic charm, each room is designed to offer you
          the ultimate comfort and the royal treatment — your perfect home away
          from home.
        </motion.p>
        {rooms.map((room, index) => {
          const isEven = index % 2 === 0;
          const initial = { opacity: 0, x: isEven ? -100 : 100 };
          return (
            <motion.div
              key={room.name + index}
              initial={initial}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card
                className={`my-6 bg-transparent border-primary shadow-2xl shadow-secondary/50 w-full p-0 gap-0 flex flex-col md:flex-row ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } justify-center items-center`}
              >
                {/* Image Section */}
                <div
                  className={`h-[300px] md:h-[550px] w-full md:w-1/2 overflow-hidden rounded-t-xl ${
                    isEven
                      ? "md:rounded-none md:rounded-l-xl md:rounded-r-none"
                      : "md:rounded-none md:rounded-r-xl md:rounded-l-none"
                  } `}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-col items-center justify-center py-10 px-4 rounded-b-xl md:rounded-none md:rounded-r-xl text-center md:w-1/2">
                  <h2 className="text-4xl font-serif text-primary font-bold">
                    {room.name}
                  </h2>
                  <p className="text-sm text-white mt-2 px-2 md:w-1/2">
                    {room.description}
                  </p>

                  <h2 className="text-xl font-serif text-primary font-bold mt-6">
                    In-Room Amenities
                  </h2>
                  <div className="flex mt-3 flex-wrap justify-center items-center md:px-12 md:py-6 p-3 bg-secondary rounded">
                    <Carousel className={"max-w-xs"}>
                      <CarouselContent>
                        {room.amenities.map((amenity, i) => (
                          <CarouselItem key={i} className="basis-1/3">
                            <div className="flex flex-col items-center justify-center">
                              <amenity.icon className="w-8 h-8 text-primary" />
                              <p className="text-primary text-[10px]">
                                {amenity.name}
                              </p>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="absolute translate-x-2 md:flex hidden bg-transparent shadow-none hover:bg-transparent hover:text-primary text-primary border-0" />
                      <CarouselNext className="absolute -translate-x-2 md:flex hidden bg-transparent shadow-none hover:bg-transparent hover:text-primary text-primary border-0" />
                    </Carousel>
                  </div>

                  <div className="flex items-center justify-between gap-10 py-6">
                    <div className="flex flex-col items-center">
                      <p className="text-primary font-bold text-[11px] md:text-sm">
                        Room Size
                      </p>
                      <span className="text-xs text-white text-[10px] md:text-xs">
                        {room.roomSize}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-primary font-bold text-[11px] md:text-sm">
                        Bed Size(s)
                      </p>
                      <span className="text-xs text-white text-[10px] md:text-xs">
                        {room.bedSize}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-primary font-bold text-[11px] md:text-sm">
                        View
                      </p>
                      <span className="text-xs text-white text-[10px] md:text-xs">
                        {room.view}
                      </span>
                    </div>
                  </div>

                  {guest && <Button
                    variant={"secondary"}
                    className={"rounded-full text-xs px-8 py-5"}
                    onClick={() => navigateTo("/reservation")}
                  >
                    Reserve
                  </Button>}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default DiscoverRooms;
