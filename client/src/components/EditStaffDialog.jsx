import React, { useEffect, useRef } from "react";
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  BrushCleaning,
  CalendarIcon,
  HeartHandshake,
  Info,
  Loader2,
  Mars,
  ShieldCheck,
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
import { staffStore } from "@/store/staffStore";

const EditStaffDialog = ({
  openEditStaffAlert,
  setOpenEditStaffAlert,
  selectedStaff,
  setSelectedStaff,
}) => {
  const { updateStaff, staffLoading, resetSuccess } = staffStore();
  const [data, setData] = useState({
    name: selectedStaff?.name || "",
    email: selectedStaff?.email || "",
    contact: selectedStaff?.contact || "",
    education: selectedStaff?.education || "",
    gender: selectedStaff?.gender || "",
    dob: selectedStaff?.dob ? new Date(selectedStaff.dob) : null,
    role: selectedStaff?.role || "",
    salary: selectedStaff?.salary || "",
  });

  useEffect(() => {
    if (selectedStaff) {
      setData({
        name: selectedStaff.name || "",
        email: selectedStaff.email || "",
        contact: selectedStaff.contact || "",
        education: selectedStaff.education || "",
        gender: selectedStaff.gender || "",
        dob: selectedStaff.dob ? new Date(selectedStaff.dob) : null,
        role: selectedStaff.role || "",
        salary: selectedStaff.salary || "",
      });
    }
  }, [selectedStaff]);

  const [errors, setErrors] = useState({});

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
    if (!data.education.trim()) {
      newErrors.education = "Education is required.";
    }
    if (!data.role.trim()) {
      newErrors.role = "Role is required.";
    }
    if (!data.salary) {
      newErrors.salary = "Salary is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = await updateStaff(selectedStaff._id, data); // Get the success value here

      if (result?.success) {
        setSelectedStaff(null);
        setErrors({});
        resetSuccess(); // Reset success state
        setOpenEditStaffAlert(false);
      }
    }
  };

  const submitRef = useRef(null);
  const roles = [
    { name: "General Manager", icon: BriefcaseBusiness },
    { name: "Receptionist", icon: HeartHandshake },
    { name: "Marketing Manager", icon: BadgeDollarSign },
    { name: "Security Manager", icon: ShieldCheck },
    { name: "Housekeeping Manager", icon: BrushCleaning },
  ];
  return (
    <>
    {openEditStaffAlert && <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur " />}
      <Dialog open={openEditStaffAlert} onOpenChange={setOpenEditStaffAlert} modal={false}>
        <DialogContent >
          <DialogHeader>
            <DialogTitle>Update {selectedStaff?.name} Details</DialogTitle>
            <DialogDescription>
              Here you can update the details of the staff in the system.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex flex-col gap-4 items-center justify-center my-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1 w-full">
              <Input
                type="text"
                name="signupName"
                placeholder="Full Name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              {errors.name && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.name}
                </p>
              )}
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Input
                  type="text"
                  name="signupEmail"
                  placeholder="Email"
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
            <div className="flex flex-col gap-1 w-full">
              <Input
                type="text"
                name="education"
                placeholder="Education"
                value={data.education}
                onChange={(e) =>
                  setData({ ...data, education: e.target.value })
                }
              />
              {errors.education && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.education}
                </p>
              )}
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-full min-w-0">
                <Select
                  onValueChange={(e) => setData({ ...data, gender: e })}
                  value={data.gender}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">
                      <Mars /> Male
                    </SelectItem>
                    <SelectItem value="female">
                      <Venus /> Female
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
                      type="button"
                      className={
                        "rounded-md bg-transparent hover:bg-transparent border flex items-center justify-start overflow-hidden w-full"
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
                  <PopoverContent
                    className="w-auto p-0 max-w-[90vw] overflow-auto"
                    align="end"
                    side="top"
                  >
                    <Calendar
                      mode="single"
                      selected={data.dob}
                      onSelect={(date) => {
                        if (date instanceof Date && !isNaN(date)) {
                          setData({ ...data, dob: date });
                        }
                      }}
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

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-full min-w-0">
                <Select
                  onValueChange={(e) => setData({ ...data, role: e })}
                  value={data.role}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.name} value={role.name}>
                        <role.icon /> {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.role && (
                  <p className="text-primary text-xs flex gap-1 items-center">
                    <Info className="size-[0.75rem]" /> {errors.role}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1 w-full min-w-0">
                <Input
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  value={data.salary}
                  onChange={(e) => setData({ ...data, salary: e.target.value })}
                />
                {errors.salary && (
                  <p className="text-primary text-xs flex gap-1 items-center">
                    <Info className="size-[0.75rem]" /> {errors.salary}
                  </p>
                )}
              </div>
            </div>

            <button type="submit" className="hidden" ref={submitRef} />
          </form>

          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSelectedStaff(null);
                setErrors({});
                setOpenEditStaffAlert(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              variant={"secondary"}
              onClick={() => {
                submitRef.current?.click();
              }}
              disabled={staffLoading}
            >
              {staffLoading ? (
                <>
                  <Loader2 className="animate-spin size-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update Staff"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditStaffDialog;
