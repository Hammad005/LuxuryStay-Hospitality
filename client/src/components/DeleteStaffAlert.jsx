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
import { staffStore } from "@/store/staffStore";

const DeleteStaffAlert = ({openDeleteStaffAlert, setOpenDeleteStaffAlert, selectedStaff, setSelectedStaff}) => {
    const {staffLoading, deleteStaff} = staffStore();

    const handleDeleteStaff = async () => {
        await deleteStaff(selectedStaff._id);
        setSelectedStaff(null);
        setOpenDeleteStaffAlert(false);
    }
  return (
    <>
    <AlertDialog open={openDeleteStaffAlert} >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Staff</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete the senior staff member,{" "}
                    <br />
                    <strong>{selectedStaff?.name} ({selectedStaff?.role})</strong>?
                    This action cannot be undone.
                    
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setOpenDeleteStaffAlert(false);
                    setSelectedStaff(null);
                  }}
                    className={"cursor-pointer"}
                    disabled={staffLoading}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={"md:w-30 text-background cursor-pointer hover:text-background/80"}
                  onClick={handleDeleteStaff}
                >
                  {staffLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Delete Staff"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
    </>
  )
}

export default DeleteStaffAlert