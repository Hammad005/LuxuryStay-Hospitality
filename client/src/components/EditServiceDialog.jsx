import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { serviceStore } from "@/store/serviceStore";
import { Textarea } from "./ui/textarea";

const EditServiceDialog = ({
  openEditService, setOpenEditService, selectedService, setSelectedService,
}) => {
    const {updateService, resetSuccess, serviceLoading} = serviceStore();
  const [data, setData] = useState({
    serviceName: selectedService?.serviceName || "",
    serviceDescription: selectedService?.serviceDescription || "",
    servicePrice: selectedService?.servicePrice || "",
  });

  useEffect(() => {
    if (selectedService) {
      setData({
        serviceName: selectedService.serviceName,
        serviceDescription: selectedService.serviceDescription,
        servicePrice: selectedService.servicePrice,
      });
    }
  }, [selectedService]);

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
      const result = await updateService(selectedService._id, data); // Get the success value here

      if (result?.success) {
        // Reset the form
        setSelectedService(null);
        setErrors({});
        resetSuccess(); // Reset success state
        setOpenEditService(false);

      }
    }
  };

  const submitRef = useRef(null);

  return (
    <>
      <Dialog open={openEditService} onOpenChange={setOpenEditService}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Service Details</DialogTitle>
            <DialogDescription>
              Here you can update the details of the service in the system.
            </DialogDescription>
          </DialogHeader>

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

            <button
              type="submit"
              className="hidden"
              ref={submitRef}
            />
          </form>

          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                setSelectedService(null);
                setErrors({});
                setOpenEditService(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              variant={"secondary"}
              onClick={() => {
                submitRef.current?.click();
              }}
              disabled={serviceLoading}
            >
              {serviceLoading ? (
                <>
                  <Loader2 className="animate-spin size-4 mr-2" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditServiceDialog;
