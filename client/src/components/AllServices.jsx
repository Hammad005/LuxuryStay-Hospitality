import { serviceStore } from "@/store/serviceStore";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Edit3, Trash2 } from "lucide-react";
import DeleteServiceAlert from "./DeleteServiceAlert";
import EditServiceDialog from "./EditServiceDialog";

const AllServices = () => {
  const { services } = serviceStore();
  const [selectedService, setSelectedService] = useState(null);
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [openEditService, setOpenEditService] = useState(false);
  return (
    <>
    <EditServiceDialog openEditService={openEditService} setOpenEditService={setOpenEditService} selectedService={selectedService} setSelectedService={setSelectedService} />
    <DeleteServiceAlert openDeleteService={openDeleteService} setOpenDeleteService={setOpenDeleteService} selectedService={selectedService} setSelectedService={setSelectedService} />
      <div className=" bg-background mt-4  rounded-lg border border-primary/80 p-4 overflow-x-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {services?.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-accent  rounded-lg border border-primary w-full"
              >
                <div className="flex items-center justify-between border-b border-primary p-2">
                  <h3 className="font-bold text-lg break-words whitespace-pre-wrap ">
                    {service.serviceName}
                  </h3>

                  <div className="flex gap-2">
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      onClick={() => {
                        setSelectedService(service);
                        setOpenEditService(true);
                      }}
                    >
                      <Edit3 />
                    </Button>
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => {
                        setSelectedService(service);
                        setOpenDeleteService(true);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-primary/80 break-words whitespace-pre-wrap px-2 pt-1">
                  Description:{" "}
                  <span className="text-white">
                    {service.serviceDescription}
                  </span>
                </p>
                <p className="text-sm font-semibold text-primary/80 break-words whitespace-pre-wrap px-2 py-1">
                  Price:{" "}
                  <span className="text-white">
                    Rs. {service.servicePrice}/-
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-xl font-semibold text-primary/80 ">
              No services available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllServices;
