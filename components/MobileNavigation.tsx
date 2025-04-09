"use client";

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
  
interface Props {
    fullName: string;
    email: string;
}

const MobileNavigation = ({ fullName, email }: Props) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="flex h-[60px] justify-between px-5 sm:hidden">
            <Image 
                src="/assets/icons/logo-full-brand.svg"
                alt="logo"
                width={120}
                height={52}
                className="h-auto"
            />

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <Image 
                    src="/assets/icons/menu.svg"
                    alt="search"
                    width={30}
                    height={30}
                />
            </SheetTrigger>
            <SheetContent className="pt-0 h-screen px-3 bg-white">
                <SheetTitle>
                    <div className="my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-brand/10 lg:justify-start lg:p-3">
                        <Image 
                            src={avatarPlaceholderUrl}
                            alt="avatar"
                            width={44}
                            height={44}
                            className="aspect-square w-10 rounded-full object-cover"
                        />
                        <div className="sm:hidden lg:block">
                            <p className="subtitle-2 capitalize">{fullName}</p>
                            <p className="caption">{email}</p>
                        </div>
                    </div>
                    <Separator className="mb-4 bg-light-200/20" />
                </SheetTitle>
                <nav className="h5 flex-1 gap-1 text-brand">
                    <ul className="flex flex-1 flex-col gap-4">
                        {navItems.map(({ url, name, icon }) => (
                            <Link 
                                key={name} 
                                href={url} 
                                className="lg:w-full"
                                onClick={() => setOpen(false)}    
                            >
                                <li className={cn(
                                    "flex text-light-100 gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-full",
                                    (
                                        pathname === url || 
                                        pathname.startsWith(url + "/")
                                    ) && "bg-brand text-white shadow-drop-2"
                                )}>
                                    <Image 
                                        src={icon}
                                        alt={name}
                                        width={24}
                                        height={24}
                                        className={cn(
                                            "w-6 filter invert opacity-25",
                                            (
                                                pathname === url || 
                                                pathname.startsWith(url + "/")
                                            )  && "invert-0 opacity-100"
                                        )}
                                    />

                                    <p>{name}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>

                <Separator className="my-5 bg-light-200/20" />

                <div className="flex flex-col justify-between gap-5 pb-5">
                    <Button 
                        type="submit"
                        className="flex h-[52px] w-full items-center gap-4 rounded-full bg-brand/10 px-6 text-brand shadow-none transition-all hover:bg-brand/20 h5"
                        onClick={() => signOut()}
                    >
                        <Image 
                            src="/assets/icons/logout.svg"
                            alt="logout"
                            width={24}
                            height={24}
                        />
                        <p>Logout</p>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>

        </header>
    );
}
 
export default MobileNavigation;