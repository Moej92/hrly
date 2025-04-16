"use client";

import { ReactNode, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogContext } from "@/context/DialogContext";

import Image from "next/image";

interface DialogProps {
    dialogTitle: string;
    triggerText?: string;
    triggerImageData?: {
        src: string;
        alt: string;
        width?: number;
        height?: number;
        fill?: boolean;
    };
    triggerStyle: string;
    children: ReactNode; 
}

const DialogWrapper = ({
    dialogTitle,
    triggerText,
    triggerStyle,
    triggerImageData,
    children 
}: DialogProps) => {
    const [open, setOpen] = useState(false);

    const closeDialog = () => setOpen(false);

    return (
        <DialogContext.Provider value={{ closeDialog }}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button 
                    type="button"
                    className={triggerStyle}
                    >
                        {triggerImageData && (
                            triggerImageData.fill ? (
                                <Image
                                    src={triggerImageData.src}
                                    alt={triggerImageData.alt}
                                    fill
                                />
                            ) : (
                                <Image 
                                    src={triggerImageData.src}
                                    alt={triggerImageData.alt}
                                    width={triggerImageData?.width}
                                    height={triggerImageData?.height}
                                />
                            )
                        )}
                        {triggerText}
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-0 max-h-screen overflow-auto sm:max-w-xl lg:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="">{dialogTitle}</DialogTitle>
                        <DialogDescription className="sr-only"></DialogDescription>
                            <DialogClose>
                                <div className="cursor-pointer absolute right-4 top-5 shadow-none w-[25px] h-[25px]">
                                    <Image 
                                        src="/assets/icons/close-dark.svg"
                                        alt="close"
                                        fill
                                    />
                                </div>
                            </DialogClose>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        </DialogContext.Provider>
    );
}
 
export default DialogWrapper;