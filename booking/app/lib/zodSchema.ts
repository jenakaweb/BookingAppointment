import { conformZodMessage } from "@conform-to/zod";
import z from "zod";

export const onboardingSchema = z.object({
    fullName: z.string().min(3).max(150),
    userName: z
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/,{
        message:"username can only contain letter,number,symbol",
    }),
});

// export function OnboardingSchemaValidation({ options?:
//     isUsernameUnique:() => Promise<boolean>{

// }){
// return z.string().min(3).max(150),
//     userName: z
//     .string()
//     .min(3)
//     .max(150)
//     .regex(/^[a-zA-Z0-9-]+$/,{
//         message:"username can only contain letter,number,symbol",
//     }),
// .pipe(
//     z.string().superRefine((_,ctx)=>{
//         if(typeof options?.isUsernameUnique !==="function"){
//             ctx.addIssue({
//                 code:"custom",
//                 message:conformZodMessage.VALIDATION_UNDEFINED,
//                 fatal:true,
//             });
//             return;
//         }
//         return options.isUsernameUnique().then((isUnique)=>{
//             if(!isUnique){
//                 Ctx.addIssue({
//                     code:"custom",
//                     message:"Username is already used"
//                 })
//             }
//         })
//     })
// )
// fullName: z.string().min(3).max(150),
// });
// }



export function OnboardingSchemaValidation(options?: { // `options` bisa opsional
    isUsernameUnique?: (userName: string) => Promise<boolean>; // `isUsernameUnique` juga opsional
}) {
    // Mengembalikan schema objek yang diperluas dari onboardingSchema
    return onboardingSchema.extend({
        // Memperluas schema dasar untuk menambahkan validasi kustom pada field 'username'
        userName: onboardingSchema.shape.userName.superRefine(async (userName, ctx) => {
            // Memastikan username ada dan fungsi isUsernameUnique disediakan dan merupakan fungsi
            if (typeof options?.isUsernameUnique !== "function") {
                // Jika isUsernameUnique tidak disediakan atau bukan fungsi, tambahkan error fatal
                ctx.addIssue({
                    code:"custom", // Kode error kustom
                    message: conformZodMessage.VALIDATION_UNDEFINED, // Menggunakan pesan dari conform-to/zod
                    fatal: true, // Fatal error berarti validasi berhenti di sini
                    // path: ['userName'], // Penting: Tentukan path error
                });
                return; // Hentikan eksekusi superRefine
            }

            // Panggil fungsi isUsernameUnique secara asinkron
            const isUnique = await options.isUsernameUnique(userName);
            if (!isUnique) {
                // Jika username tidak unik, tambahkan issue (error) ke konteks Zod
                ctx.addIssue({
                    code: "custom", // Kode error kustom
                    message: "Nama pengguna ini sudah digunakan.", // Pesan error
                    // path: ['userName'], // Menentukan path error agar terkait dengan field 'username'
                });
            }
        }),
    });
}