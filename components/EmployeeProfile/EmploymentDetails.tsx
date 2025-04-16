import DialogWrapper from "../DialogWrapper";
import EditEmployeeForm from "../forms/EditEmployeeForm";

interface PersonalInfoProps {
    id: string;
    jobTitle: string;
    department: string;
    contractType: string;
    startDate: Date;
}

const EmploymentDetails = ({ 
    id,
    jobTitle, 
    department,
    contractType,
    startDate
}: PersonalInfoProps) => {
    return (
        <section className="w-full">
            <h2 className="h3">
                Employment Details
                <DialogWrapper 
                dialogTitle="Edit Employee"
                triggerImageData={{
                    src: "/assets/icons/edit-brand.svg",
                    alt: "edit",
                    width: 18,
                    height: 18
                }}
                triggerStyle="shadow-none w-7 h-7 p-1 rounded-full cursor-pointer hover:bg-brand/30 relative left-0.5 -top-3"
                >
                    <EditEmployeeForm 
                    type="employment-details" 
                    data={JSON.stringify({
                        id, jobTitle, department, contractType,
                        startDate: new Date(startDate)
                    })}
                    />
                </DialogWrapper>    
            </h2>
            <div className="flex flex-wrap gap-x-10 gap-y-3 mt-5">
                <p className="subtitle-1">
                    Job Title:
                    <span className="body-1 ml-3">{jobTitle || "N/A"}</span> 
                </p>
                <p className="subtitle-1">
                    Department:
                    <span className="body-1 ml-3">{department || "N/A"}</span> 
                </p>
                <p className="subtitle-1">
                    Contract Type:
                    <span className="body-1 ml-3">{contractType || "N/A"}</span> 
                </p>
                <p className="subtitle-1">
                    Joined:
                    <span className="body-1 ml-3">{startDate.toDateString() || "N/A"}</span> 
                </p>
            </div>
        </section>
    );
}
 
export default EmploymentDetails;