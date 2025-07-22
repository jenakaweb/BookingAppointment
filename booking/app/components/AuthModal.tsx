
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Logo from '@/public/logo.png'
import { signIn } from 'next-auth/react'
import { GoogleAuthButton } from './SubmitButton'
import { GithubAuthButton } from './SubmitButton'

const AuthModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
            <Button>Try to Free</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
            <DialogHeader className='flex flex-row justify-center items-center gap-2'>
                <Image src={Logo} alt='Logo' className='size-10' />
                <DialogTitle className='text-3xl font-semibold'>
                    <span className='text-primary'>NAINU</span>BOOK
                </DialogTitle>
            </DialogHeader>
            <div className='flex flex-col mt-5 gap-3'>
             
                <GoogleAuthButton/>
              
              
                <GithubAuthButton/>
              
            </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AuthModal
