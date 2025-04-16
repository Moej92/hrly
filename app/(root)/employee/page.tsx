import Image from "next/image";
import Link from "next/link";

import { getEmployees } from "@/lib/actions/employee.actions";
import { avatarPlaceholderUrl } from "@/constants";

const Page = async () => {
    const employees = await getEmployees();
    // if(!employees) return null;

    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1">
                    Employee
                </h1>

                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">0</span>
                    </p>

                    <div className="sort-container">
                        <p className="body-1 hidden text-light-200 sm:block">
                            
                        </p>
                        <Link
                            href="/employee/new"
                            className="bg-brand hover:bg-brand-100 transition-all rounded-full w-[40px] h-[40px] relative cursor-pointer "
                        >
                            <Image 
                                src="/assets/icons/add.svg"
                                alt="add icon"
                                fill
                            />
                        </Link>
                        
                    </div>
                </div>
            </section>

            {employees.length > 0 ? (
                <section className="employee-list">
                    {employees.map(({ id, fullName, startDate, jobTitle }) => (
                        <EmployeeCard 
                            key={id} 
                            id={id}
                            fullName={fullName}
                            startDate={startDate}
                            jobTitle={jobTitle}
                        />
                    ))}
                </section>
            ) : (
                <p className="body-1 empty-list">No results</p>
            )}
        </div>
        
    );
}

interface EmployeeCardProps {
    id: number;
    fullName: string;
    startDate: Date;
    jobTitle: string;
}

const EmployeeCard = ({
    id, fullName, startDate, jobTitle 
}: EmployeeCardProps) => {
    return (
        <Link href={`/employee/${id}`} className="employee-card">
            <div className="flex justify-between">
                <Image 
                    src={avatarPlaceholderUrl}
                    alt="profile image"
                    width={80}
                    height={80}
                    className="rounded-full"
                />

                <div className="flex flex-col items-end justify-between">
                    <p className="subtitle-2 line-clamp-1">
                        {jobTitle}
                    </p>
                    <p className="h1 text-light-200">#{id}</p>
                </div>
            </div>

            <div>
                <p className="body-1">{fullName}</p>
                <p className="body-2 text-light-100">
                    Joined: {startDate.toDateString()}
                </p>
            </div>
        </Link>
    );
}
 
export default Page;