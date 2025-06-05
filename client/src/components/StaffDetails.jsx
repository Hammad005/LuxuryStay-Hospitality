import { staffStore } from "@/store/staffStore";
import {
  BadgeDollarSign,
  BriefcaseBusiness,
  BrushCleaning,
  Edit3,
  HeartHandshake,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { format } from "date-fns";
import DeleteStaffAlert from "./DeleteStaffAlert";
import EditStaffDialog from "./EditStaffDialog";

const StaffDetails = () => {
  const { staff, allStaff } = staffStore();
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [openDeleteStaffAlert, setOpenDeleteStaffAlert] = useState(false);
  const [openEditStaffAlert, setOpenEditStaffAlert] = useState(false);

  useEffect(() => {
    console.log("Selected Staff:", selectedStaff);
    
  }, [selectedStaff]);
  

  const [tabs, setTabs] = useState(staff?.role === "Admin" ? "General Manager" : "Receptionist");

  const filteredStaff = allStaff?.filter((staff) => staff.role === tabs);

  const roles = [
    { name: "General Manager", icon: BriefcaseBusiness, show: staff?.role === "Admin" },
    { name: "Receptionist", icon: HeartHandshake, show: true },
    { name: "Marketing Manager", icon: BadgeDollarSign, show: true },
    { name: "Security Manager", icon: ShieldCheck, show: true },
    { name: "Housekeeping Manager", icon: BrushCleaning, show: true },
  ];
  return (
    <>
    <EditStaffDialog openEditStaffAlert={openEditStaffAlert} setOpenEditStaffAlert={setOpenEditStaffAlert} selectedStaff={selectedStaff} setSelectedStaff={setSelectedStaff} />
    <DeleteStaffAlert openDeleteStaffAlert={openDeleteStaffAlert} setOpenDeleteStaffAlert={setOpenDeleteStaffAlert} selectedStaff={selectedStaff} setSelectedStaff={setSelectedStaff} />
      <div className="p-4 bg-background  rounded-lg border border-primary/80 flex flex-col items-center justify-center min-h-[300px] mt-4">
        <h2 className="font-semibold text-2xl md:text-3xl text-shadow-md text-shadow-black font-serif flex items-center gap-2 justify-center text-center">
          Senior Staff Details
        </h2>
        <p className="text-xs md:text-sm text-primary/80 text-center">
          Here you can view the details of the senior staff in the system and
          manage them.
        </p>

        <div className="my-6 w-full border-b border-primary/30 lg:flex hidden">
          {roles.map(
            (role) =>
              role.show && (
                <p
                  key={role.name}
                  className={`flex items-center gap-1 ${
                    tabs === role.name
                      ? "border-b-2 border-primary"
                      : "border-b-2 border-transparent text-white/70"
                  } px-auto w-full justify-center text-sm cursor-pointer font-semibold`}
                  onClick={() => setTabs(role.name)}
                >
                  {
                    <role.icon
                      strokeWidth={1.5}
                      className="size-4.5 xl:block hidden"
                    />
                  }{" "}
                  {role.name + "s"}
                </p>
              )
          )}
        </div>
        <div className="lg:hidden my-6 w-full">
          <Select onValueChange={(value) => setTabs(value)} value={tabs}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Select Role" disabled>
                Select Role
              </SelectItem>
              <SelectSeparator />
              {roles.map(
                (role) =>
                  role.show && (
                    <SelectItem
                      key={role.name}
                      value={role.name}
                      className="flex items-center gap-2"
                    >
                      {<role.icon strokeWidth={1.5} className="size-4" />}{" "}
                      {role.name + "s"}
                    </SelectItem>
                  )
              )}
            </SelectContent>
          </Select>
        </div>

<p className="text-xs text-primary/80 text-center font-semibold xl:hidden mb-2">
          Scroll right or left to view more details
        </p>
        <Table>
          <TableHeader>
            <TableRow
              className={"bg-accent hover:bg-accent md:border border-primary"}
            >
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Eduction</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Join Date</TableHead>
              {(staff?.role === "Admin" || staff?.role === "General Manager") && (
                  <TableHead className={'text-right'}>Action</TableHead>
                )}
            </TableRow>
          </TableHeader>
          <TableBody className={"md:border border-primary"}>
            {filteredStaff.length > 0 ? (
              filteredStaff?.map((staffs) => (
                <TableRow key={staffs._id}>
                  <TableCell>{staffs.name}</TableCell>
                  <TableCell>{staffs.email}</TableCell>
                  <TableCell>{staffs.contact}</TableCell>
                  <TableCell>{staffs.education}</TableCell>
                  <TableCell>{staffs.gender}</TableCell>
                  <TableCell>
                    {format(staffs.dob, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{staffs.role}</TableCell>
                  <TableCell>Rs. {staffs.salary}/-</TableCell>
                  <TableCell>
                    {format(staffs.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                  {(staff?.role === "Admin" ||staff?.role === "General Manager") && (
                      <TableCell className="flex gap-2 justify-end">
                        <Button variant="outline" size={"icon"}
                          onClick={() => {
                            setSelectedStaff(staffs);
                            setOpenEditStaffAlert(true);
                          }}
                        >
                          <Edit3 />
                        </Button>
                        <Button variant="secondary" size={"icon"}
                          onClick={() => {
                            setSelectedStaff(staffs);
                            setOpenDeleteStaffAlert(true);
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
                <TableCell colSpan={10} className="text-center">
                  No staff found in {tabs.toLowerCase()}s role.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default StaffDetails;
