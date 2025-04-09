"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

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
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email("Please enter a valid email address"),
        fullName: formType === "sign-up"
            ? z.string().min(2).max(50)
            : z.string().optional(),
        password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
        confirmPassword: formType === "sign-up" 
            ? z.string().min(8, "Password confirmation is required")
            : z.string().optional(),
    }).refine((data) => {
        if(formType === "sign-up") {
            return data.password === data.confirmPassword
        }
        return true;
    }, {
        message: "passwords do not match",
        path: ["confirmPassword"]
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          fullName: "",
          password: "",
          confirmPassword: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        
        if(type === "sign-up") {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    fullName: values.fullName,
                    password: values.password
                })
            });
            
            if(response.ok) {
                router.push("/sign-in")
            }
        } else {
            const signInData = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            });

            if(signInData?.error) {
                setErrorMessage("Incorrect Credentials");
                setIsLoading(false);    
            } else {
                router.replace("/");
            }
            
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8">
                    <h1 className="h1 text-center text-light-100 md:text-left">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </h1>

                    {type === "sign-up" && (
                        <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                                    <FormLabel>FullName</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter your email"
                                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                                            {...field} 
                                        />
                                    </FormControl>
                                </div>
    
                                <FormMessage className="text-red body-2 ml-4" />
                            </FormItem>
                        )}/>
                    )}
                    
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your email"
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter your email"
                                        className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                                        {...field} 
                                    />
                                </FormControl>
                            </div>

                            <FormMessage className="text-red text-[14px] leading-[20px] font-normal ml-4" />
                        </FormItem>
                    )}/>

                    {type === "sign-up" && (
                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex h-[78px] flex-col justify-center rounded-xl border border-light-300 px-4 shadow-drop-1">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Enter your email"
                                            className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-none shadow-none p-0 placeholder:text-light-200 text-[14px] leading-[20px] font-normal" 
                                            {...field} 
                                        />
                                    </FormControl>
                                </div>
    
                                <FormMessage className="text-red body-2 ml-4" />
                            </FormItem>
                        )}/>
                    )}
                    <Button 
                        type="submit"
                        disabled={isLoading}
                        className="text-[14px] leading-[20px] font-medium bg-brand hover:bg-brand-100 transition-all rounded-full h-[66px]"
                    >
                        {type === "sign-in" ? "Sign In" : "Sign Up"}

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
                </form>
            </Form>
        </>
    );
}
 
export default AuthForm;