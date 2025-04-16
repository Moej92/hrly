import NewEmployeeForm from "@/components/forms/NewEmployeeForm";
import EmployeeProfile from "@/components/EmployeeProfile";

const Page = async ({ params }: { params: Promise<{ type: string }>}) => {
    const { type } = await params;

    if(type === "new") {
        return (
            <div className="page-container">
                <section className="w-full">
                    <h1 className="h1">
                        New Employee
                    </h1>
    
                    <NewEmployeeForm type={type} />
                </section>
            </div>
        );
    } else if(/^\d+$/.test(type)) {
        return <EmployeeProfile id={type} />
    } else {
        return null;
    }

    
}
 
export default Page;