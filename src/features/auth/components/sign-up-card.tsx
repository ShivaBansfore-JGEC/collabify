'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "./types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignUpCardProps) => {

    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const onPasswordSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);
        if (password !== confirmPassword) {
            setError("password and confirmpassword is not same!");
            return;
        }
        setPending(true);
        signIn("password", { email, password, flow: 'signUp' })
            .catch(() => {
                setError('Something went wrong!');
            }).finally(() => {
                setPending(false);
            })
    }


    const handleProviderSignUp = (value: 'google' | 'github') => {
        setPending(true);
        signIn(value)
            .finally(() => {
                setPending(false)
            })
    }

    return <Card className="h-full w-full p-8">
        <CardHeader className="px-0 pt-0">
            <CardTitle>
                Sign Up to continue
            </CardTitle>
            <CardDescription>
                Use your email or another service to continue
            </CardDescription>
        </CardHeader>
        {!!error && <div
            className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6"
        >
            <TriangleAlert className="size-4" />
            <p>{error}</p>
        </div>}
        <CardContent className="space-y-5 px-0 pb-0">
            <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                <Input
                    disabled={pending}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <Input
                    disabled={pending}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Input
                    disabled={pending}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    type="password"
                    required
                />
                <Button disabled={pending} type="submit" size={"lg"} className="w-full ">Continue</Button>
            </form>
            <Separator />
            <div className="flex flex-col gap-y-2.5">
                <Button
                    disabled={pending}
                    variant={'outline'}
                    onClick={() => { }}
                    size={"lg"}
                    className="w-full relative"
                >
                    <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                    Continue with google
                </Button>
                <Button
                    disabled={pending}
                    variant={'outline'}
                    onClick={() => handleProviderSignUp('github')}
                    size={"lg"}
                    className="w-full relative"
                >
                    <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                    Continue with github
                </Button>
                <p className="text-xs text-muted-foreground">
                    Already have an account? <span onClick={() => setState("signIn")} className="text-sky-700 hover:underline cursor-pointer">Sign In</span>
                </p>
            </div>
        </CardContent>

    </Card>
}

export default SignUpCard;