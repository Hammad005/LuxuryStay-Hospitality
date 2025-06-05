import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  CircleSmall,
  Info,
  Loader2,
  Mars,
  Venus,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { guestStore } from "@/store/guestStore";
const EditGuestProfile = ({ open, setOpen }) => {
  const { guest, updateProfile, guestLoading, resetSuccess } = guestStore();
  const [data, setData] = useState({
    name: guest?.name || "",
    email: guest?.email || "",
    contact: guest?.contact || "",
    gender: guest?.gender || "",
    dob: guest?.dob || null,
  });
  const [errors, setErrors] = useState({});
  const submitButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!data.contact.trim()) {
      newErrors.contact = "Contact is required.";
    }

    if (!data.gender.trim()) {
      newErrors.gender = "Gender is required.";
    }

    if (!data.dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const res = await updateProfile(guest._id, data);
      if (res?.success) {
        setErrors({});
        setData({
          name: "",
          email: "",
          contact: "",
          gender: "",
          dob: null,
        });
        setOpen(false);
        resetSuccess();
      }
    }
  };
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur " />
      )}
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Details</DialogTitle>
            <DialogDescription>
              Here you can update the details of your profile.
            </DialogDescription>
          </DialogHeader>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Input
                type="name"
                name="signupName"
                placeholder="Full Name"
                className="rounded-md"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.name}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="text"
                  name="signupEmail"
                  placeholder="Email"
                  className="rounded-md"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-primary text-xs flex gap-1 items-center">
                    <Info className="size-[0.75rem]" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="text"
                  name="signupContact"
                  placeholder="Contact"
                  className="rounded-md"
                  value={data.contact}
                  onChange={(e) =>
                    setData({ ...data, contact: e.target.value })
                  }
                />
                {errors.contact && (
                  <p className="text-primary text-xs flex gap-1 items-center">
                    <Info className="size-[0.75rem]" /> {errors.contact}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 w-full min-w-0">
                <Select
                  value={data.gender}
                  onValueChange={(e) => setData({ ...data, gender: e })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      <Mars /> Male
                    </SelectItem>
                    <SelectItem value="female">
                      <Venus /> Female
                    </SelectItem>
                    <SelectItem value="other">
                      <CircleSmall /> Other
                    </SelectItem>
                  </SelectContent>
                </Select>

                {errors.gender && (
                  <p className="text-primary text-xs flex gap-1 items-center">
                    <Info className="size-[0.75rem]" /> {errors.gender}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full min-w-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={
                        "rounded-md bg-transparent hover:bg-transparent border flex items-center justify-start"
                      }
                    >
                      <CalendarIcon
                        className={`mr-2 h-4 w-4 ${
                          data.dob ? "text-foreground" : "text-muted-foreground"
                        }`}
                      />
                      {data.dob ? (
                        <span className="text-foreground text-sm font-normal">
                          {format(data.dob, "dd/MM/yyyy")}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm font-normal">
                          Date of Birth
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={data.dob}
                      onSelect={(e) => setData({ ...data, dob: e })}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.dob && (
                  <p className="text-primary text-xs flex gap-1 items-center">
                    <Info className="size-[0.75rem]" /> {errors.dob}
                  </p>
                )}
              </div>
            </div>
            <button type="submit" hidden ref={submitButtonRef} />
          </form>

          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setOpen(false);
                setData(guest);
                setErrors({});
              }}
            >
              Cancel
            </Button>
            <Button type="submit" size="lg" variant={"secondary"}
              onClick={() => submitButtonRef.current.click()} 
              disabled={guestLoading}>
              {
                guestLoading ? (
                  <Loader2 className="animate-spin size-5" />
                ) : (
                  "Update"
                )
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditGuestProfile;
