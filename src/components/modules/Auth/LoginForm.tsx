/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAction } from "@/app/(commonLayout)/(auth)/login/_action";
import { ILoginPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginForm() {

    const [serverError, setServerError] = React.useState<string | null>(null);

    const queryClient = useQueryClient();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: ILoginPayload) => loginAction(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["auth"],
            });
        },
    })

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            setServerError(null);
            try {
                const result = await mutateAsync(value) as any;
                if (!result.success) {
                    setServerError(result.message);
                }
            } catch (error) {
                setServerError(error instanceof Error ? error.message : "Something went wrong");
            }
        },
    })
    return (
        <div>
            <Card className="w-full max-w-md mx-auto shadow-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        Welcome Back!
                    </CardTitle>
                </CardHeader>
                <CardDescription className="">
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

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}