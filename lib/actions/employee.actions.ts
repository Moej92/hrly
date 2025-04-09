"use server";

import { prisma } from "../prisma";

interface FormData {
    fullName: string;
    email?: string;
    phone?: string;
    nationalID?: string;
    startDate: string;
    jobTitle: string;
    department: string;
    contractType: string;
}

export const addEmployee = async (formData: FormData) => {
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