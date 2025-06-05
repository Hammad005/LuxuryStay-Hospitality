import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roomStore } from "@/store/roomStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import DeleteRoomAlert from "./DeleteRoomAlert";
import { staffStore } from "@/store/staffStore";

const RoomsDetails = () => {
  const { staff } = staffStore();
  const { rooms } = roomStore();
  const uniqueFloors = [...new Set(rooms.map((room) => room.roomFloor))];

  const [filterOptions, setFilterOptions] = useState({
    roomFloor: "",
    roomType: "",
    roomStatus: "",
  });

  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const matchFloor = filterOptions.roomFloor
        ? room.roomFloor === filterOptions.roomFloor
        : true;

      const matchType = filterOptions.roomType
        ? room.roomType === filterOptions.roomType
        : true;

      const matchStatus = filterOptions.roomStatus
        ? room.roomStatus === filterOptions.roomStatus
        : true;

      return matchFloor && matchType && matchStatus;
    });

    setFilteredRooms(filtered);
  }, [filterOptions, rooms]);

  return (
    <>
      <DeleteRoomAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
      <div className="p-4 bg-background  rounded-lg border border-primary/80 flex flex-col items-center justify-center min-h-[300px] mt-4">
        <h2 className="font-semibold text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 justify-center">
          Room Details
        </h2>
        <p className="text-sm text-primary/80 text-center">
          {staff?.role === "Admin" || staff?.role === "General Manager"
            ? "Here you can view the details of the rooms in the system and manage them."
            : "Here you can view the details of the rooms in the system."}
        </p>
        <p className="text-sm text-end w-full mt-2">
          Total Rooms in hotel: {rooms.length}
        </p>

        <div className="flex items-center md:flex-row flex-col justify-center rounded-xl gap-2 p-3 my-4 bg-accent w-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
            <div className="w-full">
              <p className="text-xs md:text-sm  font-semibold ml-1 mb-1 text-primary/80">
                Room Floor:
              </p>
              <Select
                onValueChange={(floor) =>
                  setFilterOptions({ ...filterOptions, roomFloor: floor })
                }
                value={filterOptions.roomFloor}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose room floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Choose room floor" disabled>
                    Choose room floor
                  </SelectItem>
                  <SelectSeparator />
                  {uniqueFloors.map((floor) => (
                    <SelectItem key={floor} value={floor}>
                      {floor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="border-r border-primary h-12 hidden md:block" />

            <div className="w-full">
              <p className="text-xs md:text-sm font-semibold ml-1 mb-1 text-primary/80">
                Room Type:
              </p>

              <Select
                onValueChange={(type) =>
                  setFilterOptions({ ...filterOptions, roomType: type })
                }
                value={filterOptions.roomType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Business-Oriented">
                    Business-Oriented
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border-r border-primary h-12 hidden md:block" />

            <div className="w-full">
              <p className="text-xs md:text-sm font-semibold ml-1 mb-1 text-primary/80">
                Room Status:
              </p>

              <Select
                onValueChange={(status) =>
                  setFilterOptions({ ...filterOptions, roomStatus: status })
                }
                value={filterOptions.roomStatus}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose room status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() =>
              setFilterOptions({ roomFloor: "", roomType: "", roomStatus: "" })
            }
            variant={"secondary"}
            className={"md:w-auto w-full md:mt-5 mt-2"}
          >
            Reset Filters
          </Button>
        </div>

        <p className="text-xs text-primary/80 text-center font-semibold md:hidden mb-2">
          Scroll right or left to view more details
        </p>
        <Table>
          <TableHeader>
            <TableRow
              className={"bg-accent hover:bg-accent md:border border-primary"}
            >
              <TableHead>Room Floor</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Room Price</TableHead>
              <TableHead className="text-right">Room Status</TableHead>
              {(staff?.role === "Admin" || staff?.role === "General Manager") && (
                  <TableHead className="text-right">Action</TableHead>
                )}
            </TableRow>
          </TableHeader>
          <TableBody className={"md:border border-primary"}>
            {filteredRooms && filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.roomFloor}</TableCell>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>Rs. {room.roomPrice}/-</TableCell>
                  <TableCell className="text-right">
                    {room.roomStatus}
                  </TableCell>
                  {(staff?.role === "Admin" || staff?.role === "General Manager") && (
                      <TableCell className="text-right">
                        <Button
                          variant="secondary"
                          size={"icon"}
                          onClick={() => {
                            setOpenAlert(true);
                            setSelectedRoom(room);
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </TableCell>
                    )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No rooms found with the selected filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default RoomsDetails;
