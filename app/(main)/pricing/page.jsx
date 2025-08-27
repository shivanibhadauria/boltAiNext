'use client';
import Lookup from '@/app/data/Lookup';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import Colors from '@/app/data/Colors';
import PricingModel from '@/components/custom/PricingModel';

const pricing = () => {
    const { userDetail, setUserDetail } = useContext(UserContext);
    return (
        <div className="mt-10 flex items-center flex-col w-full p-10 md:px-32  lg:px-48  ">
            <h2 className="font-bold text-5xl">Pricing</h2>
            <p className="text-gray-400 max-w-xl text-center mt-4 ">
                {Lookup.PRICING_DESC}{' '}
            </p>
            <div
                className=" p-4 border rounded-xl w-full flex justify-between mt-7 items-center "
                style={{ backgroundColor: Colors.BACKGROUND }}
            >
                <h2 className="text-lg ">
                    {' '}
                    <span className="font-bold">{userDetail?.token}</span> Token
                    Left{' '}
                </h2>
                <div>
                    <h2>Need more token?</h2>
                    <p>Update your plan below</p>
                </div>
            </div>
            <PricingModel />
        </div>
    );
};

export default pricing;
