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
import { messageStore } from "@/store/messageStore";
const DeleteMessageAlert = ({openDeleteMessage, setOpenDeleteMessage, selectedMessage, setSelectedMessage}) => {
    const {deleteMessage, messageLoading} = messageStore();

    const handleDelete = async () => {
      await deleteMessage(selectedMessage?._id);
      setSelectedMessage(null);
      setOpenDeleteMessage(false);
    };
  return (
    <>
    <AlertDialog open={openDeleteMessage} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to delete the message from{" "}
                <strong>{selectedMessage?.firstName} {selectedMessage?.lastName}</strong>?
                This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpenDeleteMessage(false);
                setSelectedMessage(null);
              }}
                disabled={messageLoading}
                className={"cursor-pointer"}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
                onClick={handleDelete}
                disabled={messageLoading}
              className={"md:w-30 text-background cursor-pointer hover:text-background/80"}
            >
              {messageLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Delete Message"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteMessageAlert