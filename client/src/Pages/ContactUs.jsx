import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Loader2, Mail, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import {motion} from 'framer-motion';
import { messageStore } from "@/store/messageStore";
const ContactUs = () => {
  const {sendMessage, messageLoading} = messageStore();
useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
});

const [errors, setErrors] = useState({});
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required.";
  }
  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required.";
  }
  if (!formData.email.trim()) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid.";
  }
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required.";
  } 
  if (!formData.message.trim()) {
    newErrors.message = "Please enter a message.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    await sendMessage(formData);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  }
};

  return (
    <>
      <div className="p-4 md:p-16 w-full flex flex-col items-center justify-center min-h-screen  z-10">
        <motion.h1
        initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        className="md:text-5xl text-4xl font-bold font-serif uppercase text-primary text-center   text-shadow-md text-shadow-black">
          Contact Us
        </motion.h1>
        <motion.p
        initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        className="md:text-sm text-xs font-semibold text-white text-center px-4 mb-10">
          If you have any questions or feedback, please don't hesitate to
          contact us.
        </motion.p>
        <div className="flex md:flex-row flex-col border border-primary md:border-none w-full max-w-6xl mx-auto">
          <div className="flex flex-col p-6 md:p-0 md:px-6  gap-10 w-full  ">
            <h1 className="text-2xl font-bold font-serif text-center">Get In Touch</h1>
            <form className="flex flex-col gap-4 p-0" onSubmit={handleSubmit}>
            <div>
              <Input
                placeholder="FIRST NAME"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full"
              />
              {errors.firstName && <p className="text-primary text-xs flex gap-1 items-center"><Info className="size-[0.75rem]"/> {errors.firstName}</p>}
            </div>

            <div>
              <Input
                placeholder="LAST NAME"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full"
              />
              {errors.lastName && <p className="text-primary text-xs flex gap-1 items-center"><Info className="size-[0.75rem]"/> {errors.lastName}</p>}
            </div>

            <div>
              <Input
                placeholder="EMAIL"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
              {errors.email && <p className="text-primary text-xs flex gap-1 items-center"><Info className="size-[0.75rem]"/> {errors.email}</p>}
            </div>

            <div>
              <Input
                placeholder="PHONE"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
              {errors.phone && <p className="text-primary text-xs flex gap-1 items-center"><Info className="size-[0.75rem]"/> {errors.phone}</p>}
            </div>

            <div>
              <Input
                placeholder="HOW CAN WE HELP YOU?"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full"
              />
              {errors.message && <p className="text-primary text-xs flex gap-1 items-center"><Info className="size-[0.75rem]"/> {errors.message}</p>}
            </div>

            <Button type="submit" variant="secondary" disabled={messageLoading}>
              {
                messageLoading ? (
                  <>
                  Sending 
                  <Loader2 className="animate-spin"/>
                  </>
                ) : "Send Message"
              }
            </Button>
          </form>
          </div>
          <div className="flex flex-col items-center justify-center p-6 bg-secondary md:rounded gap-10 w-full  ">
            <div className="md:block hidden">
            <Logo />
            </div>
            <div className="flex flex-col justify-center gap-8">
                <div className="flex items-center gap-3">
                    <Phone className="text-primary"/>
                    <p className="text-sm font-semibold">+91 1234567890</p>
                </div>
                <div className="flex items-center gap-3">
                    <Mail className="text-primary"/>
                    <p className="text-sm font-semibold">luxuryStay61@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="text-primary"/>
                    <p className="text-sm font-semibold">20, XYZ Street, karachi, Pakistan</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
