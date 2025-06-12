import React from "react";
import sectionLine from "../assets/sectionLine.png";
import standard from "../assets/rooms/standard.jpg";
import premium from "../assets/rooms/Premium.jpg";
import suite from "../assets/rooms/suite.jpg";
import business from "../assets/rooms/Business-Oriented.png";
import { Card} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
const Accommodations = () => {
  const navigateTo = useNavigate();
  const rooms = [
    {
      name: "Standard",
      description:
        "Stylish room with upscale furnishings with a double bed and basic luxury amenities.",
      image: standard,
    },
    {
      name: "Premium",
      description:
        "Premium room with exclusive lounge access with a king-sized bed and added services.",
      image: premium,
    },
    {
      name: "Suite",
      description:
        "Luxurious multi-room suite with VIP services, a separate living room and top-tier privacy.",
      image: suite,
    },
    {
      name: "Business-Oriented",
      description:
        "Business-focused room with executive amenities, a private lounge and a meeting room.",
      image: business,
    },
  ];
  return (
    <>
      <section id="accommodations" className="relative">
        {/* Image Line */}
        <img
          src={sectionLine}
          alt="sectionLine"
          className="object-contain w-full"
        />

        {/* Main Content (in flow) */}
        <div className="bg-white md:-mt-8 -mt-1 z-10 relative pb-15">
          <h1 className="md:text-5xl text-xl font-bold text-accent text-center font-serif">
            Accommodations
          </h1>
          <p className="md:text-sm text-xs font-semibold text-secondary text-center md:w-1/2 md:mx-auto md:px-0 px-4">
            Choose from an exquisite collection of 288 rooms and suites as you
            step into our five-star sanctuary. Whether you prefer contemporary
            elegance or timeless classic charm, each room is designed to offer
            you the ultimate comfort and the royal treatment — your perfect home
            away from home.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 px-4 md:px-16 mt-10 gap-4">
            {rooms.map((room, idx) => (
              <Card
                key={idx}
                className={
                  "p-3 bg-transparent border-primary shadow-2xl shadow-secondary/50 cursor-pointer hover:shadow-2xl hover:shadow-primary/50 hover:transform hover:scale-105 transition duration-300 ease-in-out"
                }
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h3 className="md:text-lg text-sm font-bold text-secondary uppercase">
                    {room.name}
                  </h3>
                  <p className="md:text-xs text-[10px] font-semibold text-primary">
                    {room.description}
                  </p>
                </div>
                <div className={"flex justify-end"}>
                  <Button variant={"secondary"}
                    onClick={() => navigateTo(`/discoverRooms`)}
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Accommodations;
