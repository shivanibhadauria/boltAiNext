import React from 'react'
import { Settings , MessageCircleQuestionMark  , Wallet , LogOut  } from 'lucide-react';

import { Button } from "../ui/button";

const SideBarFooter = () => {

    const options =[
        {
            name: 'setting',
            icon:Settings,
        },
        {
            name: 'Help Center',
            icon:MessageCircleQuestionMark,
        },
        {
            name: 'My Subscription',
            icon:Wallet,
        },
        {
            name: 'Sigh Out',
            icon:LogOut,
        },
    ]
  return (
    <div className='p-5 mb-10'>
        {options.map((option, index) =>
        (
            <Button variant='ghost' className="w-full flex justify-start" key={index} >


                <icon/>
                {option.name}
            </Button>
        )
        )}

    </div>
  )
}

export default SideBarFooter