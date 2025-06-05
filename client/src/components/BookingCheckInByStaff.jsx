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
import { checkInStore } from "@/store/checkInStore";
import { useNavigate } from "react-router-dom";
const BookingCheckInByStaff = ({openCheckIn, setOpenCheckIn, selectBooking, setSelectBooking}) => {
    const {createBookingCheckInByStaff, checkInLoading, resetSuccess} = checkInStore();
    const handleCheckIn = async () => {
        const response = await createBookingCheckInByStaff(selectBooking);
        if (response.success) {
            setSelectBooking(null);
            resetSuccess();
            setOpenCheckIn(false);
        }
    }
    
  return (
    <>
    <AlertDialog open={openCheckIn} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Check In</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure client want to check in the booking?
                <br />
                Booking Id: #{selectBooking?._id.slice(-4)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenCheckIn(false);
                setSelectBooking(null);
              }}
                disabled={checkInLoading}
                className={"cursor-pointer"}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={"md:w-30 text-background cursor-pointer hover:text-background/80"}
              onClick={handleCheckIn}
              disabled={checkInLoading}
            >
              {checkInLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Check In"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default BookingCheckInByStaff

