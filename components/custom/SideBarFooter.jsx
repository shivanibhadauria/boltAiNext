import React from 'react'
import { Settings , MessageCircleQuestion  , Wallet , LogOut  } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from "../ui/button";

const SideBarFooter = () => {

    const router = useRouter();

    const options =[
        {
            name: 'setting',
            icon:Settings,
        },
        {
            name: 'Help Center',
            icon:MessageCircleQuestion,
        },
        {
            name: 'My Subscription',
            icon:Wallet,
            path:'/pricing',
        },
        {
            name: 'Sigh Out',
            icon:LogOut,
        },
    ]

    const pathClicked = (path) => {
        if(path){
            router.push(path);
        }
        
    }
  return (
    <div className='p-5 mb-10'>
        {options.map((option, index) =>{
         const Icon = option.icon; 
         return (
            <Button variant='ghost' className="w-full flex justify-start my-3" key={index} onClick={() => pathClicked(option.path)} >


                <Icon/>
                {option.name}
            </Button>
        )}
        )}

    </div>
  )
}

export default SideBarFooter