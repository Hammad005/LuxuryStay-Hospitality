import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { serviceStore } from "@/store/serviceStore";
const DeleteServiceAlert = ({
  openDeleteService,
  setOpenDeleteService,
  selectedService,
  setSelectedService,
}) => {
    const {deleteService, serviceLoading} = serviceStore();
    const handleDelete = async () => {
      await deleteService(selectedService?._id);
      setSelectedService(null);
      setOpenDeleteService(false);
    };

  return (
    <>
      <AlertDialog open={openDeleteService}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the service from system,{" "}
              <strong>{selectedService?.serviceName}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenDeleteService(false);
                setSelectedService(null);
              }}
              disabled={serviceLoading}
              className={"cursor-pointer"}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className={
                "md:w-30 text-background cursor-pointer hover:text-background/80"
              }
            >
              {serviceLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Delete Service"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteServiceAlert;
