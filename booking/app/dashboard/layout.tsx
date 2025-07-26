"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { DashboardLinkComponent } from "../components/DashboardLink";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "../components/ThemeToggle";
import { signOut, useSession } from "next-auth/react"; // <-- Import useSession
import { ReactNode, useEffect } from "react"; // Tambahkan useEffect
import { useRouter } from "next/navigation"; // <-- IMPORT INI

export default function DasboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const router = useRouter(); // <-- INISIALISASI useRouter

  const handleSignOut = async () => {
    // <-- TAMBAHKAN 'async' DI SINI
    // Panggil signOut() dan nonaktifkan redirect otomatis NextAuth.js
    await signOut({
      redirect: false, // <-- PENTING: Mencegah redirect otomatis NextAuth.js
    });

    // Setelah signOut selesai, paksa redirect manual ke halaman login atau home
    // Ganti '/auth/signin' dengan path halaman login atau home Anda
    router.push("/");
  };

  // Anda bisa tambahkan loading state seperti sebelumnya jika perlu
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div
        className="min-h-screen w-full grid md:grid-cols-[220px_1fr]
            lg:grid-cols-[220px_1fr] "
      >
        <div className="hidden md:block border-r bg-muted/40 ">
          <div className="flex h-full max-h-screen flex-col gap-2 ">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="size-8" />
                <p className="text-xl font-bold">
                  NAINU<span className="text-primary">Book</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinkComponent />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0"
                  size="icon"
                  variant="outline"
                >
                  <Menu className="size-5"></Menu>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DashboardLinkComponent />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <img
                      src={session?.user?.image as string}
                      alt="profile image"
                      width={20} // Tetapkan lebar intrinsik
                      height={20} // Tetapkan tinggi intrinsik
                      className="w-full h-full rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 mt-4" align="end">
                  <DropdownMenuLabel > <b>My Account</b> </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <button
                      className="w-full text-left"
                      onClick={handleSignOut} // Panggil fungsi logout di sini
                    >
                      Log Out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
