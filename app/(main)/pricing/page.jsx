"use client";
import Lookup from '@/app/data/Lookup'
import React from 'react'
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const pricing = () => {
  const {userDetail, setUserDetail} = useContext(UserContext);
  return (
    <div className='mt-20 flex items-center flex-col  ' >
      <h2 className='font-bold text-5xl' >Pricing</h2>
      <p className='text-gray-400 max-w-xl text-center mt-4 ' >{Lookup.PRICING_DESC } </p>
      <div className=' p-4 border rounded-xl' >
        <h2 className='text-lg ' > <span className='font-bold' >{userDetail?.token}</span> Token Left </h2>
      </div>
    </div>
    
  )
}

export default pricing