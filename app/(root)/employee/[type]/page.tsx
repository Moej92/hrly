import Image from "next/image";
import EmployeeForm from "@/components/modals/EmployeeForm";

const Page = async ({ params }: { params: Promise<{ type: string }>}) => {
    const { type } = await params;
    if(type !== "new" && type !== "edit") return null;

    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1">
                    New Employee
                </h1>

                <EmployeeForm type={type} />
            </section>
        </div>
    );
}
 
export default Page;