import Chatview from '@/components/custom/Chatview';
import Codeview from '@/components/custom/Codeview';
import React from 'react';

const workspace = () => {
    return (
        <div className="pb-3 pr-5 min-h-screen  ">
            <div className=" grid grid-cols-3 gap-10  h-full  ">
                <Chatview />

                <div className=" col-span-2 ">
                    <Codeview />
                </div>
            </div>
        </div>
    );
};

export default workspace;
