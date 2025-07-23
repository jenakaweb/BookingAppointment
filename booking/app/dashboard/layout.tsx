import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from '@/public/logo.png'
import { DashboardLinkComponent } from "../components/DashboardLink"

export default function DasboardLayout({children} : { children : ReactNode }){
    return(
        <div>
            {/* <h1>Hello this is from layout</h1>
            {children} */}

            <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr]
            lg:grid-cols-[220px_1fr] ">
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

                    <DashboardLinkComponent/>
                </nav>
            </div>
                    </div>
                </div>

            </div>
        </div>
    )
}