import React, { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Info, Loader2 } from "lucide-react";
import { roomStore } from "@/store/roomStore";

const AddNewRoom = () => {
  const { createRoom, roomLoading } = roomStore();
  const [data, setData] = useState({
    roomType: "",
    roomNumber: "",
    roomFloor: "",
    roomPrice: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.roomType.trim()) {
      newErrors.roomType = "Room Type is required.";
    }
    if (!data.roomNumber.trim()) {
      newErrors.roomNumber = "Room Number is required.";
    }
    if (!data.roomFloor.trim()) {
      newErrors.roomFloor = "Room Floor is required.";
    }
    if (!data.roomPrice.trim()) {
      newErrors.roomPrice = "Select a Room Type to get the Price.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      createRoom(data);
    }
  };

  const handlePricing = (type) => {
    let price = "";
    if (type === "Standard") price = "18000";
    else if (type === "Premium") price = "25000";
    else if (type === "Suite") price = "40000";
    else if (type === "Business-Oriented") price = "32000";

    setData({ ...data, roomType: type, roomPrice: price });
  };
  return (
    <>
      <div className="p-4 bg-background  rounded-lg border border-primary/80  flex flex-col items-center justify-center min-h-[300px] mt-4">
        <h2 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2">
          Add New Room
        </h2>
        <p className="text-sm text-primary/80 text-center">
          Here you can add a new room to the system. Please fill in the details
          below.
        </p>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 w-full">
            <div className="flex flex-col gap-1 w-full min-w-0">
              <Select onValueChange={(value) => handlePricing(value)}>
                <SelectTrigger className="w-full mt-4">
                  <SelectValue placeholder="Select Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Business-Oriented">
                    Business-Oriented
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.roomType && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.roomType}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full min-w-0">
              <Input
                type="text"
                placeholder="Enter Room Number"
                className="md:mt-4"
                value={data.roomNumber}
                onChange={(e) =>
                  setData({ ...data, roomNumber: e.target.value })
                }
              />
              {errors.roomNumber && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.roomNumber}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full min-w-0">
              <Input
                type="text"
                placeholder="Enter Room Floor"
                value={data.roomFloor}
                onChange={(e) =>
                  setData({ ...data, roomFloor: e.target.value })
                }
              />
              {errors.roomFloor && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.roomFloor}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full min-w-0">
              <Input
                type="text"
                placeholder="Select Room Type to get Price"
                value={data.roomPrice ? "Rs. " + data.roomPrice + "/-  per night" : ""}
                disabled
              />
              {errors.roomPrice && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.roomPrice}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant={"secondary"}
            className="mt-4 w-[200px]"
            disabled={roomLoading}
          >
            {roomLoading ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              "Add Room"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddNewRoom;
