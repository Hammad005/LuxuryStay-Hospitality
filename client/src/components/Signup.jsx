import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  CircleSmall,
  Eye,
  EyeOff,
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

const Signup = ({ toggleMode }) => {
  const {signup, guestLoading} = guestStore();
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    password: "",
  });
  const [conPassword, setConPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
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
      signup(data);
    }
  };
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-primary font-serif text-shadow-md text-shadow-black">
        Sign Up
      </h2>
      <p className="text-xs text-center  mb-6 text-white">
        We're so excited to have you!
      </p>
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
          <div className="flex flex-col gap-1">
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

          <div className="flex flex-col gap-1">
            <Input
              type="text"
              name="signupContact"
              placeholder="Contact"
              className="rounded-md"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
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
            <Select value={data.gender} onValueChange={(e) => setData({ ...data, gender: e })}>
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

        <div className="flex flex-col gap-1 relative">
          <Input
            type={showPassword ? "text" : "password"}
            name="signupPassword"
            placeholder="Password"
            className="rounded-md"
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

        <div className="flex flex-col gap-1 relative">
          <Input
            type={showConPassword ? "text" : "password"}
            name="loginPassword"
            placeholder="Confirm Password"
            className="rounded-md"
            vale={conPassword}
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
        <Button type="submit" variant="secondary" className="mt-2 w-full shadow-lg shadow-black"
        disabled = {guestLoading}>
          {
            guestLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Sign Up"
            )
          }
        </Button>
      </form>

      <p className="text-sm text-center mt-6 text-white">
        Already have an account?{" "}
        <button
          onClick={toggleMode}
          className="text-primary font-semibold hover:underline cursor-pointer"
        >
          Login
        </button>
      </p>
    </>
  );
};

export default Signup;
