import Image from "next/image";
import Link from "next/link";

const StaffPlannerPage = async () => {

    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 text-light-100">
                    Staff Planner
                </h1>
            </section>

            <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <Link
                    href="/staff-planner/attendace" 
                    className="bg-white relative p-5 rounded-xl shadow-drop-1 hover:shadow-green hover:shadow-lg">
                    <div className="flex items-center gap-5">
                        <div className="relative bg-green rounded-full flex justify-center w-16 h-16">
                        <Image 
                            src="/assets/icons/attendance.svg"
                            alt="schedule"
                            width={35}
                            height={35}
                        />  
                        </div>
                        <h2 className="h2 text-center">Attendance</h2>
                    </div>
                    <div className="flex flex-wrap gap-5 mt-5">
                        <p>Present: <span>18</span></p>
                        <p>Absent: <span>2</span></p>
                        <p>Late: <span>4</span></p>
                    </div>
                </Link>

                <Link
                href="/staff-planner/leave" 
                className="bg-white relative p-5 rounded-xl shadow-drop-1 hover:shadow-orange hover:shadow-lg">
                    <div className="flex items-center gap-5">
                        <div className="relative bg-orange rounded-full flex justify-center w-16 h-16">
                        <Image 
                            src="/assets/icons/vacation.svg"
                            alt="schedule"
                            width={35}
                            height={35}
                        />  
                        </div>
                        <h2 className="h2 text-center">Leave</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-5 mt-5">
                        <p>On Leave Today: <span>18</span></p>
                        <p>Upcoming Leaves: <span>2</span></p>
                    </div>
                </Link>

                <Link
                href="/staff-planner/shifts" 
                className="bg-white relative p-5 rounded-xl shadow-drop-1 hover:shadow-pink hover:shadow-lg">
                    <div className="flex items-center gap-5">
                        <div className="relative bg-pink rounded-full flex justify-center w-16 h-16">
                        <Image 
                            src="/assets/icons/schedule.svg"
                            alt="schedule"
                            width={35}
                            height={35}
                        />  
                        </div>
                        <h2 className="h2 text-center">Shifts</h2>
                    </div>
                    <div className="flex flex-wrap gap-x-5 mt-5">
                        <p>Employees Scheduled Today: <span>23</span></p>
                        <p>Unassigned Employees: <span>2</span></p>
                    </div>
                </Link>
            </section>
        </div>
    );
}
 
export default StaffPlannerPage;