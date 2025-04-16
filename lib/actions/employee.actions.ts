"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

interface NewEmployeeFormData {
    fullName: string;
    email?: string;
    phone?: string;
    nationalID?: string;
    startDate: string;
    jobTitle: string;
    department: string;
    contractType: string;
}

interface SalaryRecordsFormData {
    amount: number;
    startDate: string;
}

export const addEmployee = async (formData: NewEmployeeFormData) => {
    const { fullName, email, phone, nationalID, startDate, jobTitle, department, contractType} = formData;
    
    if(!fullName || !jobTitle || !contractType || !startDate) {
        return { error: "Required fields Missing" };
    }

    try {
        await prisma.employee.create({
            data: {
                fullName,
                email,
                phone,
                nationalID,
                startDate: new Date(startDate),
                jobTitle,
                department,
                contractType
            }
        });
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`Error has occurred`);
    }
} 

// need editing
export const updateEmployee = async (formData: any, id: number, type: string) => {
    if(!formData) return { error: "error"}
    
    try {
        type === "personal-info"
        ? await prisma.employee.update({
            where: { id },
            data: {
                fullName: formData.fullName,
                nationalID: formData.nationalID,
                email: formData.email,
                phone: formData.phone,
            } 
        })
        : await prisma.employee.update({
            where: { id },
            data: {
                jobTitle: formData.jobTitle,
                department: formData.department,
                startDate: new Date(formData.startDate),
                contractType: formData.contractType
            } 
        })
    } catch (error: any) {
        throw new Error(`Update employee error | ${error.message}`)
    }

    revalidatePath("/employee");
}

export const getEmployees = async () => {
    try {
        const employees = await prisma.employee.findMany();
        // console.log(employees);
        return employees
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Server Error | Please try again...");
    }
}

export const getEmployeeById = async (id: number) => {
    try {
        const empData = await prisma.employee.findUnique({
            where: { id },
            include: {
                salaryRecords: true
            }
        });

        return empData;
    } catch (error: any) {
        console.log(error.message);
        throw new Error("Server Error");
    }
}

export const addSalaryRecord = async (formData: SalaryRecordsFormData, empID: number) => {
    try {
        await prisma.salaryRecord.create({
            data: {
                employeeId: empID,
                amount: formData.amount,
                startDate: new Date(formData.startDate)
            }
        });
    } catch (error: any) {
        console.log(error.message);
        throw new Error(`Database Error | ${error.message}`);
    }
}

export const UpdateSalaryRecord = async (formData: SalaryRecordsFormData, recordID: number | undefined) => {
    if(!recordID) return { error: "Record id missing" }

    try {
        await prisma.salaryRecord.update({
           where: { id: recordID },
           data: {
            amount: formData.amount,
            startDate: new Date(formData.startDate)
           } 
        });

        revalidatePath("/employee");
    } catch (error: any) {
        console.log(error.message)
        throw new Error(`Server Error | ${error.message}`)
    }
}