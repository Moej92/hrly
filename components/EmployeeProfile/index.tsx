import { getEmployeeById } from "@/lib/actions/employee.actions";
import { Separator } from "../ui/separator";

import PersonalInfo from "./PersonalInfo";
import EmploymentDetails from "./EmploymentDetails";
import SalaryRecords from "./SalaryRecords";

const EmployeeProfile = async ({ id }: { id: string }) => {
    const empData = await getEmployeeById(Number(id));

    if(!empData) return <p>No Data</p>

    const { fullName, nationalID, email, phone, startDate, jobTitle, department, contractType, salaryRecords } = empData;

    return (
        <div className="page-container">
            <PersonalInfo 
                id={id}
                fullName={fullName}
                nationalID={nationalID ? nationalID : "N/A"}
                phone={phone ? phone : "N/A"}
                email={email ? email : "N/A"}
            />    

            <Separator className="bg-light-200/40" />

            <EmploymentDetails 
                id={id}
                jobTitle={jobTitle}
                department={department ? department : "N/A"}
                contractType={contractType}
                startDate={startDate}
            />

            <Separator className="bg-light-200/40" />

            <SalaryRecords 
                empID={id}
                empStartDate={startDate}
                records={salaryRecords}
            />
        </div>
    );
}
 
export default EmployeeProfile;