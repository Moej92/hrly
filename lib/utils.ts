import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface Salary {
  id: number;
  amount: number;
  startDate: Date;
  endDate?: string | null; // Optional endDate property
}

export function processSalaries(salaries: Salary[]): Salary[] {
  // Return an empty array if the input is empty
  if (salaries.length === 0) {
      return [];
  }

  // Sort the salaries array by startDate
  salaries.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  
  // Create a new array to store the result
  const result: Salary[] = [];

  // Loop through the sorted array and calculate endDate
  for (let i = 0; i < salaries.length; i++) {
      const currentSalary: Salary = { ...salaries[i] }; // Create a copy of the current object
      if (i < salaries.length - 1) { // Check if there is a next salary
          const nextStartDate = new Date(salaries[i + 1].startDate);
          nextStartDate.setDate(nextStartDate.getDate() - 1); // Set endDate to the day before the next startDate
          currentSalary.endDate = nextStartDate.toISOString(); // Add endDate
      } else {
          currentSalary.endDate = null; // Last salary's endDate is null
      }
      result.push(currentSalary); // Add to the result array
    }

  return result;
}

// const salaries: Salary[] = [
//   { amount: 360, startDate: new Date('2020-05-01T00:00:00.000Z') },
//   { amount: 400, startDate: new Date('2023-08-01T00:00:00.000Z') },
//   { amount: 500, startDate: new Date('2025-04-01T00:00:00.000Z') },
// ];

// console.log(processSalaries(salaries));