import ShiftSchedule from "@/components/ShiftSchedule";
import Image from "next/image";
import Link from "next/link";

const Shiftspage = () => {
    return (
        <div className="page-container">
            <section className="w-full">
                <div className="flex justify-between">
                    <h1 className="h1 text-light-100">Shift Schedule</h1>
                    <Link 
                        href="/staff-planner/attendance"
                        className="hidden sm:flex bg-green/40 rounded-full py-1 px-2 hover:bg-green"
                    >
                        <Image 
                            src="/assets/icons/attendance.svg"
                            alt="tick"
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>
            </section>

            <ShiftSchedule />
        </div>
    );
}
 
export default Shiftspage;