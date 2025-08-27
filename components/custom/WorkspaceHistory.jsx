import { UserContext } from '@/context/UserContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSidebar } from '../ui/sidebar';

export const WorkspaceHistory = () => {
    const { userDetail, serUserDetail } = useContext(UserContext);
    const convex = useConvex();
    const [workspaceList, setWorkspaceList] = useState([]);
    const { toggleSidebar } = useSidebar();

    useEffect(() => {
        if (userDetail) {
            GetAllWorkspaceMain();
        }
    }, [userDetail]);

    const GetAllWorkspaceMain = async () => {
        const result = await convex.query(api.workspace.GetAllWorkspace, {
            userId: userDetail?._id,
        });
        setWorkspaceList(result);
    };

    return (
        <div>
            <h1 className="font-medium text-lg"> Your Chats </h1>
            <div>
                {workspaceList &&
                    workspaceList?.map((workspace, index) => {
                        return (
                            <div key={workspace._id || index}>
                                <Link href={'/workspace/' + workspace._id}>
                                    <h2
                                        onClick={toggleSidebar}
                                        className=" text-sm text-gray-400 mt-2 font-light hover:text-white  cursor-pointer"
                                    >
                                        {workspace?.messages[0]?.content}
                                    </h2>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
