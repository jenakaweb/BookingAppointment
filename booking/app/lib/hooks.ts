// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../lib/auth"; // Pastikan jalur ini benar


export async function requireUser() { // <--- TAMBAHKAN 'async' DI SINI
  const session = await auth();

  if (!session?.user){
    return redirect("/");
  }

  return session;
  
}