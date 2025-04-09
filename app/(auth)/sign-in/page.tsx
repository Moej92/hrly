import AuthForm from "@/components/AuthForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
    const session = await auth();
    if(session) redirect("/");

    return <AuthForm type="sign-in" />
}
 
export default SignIn;