import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    if(!session) return redirect("/sign-in");
    
    if(!session.user?.name || !session.user?.email) return null;

    return (
        <main className="flex h-screen">
            <Sidebar 
                fullName={session.user.name} 
                email={session.user.email}
            />

            <section className="flex h-full flex-1 flex-col">
                <MobileNavigation 
                    fullName={session.user.name} 
                    email={session.user.email}
                />
                <Header />
                <div className="main-content">{children}</div>
            </section>
        </main>
    );
}
 
export default RootLayout;