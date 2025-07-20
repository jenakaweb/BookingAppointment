// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../lib/auth"; // Pastikan jalur ini benar
import { requireUser } from "../lib/hooks";


export default async function DashboardPage() { // <--- TAMBAHKAN 'async' DI SINI
  
    const session = await requireUser();

  return (
    <div>
        <h1>HEllO word from dasboard page</h1>
    </div>
    
  );
}