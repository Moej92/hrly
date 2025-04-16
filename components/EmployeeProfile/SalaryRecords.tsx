import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import SalaryRecordForm from "../forms/SalaryRecordForm";
import { processSalaries } from "@/lib/utils";
import DialogWrapper from "../DialogWrapper";

const SalaryRecords = ({ 
    empID,
    empStartDate,
    records 
}: { 
    empID: string;
    empStartDate: Date;
    records: {
        id: number;
        startDate: Date;
        amount: number;
}[]}) => {
    return (
        <section className="w-full">
            <div className="flex justify-between items-start">
                <h2 className="h3">Salary</h2>
                {/* can add salary history button */}
            </div>
            {records.length === 0 
                ? <div className="body-1 empty-list">
                    <p className="mb-2">No Salary Records yet</p>
                    <DialogWrapper 
                        dialogTitle="Add Salary Record"
                        triggerText="Add Salary Record"
                        triggerStyle="text-dark-200 rounded-full bg-brand hover:bg-brand-100 cursor-pointer"
                        >
                            <SalaryRecordForm 
                                empID={Number(empID)}
                                empStartDate={empStartDate}
                                type="add"
                            />
                        </DialogWrapper>
                </div> 
                : 
                <Table className="mt-5 md:w-[90%]">
                    <TableHeader>
                        <TableRow className="border-none">
                            <TableHead className="subtitle-1">Base Salary</TableHead>
                            <TableHead className="subtitle-1">Effective Date</TableHead>
                            <TableHead className="subtitle-1">End Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...processSalaries(records)].reverse().map((record) => (
                        <TableRow 
                            key={record.startDate.toString()}
                            className="border-none"
                        >
                            <TableCell className="body-1">{record.amount}</TableCell>
                            <TableCell className="body-1">{record.startDate.toDateString().slice(4)}</TableCell>
                            <TableCell className="body-1">{record.endDate ? new Date(record.endDate).toDateString().slice(4) : "present"}</TableCell>
                            <TableCell className="body-1 text-right">
                            <DialogWrapper 
                            dialogTitle="Update Salary Record"
                            triggerImageData={{
                                src: "/assets/icons/edit-2.svg",
                                alt: "edit",
                                fill: true
                            }}
                            triggerStyle="shadow-none p-1 rounded-full cursor-pointer hover:bg-light-100 relative w-7"
                            >
                                <SalaryRecordForm 
                                    empID={Number(empID)}
                                    empStartDate={empStartDate}
                                    recordID={record.id}
                                    recordAmount={record.amount}
                                    recordStartDate={record.startDate}
                                    type="update"
                                />
                            </DialogWrapper>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter className="border-none">
                        <TableRow>
                            <TableCell>
                            <DialogWrapper 
                                dialogTitle="Add Salary Record"
                                triggerImageData={{
                                    src: "/assets/icons/add.svg",
                                    alt: "edit",
                                    fill: true
                                }}
                                triggerStyle="text-dark-200 rounded-full bg-brand hover:bg-brand-100 cursor-pointer relative -left-2 p-0 w-10 h-7"
                                >
                                <SalaryRecordForm 
                                    empID={Number(empID)}
                                    empStartDate={empStartDate}
                                    type="add"
                                />
                                </DialogWrapper>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            }
        </section>
    );
}
 
export default SalaryRecords;