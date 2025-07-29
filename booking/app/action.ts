"use server"

import { requireUser } from "./lib/hooks";
import { prisma } from "./lib/prisma"
import { onboardingSchema, OnboardingSchemaValidation } from "./lib/zodSchema";
import {parseWithZod} from "@conform-to/zod"


export async function OnboardingAction(prevState:any ,formData:FormData){

    const session = await requireUser();
    
    const submission = await parseWithZod(formData,{
        schema: OnboardingSchemaValidation({
            async isUsernameUnique(userName : string) {
                const existingUsername = await prisma.user.findUnique
                where:{
                    userName: userName;
                }
            return !existingUsername;
            },
        }),
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.user.update({
        where :{
            id: session.user?.id,
        },
        data:{
            userName: submission.value.userName,
            name: submission.value.fullName,
        },

    });

}
