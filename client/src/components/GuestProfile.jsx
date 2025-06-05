import { guestStore } from "@/store/guestStore";
import { format } from "date-fns";
import { CircleUser, Edit3 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import EditGuestProfile from "./EditGuestProfile";

const GuestProfile = () => {
    const { guest } = guestStore();
    const [open, setOpen] = useState(false)
  return (
    <>
    <EditGuestProfile open={open} setOpen={setOpen} />
      <div className="bg-accent/70 p-6 rounded-md border border-primary flex flex-col items-center">
        <h1 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 uppercase">
          <CircleUser className="size-8 text-primary" /> Profile
        </h1>
        <p className="text-sm text-primary/80">
          Here you can view your profile.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 w-full">
          <div className="p-4 bg-background/70 rounded-lg border border-primary/80">
            <h3 className="text-lg font-semibold">Name:</h3>
            <p className="text-primary/80 md:text-sm text-xs">
              {guest?.name}
            </p>
          </div>
          <div className="p-4 bg-background/70 rounded-lg border border-primary/80">
            <h3 className="text-lg font-semibold">Email:</h3>
            <p className="text-primary/80 md:text-sm text-xs">
              {guest?.email}
            </p>
          </div>
          <div className="p-4 bg-background/70 rounded-lg border border-primary/80">
            <h3 className="text-lg font-semibold">Contact:</h3>
            <p className="text-primary/80 md:text-sm text-xs">
              {guest?.contact}
            </p>
          </div>
          <div className="p-4 bg-background/70 rounded-lg border border-primary/80">
            <h3 className="text-lg font-semibold">Gender:</h3>
            <p className="text-primary/80 md:text-sm text-xs uppercase">
              {guest?.gender}
            </p>
          </div>
          <div className="p-4 bg-background/70 rounded-lg border border-primary/80">
            <h3 className="text-lg font-semibold">Date of Birth:</h3>
            <p className="text-primary/80 md:text-sm text-xs uppercase">
              {format(guest?.dob, "dd-MM-yyyy")}
            </p>
          </div>
          <div className="p-4 bg-background/70 rounded-lg border border-primary/80">
            <h3 className="text-lg font-semibold">Member Since:</h3>
            <p className="text-primary/80 md:text-sm text-xs uppercase">
              {format(guest?.createdAt, "dd-MM-yyyy")}
            </p>
          </div>
        </div>
        <Button className="mt-4" variant={'outline'}
        onClick={() => setOpen(true)}><Edit3/> Update Profile</Button>
      </div>
    </>
  );
};

export default GuestProfile;
