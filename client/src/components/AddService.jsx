import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Info,
  Loader2,
} from "lucide-react";
import { serviceStore } from "@/store/serviceStore";
import { Textarea } from "./ui/textarea";
const AddService = () => {
  const { createService, serviceLoading, resetSuccess } = serviceStore();
  const [data, setData] = useState({
    serviceName: "",
    serviceDescription: "",
    servicePrice: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!data.serviceName.trim()) {
      newErrors.serviceName = "Service Name is required.";
    }
    if (!data.serviceDescription.trim()) {
      newErrors.serviceDescription = "Service Description is required.";
    }
    if (!data.servicePrice) {
      newErrors.servicePrice = "Service Price is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const result = await createService(data); // Get the success value here

      if (result?.success) {
        // Reset the form
        setData({
          serviceName: "",
          serviceDescription: "",
          servicePrice: "",
        });
        setErrors({});
        resetSuccess(); // Reset success state
      }
    }
  };
  return (
    <>
      <div className="p-4 bg-background rounded-lg border border-primary/80 flex flex-col items-center justify-center min-h-[300px]">
        <h2 className="font-semibold md:text-3xl text-2xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 text-center">
          Add New Service
        </h2>
        <p className="md:text-sm text-xs text-primary/80 text-center md:w-1/2">
          Here you can add a new service to the system.
        </p>

        <div className="w-full md:w-1/2 sm:px-6 ">
          <form
            className="flex flex-col gap-4 items-center justify-center my-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1 w-full">
              <Input
                type="text"
                placeholder="Service Name"
                value={data.serviceName}
                onChange={(e) => setData({ ...data, serviceName: e.target.value })}
              />
              {errors.serviceName && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.serviceName}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Textarea
                placeholder="Service Description"
                value={data.serviceDescription}
                onChange={(e) => setData({ ...data, serviceDescription: e.target.value })}
              />
              {errors.serviceDescription && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.serviceDescription}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Input
                type="number"
                placeholder="Service Price"
                value={data.servicePrice}
                onChange={(e) => setData({ ...data, servicePrice: e.target.value })}
              />
              {errors.servicePrice && (
                <p className="text-primary text-xs flex gap-1 items-center">
                  <Info className="size-[0.75rem]" /> {errors.servicePrice}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="mt-2 lg:w-1/3"
              disabled={serviceLoading}
            >
              {serviceLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Add Service"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddService;
