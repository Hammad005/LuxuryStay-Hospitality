import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { parse, isValid, format } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function DateTime({ className, classNames, showOutsideDays = true, selected, onSelect, ...props }) {
  const [inputDate, setInputDate] = React.useState(selected ? format(selected, "yyyy-MM-dd") : "");
  const [selectedDate, setSelectedDate] = React.useState(selected || null);
  const [selectedTime, setSelectedTime] = React.useState(selected ? format(selected, "HH:mm") : "");
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());

  React.useEffect(() => {
    if (selected) {
      setInputDate(format(selected, "yyyy-MM-dd"));
      setSelectedDate(selected);
      setSelectedTime(format(selected, "HH:mm"));
      setCurrentMonth(selected);
    }
  }, [selected]);

  const handleDateInputChange = (e) => {
    const value = e.target.value;
    setInputDate(value);

    const parsed = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsed)) {
      setCurrentMonth(parsed);
    }
  };

  const handleCalendarSelect = (date) => {
    if (!date) return;
    // When selecting a date from calendar, keep previous time or reset time
    const time = selectedTime || "00:00";
    const [hours, minutes] = time.split(":");
    const dateTime = new Date(date);
    dateTime.setHours(Number(hours));
    dateTime.setMinutes(Number(minutes));

    setSelectedDate(dateTime);
    setCurrentMonth(date);
    setInputDate(format(dateTime, "yyyy-MM-dd"));
    onSelect?.(dateTime);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);

    if (!selectedDate) return; // no date selected yet, can't combine

    const [hours, minutes] = time.split(":");
    const newDateTime = new Date(selectedDate);
    newDateTime.setHours(Number(hours));
    newDateTime.setMinutes(Number(minutes));

    setSelectedDate(newDateTime);
    setInputDate(format(newDateTime, "yyyy-MM-dd"));
    onSelect?.(newDateTime);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="mx-2 mt-2">
        <Input
          type="text"
          placeholder="Search by date (YYYY-MM-DD)"
          value={inputDate}
          onChange={handleDateInputChange}
          className="w-full sm:w-64"
        />
      </div>

      <DayPicker
        selected={selectedDate}
        onSelect={handleCalendarSelect}
        mode="single"
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        showOutsideDays={showOutsideDays}
        className="px-3 pb-3 flex items-center justify-center"
        classNames={{
                  months: "flex flex-col sm:flex-row gap-2",
                  month: "flex flex-col gap-4",
                  caption: "flex justify-center pt-1 relative items-center w-full",
                  caption_label: "text-sm font-medium",
                  nav: "flex items-center gap-1",
                  nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  ),
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-x-1",
                  head_row: "flex",
                  head_cell:
                    "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
                    props.mode === "range"
                      ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                      : "[&:has([aria-selected])]:rounded-md"
                  ),
                  day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "size-8 p-0 font-normal aria-selected:opacity-100"
                  ),
                  day_range_start:
                    "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
                  day_range_end:
                    "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
                  day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day_outside:
                    "day-outside text-muted-foreground aria-selected:text-muted-foreground",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                  day_hidden: "invisible",
                  ...classNames,
                }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <ChevronLeft className={cn("size-4", className)} {...props} />
          ),
          IconRight: ({ className, ...props }) => (
            <ChevronRight className={cn("size-4", className)} {...props} />
          ),
        }}
        {...props}
      />

      {selectedDate && (
        <div className="mx-2 mb-2">
          <label className="block text-sm font-medium mb-1">Select Time:</label>
          <Input
            type="time"
            value={selectedTime}
            onChange={handleTimeChange}
            className="w-full sm:w-64"
          />
        </div>
      )}
    </div>
  );
}


export { DateTime };
