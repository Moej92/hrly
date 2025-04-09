import Image from "next/image";
import { Button } from "./ui/button";
import { signOut } from "@/lib/auth";

const Header = () => {
    return (
        <header className="header">
            Search

            <div className="flex-center min-w-fit gap-4">
                <form action={async () => {
                    "use server";
                    await signOut();
                }}>
                    <Button 
                        type="submit" 
                        className="h-[52px] min-w-[54px] items-center rounded-full bg-brand/10 p-0 text-brand shadow-none transition-all hover:bg-brand/20 cursor-pointer"
                    >
                        <Image 
                            src="/assets/icons/logout.svg"
                            alt="icon"
                            width={24}
                            height={24}
                            className="w-6"
                        />
                    </Button>
                </form>
            </div>
        </header>
    );
}
 
export default Header;