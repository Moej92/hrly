import DialogWrapper from "../DialogWrapper";
import EditEmployeeForm from "../forms/EditEmployeeForm";

interface PersonalInfoProps {
    id: string;
    fullName: string;
    nationalID: string;
    phone: string;
    email: string;
}

const PersonalInfo = ({ fullName, id, nationalID, phone, email }: PersonalInfoProps) => {

    return (
        <>
            <section className="w-full flex justify-between gap-2">
                <h1 className="h1 capitalize gap-1">
                    {fullName}
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
                            type="personal-info" 
                            data={JSON.stringify({
                                id, fullName, nationalID, phone, email
                            })}
                        />
                    </DialogWrapper>
                </h1>
                <span className="h1 text-light-200">#{id}</span>
            </section>

            <section className="w-full flex flex-wrap gap-x-10 gap-y-3">
                <p className="subtitle-1">
                    National ID:
                    <span className="body-1 ml-3">{nationalID || "N/A"}</span> 
                </p>
                <p className="subtitle-1">
                    Phone:
                    <span className="body-1 ml-3">{phone || "N/A"}</span> 
                </p>
                <p className="subtitle-1">
                    Email:
                    <span className="body-1 ml-3">{email || "N/A"}</span> 
                </p>
            </section>
        </>
    );
}
 
export default PersonalInfo;