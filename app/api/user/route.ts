import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    fullName: z.string().min(2).max(50),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, fullName, password } = userSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUser) {
            return NextResponse.json({ 
                user: null, 
                message: "User Already Exist" 
            }, { 
                status: 409 
            })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                fullName,
                password: hashedPassword
            }
        })

        const { password: userPassword, ...userData } = newUser; 
        console.log(newUser)

        // return NextResponse.json({ "success": true });
        return NextResponse.json({ user: userData, message: "User Created Successfully"}, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: "Server Error!" }, { status: 500 });
    }
}