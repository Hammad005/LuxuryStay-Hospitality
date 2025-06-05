import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  BrushCleaning,
  CalendarIcon,
  Eye,
  EyeOff,
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
const AddStaff = () => {
  const { registerStaff, staffLoading, resetSuccess } = staffStore();
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    education: "",
    gender: "",
    dob: "",
    role: "",
    salary: "",
    password: "",
  });
  const [conPassword, setConPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
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
    if (!data.salary.trim()) {
      newErrors.salary = "Salary is required.";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!conPassword.trim()) {
      newErrors.conPassword = "Confirm Password is required.";
    } else if (conPassword !== data.password) {
      newErrors.conPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
       const result = await registerStaff(data); // Get the success value here

    if (result?.success) {
      // Reset the form
      setData({
        name: "",
        email: "",
        contact: "",
        education: "",
        gender: "",
        dob: "",
        role: "",
        salary: "",
        password: "",
      });
      setConPassword("");
      setShowPassword(false);
      setShowConPassword(false);
      setErrors({});
        resetSuccess(); // Reset success state
    }
       
    }
  };
  const roles = [
      { name: "General Manager", icon: BriefcaseBusiness },
      { name: "Receptionist", icon: HeartHandshake },
      { name: "Marketing Manager", icon: BadgeDollarSign },
      { name: "Security Manager", icon: ShieldCheck },
      { name: "Housekeeping Manager", icon: BrushCleaning },
    ];
  return (
    <>
      <div className="p-4 bg-background rounded-lg border border-primary/80 flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="font-semibold md:text-3xl text-2xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 text-center">
          Add New Senior Staff
        </h2>
        <p className="md:text-sm text-xs text-primary/80 text-center md:w-1/2">
          Here you can add a new Senior Staff to the system. Please fill in the
          details below to create their account for dashboard login access.
        </p>

        <div className="w-full md:px-26 px-4 sm:px-6 ">
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
                <Select onValueChange={(e) => setData({ ...data, gender: e })} 
                    value={data.gender}>
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
                      className={
                        "rounded-md bg-transparent hover:bg-transparent border flex items-center justify-start overflow-hidden"
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
                    align="start"
                  >
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

            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-full min-w-0">
                <Select onValueChange={(e) => setData({ ...data, role: e })}
                    value={data.role}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem value={role.name}>
                        <role.icon/> {role.name}
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

            <div className="flex flex-col gap-1 relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                name="signupPassword"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="absolute mt-4.5 right-3 transform -translate-y-1/2">
                {!showPassword ? (
                  <Eye
                    className="size-[1.25rem] cursor-pointer text-primary"
                    onClick={() => setShowPassword(true)}
                  />
                ) : (
                  <EyeOff
                    className="size-[1.25rem] cursor-pointer text-primary"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 relative w-full">
              <Input
                type={showConPassword ? "text" : "password"}
                name="loginPassword"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
              <div className="absolute mt-4.5 right-3 transform -translate-y-1/2">
                {!showConPassword ? (
                  <Eye
                    className="size-[1.25rem] cursor-pointer text-primary"
                    onClick={() => setShowConPassword(true)}
                  />
                ) : (
                  <EyeOff
                    className="size-[1.25rem] cursor-pointer text-primary"
                    onClick={() => setShowConPassword(false)}
                  />
                )}
              </div>
              {errors.conPassword && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.conPassword}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="mt-2 lg:w-1/3"
              disabled={staffLoading}
            >
              {staffLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Staff Member"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
