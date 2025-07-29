"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { OnboardingAction } from "../action";
import {useForm} from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../lib/zodSchema";
import { SubmitButton } from "../components/SubmitButton";



export default function OnboardingRoute() {

  const [lastResult, action] = useActionState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({formData}){
      return parseWithZod(formData,{
        schema: onboardingSchema,
      })
    },

    shouldValidate: "onBlur", 
    shouldRevalidate: "onInput"

  });

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome to <span className="text-blue-500"> NAINU </span>{" "}
          </CardTitle>
          <CardDescription>
            {" "}
            We need the following to setup your profile
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input name={fields.fullName.name} defaultValue={fields.fullName.initialValue as string | undefined}
              key={fields.fullName.key} placeholder="noverio" />
              <p className="text-red-500">{fields.fullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>Username</Label>
              <div className="flex rounded-md">
                <span
                  className="inline-flex items-center px-4 rounded-l-md border
                            border-r-0 border-input bg-accent text-muted-foreground text-sm"
                >
                  soraselfstudio.com/
                </span>
                <Input name={fields.userName.name} defaultValue={fields.userName.initialValue as string | undefined}
              key={fields.userName.key} placeholder="example-user" className="rounded-l-none" />
              </div>
              <p className="text-red-500">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
