"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEmployee } from "@/lib/actions/employee.actions";

const employeeSchema = z.object({
    fullName: z.string().min(3),
    email: z
    .string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Invalid email",
    }),
    phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Phone must be at least 6 characters",
    }),
    // gender: z.enum(["Male", "Female"]),
    // dob: z.date(),
    nationalID: z.string(),
    startDate: z.string(),
    jobTitle: z.string().min(2),
    department: z.string(),
    contractType: z.enum(["Full-Time", "Part-Time", "Freelance", "Intern"]),
})

const NewEmployeeForm = ({ type }: { type: "new" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof employeeSchema>>({
      resolver: zodResolver(employeeSchema),
      defaultValues: {
          fullName: "",
          email: "",
          phone: "",
          nationalID: "",
          // gender: "Male",
          // dob: "",
          jobTitle: "",
          department: "",
          startDate: "",
          contractType: "Full-Time", 
      },
  })

  async function onSubmit(values: z.infer<typeof employeeSchema>) {
      setIsLoading(true);
      try {
        let result; 
        result = await addEmployee(values)
        if(result?.error) {
          setIsLoading(false);
          setErrorMessage(result.error);
        } else {
          setIsLoading(false);
          setSuccessMessage("Successfully Saved");
          setTimeout(() => router.push("/employee"), 2000);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Error Occured");
      }
      
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

      {/* Personal Info Fields */}
      <div>
        <h2 className="h2 my-5">Personal Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Employee full name"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationalID"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Employee National id"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="johndoe@email.com"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="phone number"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Employment Details Fields */}
      <div>
        <h2 className="h2 my-5">Employment Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Employee Job Title"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Employee Department"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>Start Date *</FormLabel>
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
            )}
          />
          {/* {type === "edit" && (
            <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                        <Input
                            type="date"
                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                            {...field} 
                        />
                    </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}/>
          )} */}
          <FormField
            control={form.control}
            name="contractType"
            render={({ field }) => (
              <FormItem>
                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-2">
                  <FormLabel>Contract Type *</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value} 
                    >
                      <FormControl>
                        <SelectTrigger className="w-full outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 text-[14px] leading-[20px] font-normal">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-none text-[14px] leading-[20px] font-normal">
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Intern">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
  
                <FormMessage className="text-red body-2 ml-4" />
              </FormItem>
            )}
          />
          
        </div>
      </div>
      
      <Button type="submit" className="button mt-5 bg-brand hover:bg-brand-100 transition-all rounded-xl h-[66px] w-full lg:w-[49%] cursor-pointer">
        Submit
        
        {isLoading && (
          <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={24}
              height={24}
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
 
export default NewEmployeeForm;