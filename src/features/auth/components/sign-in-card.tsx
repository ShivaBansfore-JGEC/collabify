'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "./types";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const onPasswordSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
                setError("Invalid email or password")
            })
            .finally(() => {
                setPending(false);
            })
    }


    const handleProviderSignIn = (value: 'google' | 'github') => {
        signIn(value);
    }


    return <Card className="h-full w-full p-8">
        <CardHeader className="px-0 pt-0">
            <CardTitle>
                Login to continue
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
            <form onSubmit={onPasswordSignIn} className="space-y-2.5">
                <Input
                    disabled={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <Input
                    disabled={false}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Button disabled={false} type="submit" size={"lg"} className="w-full ">Continue</Button>
            </form>
            <Separator />
            <div className="flex flex-col gap-y-2.5">
                <Button
                    disabled={false}
                    variant={'outline'}
                    onClick={() => { }}
                    size={"lg"}
                    className="w-full relative"
                >
                    <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                    Continue with google
                </Button>
                <Button
                    disabled={false}
                    variant={'outline'}
                    onClick={() => handleProviderSignIn('github')}
                    size={"lg"}
                    className="w-full relative"
                >
                    <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                    Continue with github
                </Button>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Sign Up</span>
                </p>
            </div>
        </CardContent>

    </Card>
}

export default SignInCard;