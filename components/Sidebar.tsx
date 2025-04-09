"use client";

import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    fullName: string;
    email: string;
}

const paths = ["employee"];

const Sidebar = ({ fullName, email }: Props) => {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            <Link href="/">
                <Image 
                    src="/assets/icons/logo-full-brand.svg"
                    alt="logo"
                    width={160}
                    height={50}
                    className="hidden h-auto lg:block"
                />

                <Image 
                    src="/assets/icons/logo-brand.svg"
                    alt="logo"
                    width={52}
                    height={52}
                    className="lg:hidden"
                />
            </Link>

            <nav className="h5 mt-9 flex-1 gap-1 text-brand">
                <ul className="flex flex-1 flex-col gap-6">
                    {navItems.map(({ url, name, icon }) => (
                        <Link key={name} href={url} className="lg:w-full">
                            <li className={cn(
                                "flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full", 
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
                                <p className="hidden lg:block">{name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <Image 
                src="/assets/images/time-management.png" 
                alt="logo"
                width={506}
                height={41}
                className="w-full"
            />

            <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-brand/10 p-1 text-light-100 lg:justify-start lg:p-3">
                    <Image 
                        src={avatarPlaceholderUrl}
                        alt="avatar"
                        width={44}
                        height={44}
                        className="aspect-square w-10 rounded-full object-cover"
                    />

                    <div className="hidden lg:block">
                        <p className="subtitle-2 capitalize">
                            {fullName}
                        </p>

                        <p className="caption">
                            {email}
                        </p>
                    </div>
            </div>
        </aside>
    );
}
 
export default Sidebar;