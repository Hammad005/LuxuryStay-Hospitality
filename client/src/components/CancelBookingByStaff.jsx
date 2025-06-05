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
import { bookingStore } from "@/store/bookingStore";
const CancelBookingByStaff = ({open, setOpen, selectBooking, setSelectBooking}) => {
    const {cancelBookingByStaff, bookingLoading} = bookingStore();
    
    const handleCancelBooking = async () => {
        await cancelBookingByStaff(selectBooking?._id);
        setSelectBooking(null);
        setOpen(false);
    }
    
  return (
    <>
    <AlertDialog open={open} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to cancel the booking?
                <br />
                This action cannot be undone.
                Booking Id: #{selectBooking?._id.slice(-4)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
                setSelectBooking(null);
              }}
                disabled={bookingLoading}
                className={"cursor-pointer"}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={"md:w-30 text-background cursor-pointer hover:text-background/80"}
              onClick={handleCancelBooking}
              disabled={bookingLoading}
            >
              {bookingLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Done"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CancelBookingByStaff