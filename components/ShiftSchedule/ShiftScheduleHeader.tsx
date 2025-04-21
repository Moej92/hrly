"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";

import { getStartOfWeek, formatWeekRange } from "@/lib/utils"
import { Button } from "../ui/button";
import Image from "next/image";

const ShiftScheduleHeader = () => {
    const [weekStartDate, setWeekStartDate] = useState(() => getStartOfWeek(new Date()))
    const [open, setOpen] = useState(false)

    const handleDatePick = (date: Date) => {
        setWeekStartDate(getStartOfWeek(date))
        setOpen(false)
    }

    return (
        <div className="max-w-full">
            <div className="flex">
                <Button
                    type="button"
                    className="cursor-pointer shadow-none bg-white rounded-tl-full rounded-bl-full border-r-2 border-light-200 hover:shadow-sm"
                    onClick={() => setWeekStartDate(prev => {
                    const newDate = new Date(prev)
                    newDate.setDate(newDate.getDate() - 7)
                    return newDate
                })}>
                    <Image 
                        src="/assets/icons/arrow-left.svg"
                        alt="arrow"
                        width={20}
                        height={20}
                    />
                </Button>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                    <Button
                    type="button" 
                    className="text-base sm:text-lg bg-white cursor-pointer">
                        {formatWeekRange(weekStartDate)}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={weekStartDate}
                            onSelect={(date) => date && handleDatePick(date)}
                            initialFocus
                        />
                        <Button
                        onClick={() => handleDatePick(new Date())}
                        className="w-full text-sm bg-brand hover:bg-brand-100 rounded-md"
                        >
                            This Week
                        </Button>
                    </PopoverContent>
                </Popover>

                <Button
                    type="button"
                    className="cursor-pointer shadow-none bg-white rounded-tr-full rounded-br-full border-l-2 border-light-200 hover:shadow-sm"
                    onClick={() => setWeekStartDate(prev => {
                    const newDate = new Date(prev)
                    newDate.setDate(newDate.getDate() + 7)
                    return newDate
                })}>
                    <Image 
                        src="/assets/icons/arrow-right.svg"
                        alt="arrow"
                        width={20}
                        height={20}
                    />
                </Button>
                </div>
        </div>
    );
}
 
export default ShiftScheduleHeader;