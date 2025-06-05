import { staffStore } from "@/store/staffStore";
import { CircleUser } from "lucide-react";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Input } from "./ui/input";

const ProfileTab = () => {
  const { staff } = staffStore();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col w-full bg-accent border border-primary rounded-lg p-4">
        <h2 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2">
          <CircleUser className="size-7 text-primary" />
          Profile
        </h2>
        <p className="text-sm text-primary/80">
          Here you can view your profile.
        </p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className=" bg-background mt-4  rounded-lg border border-primary/80 p-4 overflow-x-auto"
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Name:</h3>
              <Input
                type="text"
                value={staff?.name}
                className={"text-primary"}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Email:</h3>
              <Input
                type="email"
                value={staff?.email}
                className={"text-primary"}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Contact:</h3>
              <Input
                type="text"
                value={staff?.contact}
                className={"text-primary"}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Education:</h3>
              <Input
                type="text"
                value={staff?.education}
                className={"text-primary"}
                disabled
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Gender:</h3>
              <Input
                type="text"
                value={staff?.gender}
                className={"text-primary uppercase"}
                disabled
              />
            </div>
            {staff?.dob && (
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Date of Birth:</h3>
                <Input
                  type="text"
                  value={format(staff?.dob, "dd-MM-yyyy")}
                  className={"text-primary"}
                  disabled
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Role:</h3>
              <Input
                type="text"
                value={staff?.role}
                className={"text-primary"}
                disabled
              />
            </div>
            {staff?.salary && (
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Salary:</h3>
                <Input
                  type="text"
                  value={"Rs. " + staff?.salary + "/-"}
                  className={"text-primary"}
                  disabled
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Join Date:</h3>
              <Input
                type="text"
                value={format(staff?.createdAt, "dd-MM-yyyy")}
                className={"text-primary"}
                disabled
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ProfileTab;
