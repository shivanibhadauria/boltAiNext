import Chatview from '@/components/custom/Chatview';
import Codeview from '@/components/custom/Codeview';
import React from 'react';

const workspace = () => {
    return (
        <div className="pb-3 sm:pr-5 min-h-screen  ">
            <div className=" grid sm:grid-cols-3 sm:gap-6  h-full  ">
                <Chatview />

                <div className=" col-span-2 ">
                    <Codeview />
                </div>
            </div>
        </div>
    );
};

export default workspace;
