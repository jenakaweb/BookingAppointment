"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import GoogleLogo from "@/public/google.svg"
import { Loader2 } from "lucide-react";
import GithubLogo from "@/public/github.svg"
import { signIn } from 'next-auth/react'




export function GoogleAuthButton(){
    // useFormStatus bisa dipertahankan, tapi tidak mutlak diperlukan
    // jika tombol ini tidak memicu form action lainnya.
    // Untuk tujuan sign-in NextAuth.js, status 'pending' akan ditangani oleh NextAuth sendiri
    // (misalnya, selama redirect ke provider)
    // const { pending } = useFormStatus(); // Anda bisa hapus ini jika tidak digunakan

    const handleGoogleSignIn = () => {
        signIn("google"); // Panggil signIn di sini
    };

    return (
        // Hapus `pending` jika Anda tidak ingin menggunakan `useFormStatus`
        <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
            {/* Anda bisa menambahkan logika loading jika ingin menunjukkan spinner
                sebelum redirect, tapi NextAuth biasanya cukup cepat.
                Untuk saat ini, kita akan menghilangkan `pending` yang terkait dengan `useFormStatus` */}
            <Image src={GoogleLogo} alt="Google Logo" className="size-4 mr-2"/>
            Sign in with Google
        </Button>
    );
}


export function GithubAuthButton(){
    // const { pending } = useFormStatus(); // Anda bisa hapus ini

    const handleGithubSignIn = () => {
        signIn("github"); // Panggil signIn di sini
    };

    return (
        // Hapus `pending` jika Anda tidak ingin menggunakan `useFormStatus`
        <Button variant="outline" className="w-full" onClick={handleGithubSignIn}>
            <Image src={GithubLogo} alt="Github Logo" className="size-4 mr-2"/>
            Sign in with Github
        </Button>
    );
}