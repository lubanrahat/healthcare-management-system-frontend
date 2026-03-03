/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "@/app/(commonLayout)/(auth)/login/_action";
import { ILoginPayload, loginSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppFiels from "@/components/shared/form/AppFiels";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";

export default function LoginForm() {

    const [serverError, setServerError] = React.useState<string | null>(null);
    const [showPassword, setShowPassword] = React.useState(false);

    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["auth"],
            });
        },

        onError: (error: any) => {
            setServerError(error?.message || "Login failed");
        },
    });

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },

        onSubmit: async ({ value }) => {
            setServerError(null);

            const safeParse = loginSchema.safeParse(value);

            if (!safeParse.success) {
                setServerError(
                    safeParse.error.issues
                        .map((err) => err.message)
                        .join(", ")
                );
                return;
            }

            await mutateAsync(safeParse.data);
        },
    });
    return (
        <div>
            <Card className="w-full max-w-md mx-auto shadow-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        Welcome Back!
                    </CardTitle>
                </CardHeader>
                <CardDescription className="text-center">
                    Please enter your credentials to login.
                </CardDescription>
                <CardContent>
                    <form
                        className="space-y-4"
                        method="POST"
                        action="#"
                        noValidate
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit()
                        }}
                    >

                        <form.Field
                            name="email"
                            validators={{ onChange: loginSchema.shape.email }}
                        >
                            {(field) => (
                                <AppFiels
                                    field={field}
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    className="w-full"
                                />
                            )}
                        </form.Field>

                        <form.Field
                            name="password"
                            validators={{ onChange: loginSchema.shape.password }}
                        >
                            {(field) => (
                                <AppFiels
                                    field={field}
                                    type={showPassword ? "text" : "password"}
                                    label="Password"
                                    placeholder="Enter your password"
                                    className="w-full"
                                    append={
                                        <Button onClick={() => setShowPassword((prev) => !prev)} variant={"ghost"} size={"icon"}>
                                            {showPassword ? <EyeOff className="size-4 cursor-pointer" aria-hidden="true" /> : <Eye className="size-4 cursor-pointer" aria-hidden="true" />}
                                        </Button>
                                    }
                                />
                            )}
                        </form.Field>

                        {serverError && (
                            <p className="text-sm text-red-500">{serverError}</p>
                        )}

                        <div className="text-right">
                            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        {serverError && (
                            <Alert variant={"destructive"}>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{serverError}</AlertDescription>
                            </Alert>
                        )}


                        <form.Subscribe
                            selector={(s) => [s.canSubmit] as const}
                        >
                            {([canSubmit]) => (
                                <AppSubmitButton disabled={!canSubmit || isPending}>
                                    {isPending ? "Logging in..." : "Login"}
                                </AppSubmitButton>
                            )}
                        </form.Subscribe>
                    </form>

                    <div className="relativ my-6">

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}