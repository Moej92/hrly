"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import Image from "next/image";

import { addSalaryRecord, UpdateSalaryRecord } from "@/lib/actions/employee.actions";
import { useDialog } from "@/context/DialogContext";

const SalaryRecordForm = ({
    empID,
    empStartDate,
    type,
    recordID,
    recordAmount,
    recordStartDate
}: {
    empID: number;
    empStartDate: Date;
    type?: "add" | "update";
    recordID?: number;
    recordAmount?: number;
    recordStartDate?: Date;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { closeDialog } = useDialog();

    const formSchema = z.object({
        amount: z.coerce.number().min(100),
        startDate: z.string().date().refine((val) => new Date(val) >= new Date(empStartDate), {
            message: "Date should be after employee start date"
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          amount: recordAmount ? recordAmount : 0,
          startDate: recordStartDate ? recordStartDate?.toJSON().split("T")[0] : ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        let result;
        try {
            type === "add"
            ? result = await addSalaryRecord(values, empID)
            : result = await UpdateSalaryRecord(values, recordID)
            setSuccessMessage(
                type === "add"
                ? "Successfully Saved"
                : "Successfully Updated"
            );
        } catch(error) {
            setIsLoading(false);
            setErrorMessage("Server Error");
        } finally {
            setIsLoading(false);
            setTimeout(() => closeDialog(), 1000);
        }
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                <FormItem>
                    <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-3">
                        <FormLabel>Base Salary</FormLabel>
                        <FormControl>
                            <Input 
                                type="number"
                                placeholder="100"
                                className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                                {...field} 
                            />
                        </FormControl>
                    </div>
    
                    <FormMessage className="text-red body-2 ml-4" />
                </FormItem>
                )}/>
                <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
            <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-3">
                    <FormLabel>From</FormLabel>
                    <FormControl>
                        <Input 
                            type="date"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal block" 
                            {...field} 
                        />
                    </FormControl>
                </div>
                <FormMessage className="text-red body-2 ml-4" />
            </FormItem>
            )}/>
            </div>
            
            <Button type="submit"
                disabled={isLoading} 
                className="button cursor-pointer w-full bg-brand hover:bg-brand-100 rounded-full h-[50px] transition-all">
                Submit

                {isLoading && (
                    <Image
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={22}
                        height={22}
                        className="ml-2 animate-spin"
                    />
                )}
            </Button>

            {errorMessage && <p className="text-[14px] leading-[20px] font-normal mx-auto w-fit rounded-xl bg-error/5 px-8 py-4 text-center text-error">{errorMessage}</p>}

            {successMessage && <p className="text-[14px] leading-[20px] font-normal mx-auto w-fit rounded-xl bg-green/10 px-8 py-4 text-center text-green">{successMessage}</p>}
            </form>
        </Form>
);
}
 
export default SalaryRecordForm;