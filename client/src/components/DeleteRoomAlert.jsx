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
import { roomStore } from "@/store/roomStore";
import { Loader2 } from "lucide-react";

const DeleteRoomAlert = ({
  openAlert,
  setOpenAlert,
  selectedRoom,
  setSelectedRoom,
}) => {
  const { deleteRoom, roomLoading } = roomStore();

  const handleDeleteRoom = async () => {
    await deleteRoom(selectedRoom?._id);
    setSelectedRoom(null);
    setOpenAlert(false);
  };
  return (
    <>
      <AlertDialog open={openAlert} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Room</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the room{" "}
              <strong>{selectedRoom?.roomNumber}</strong> ? This action cannot
              be undone.
              <br />
              <strong>Room Details:</strong>
              <ul>
                <li>Room Type: {selectedRoom?.roomType}</li>
                <li>Room Status: {selectedRoom?.roomStatus}</li>
                <li>Room Floor: {selectedRoom?.roomFloor}</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenAlert(false);
                setSelectedRoom(null);
              }}
              disabled={roomLoading}
              className={"cursor-pointer"}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRoom}
              disabled={roomLoading}
              className={"md:w-24 text-background cursor-pointer hover:text-background/80"}
            >
              {roomLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Delete Room"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteRoomAlert;
