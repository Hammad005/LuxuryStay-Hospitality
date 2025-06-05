import { MessageCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { messageStore } from "@/store/messageStore";
import { Button } from "./ui/button";
import DeleteMessageAlert from "./DeleteMessageAlert";

const MessagesTab = () => {
  const { messages } = messageStore();
  const [openDeleteMessage, setOpenDeleteMessage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, [])
  return (
    <>
    <DeleteMessageAlert openDeleteMessage={openDeleteMessage} setOpenDeleteMessage={setOpenDeleteMessage} selectedMessage={selectedMessage} setSelectedMessage={setSelectedMessage} />
      <div className="flex flex-col w-full bg-accent border border-primary rounded-lg p-4">
        <h2 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2">
          <MessageCircle className="size-7 text-primary" />
          Messages
        </h2>
        <p className="text-sm text-primary/80">
          Here you can view and manage messages.
        </p>
        <p className="text-sm text-primary/80 text-end">
          Total Messages: {messages?.length}
        </p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className=" bg-background mt-4  rounded-lg border border-primary/80 p-4 overflow-x-auto"
        >
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {messages?.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message._id}
                  className="p-4 bg-accent  rounded-lg border border-primary w-full"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg break-words whitespace-pre-wrap">
                      {message.firstName} {message.lastName}
                    </h3>
                    <Button variant={"outline"} size={"icon"} 
                      onClick={() => {
                        setSelectedMessage(message);
                        setOpenDeleteMessage(true);
                      }}
                      
                      >
                      <Trash2 />
                    </Button>
                  </div>
                  <p className="text-sm text-primary/80">
                    Email: <span className="text-white break-words whitespace-pre-wrap">{message.email}</span>
                  </p>
                  <p className="text-sm text-primary/80 break-words whitespace-pre-wrap">
                    Phone: <span className="text-white">{message.phone}</span>
                  </p>
                  <p className="text-sm text-primary/80 break-words whitespace-pre-wrap">
                    Message: <span className="text-white">{message.message}</span>
                  </p>
                  <p className="text-sm text-primary/80 break-words whitespace-pre-wrap">
                    Date: <span className="text-white">{new Date(message.createdAt).toLocaleDateString()}</span>
                  </p>
                  <p className="text-sm text-primary/80 break-words whitespace-pre-wrap">
                    Time: <span className="text-white">{new Date(message.createdAt).toLocaleTimeString()}</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xl font-semibold text-primary/80 ">
                No messages available.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MessagesTab;
