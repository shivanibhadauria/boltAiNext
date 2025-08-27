import React from 'react';
import Image from 'next/image';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';
import { MessageCircleCode } from 'lucide-react';
import { WorkspaceHistory } from './WorkspaceHistory';
import SideBarFooter from './SideBarFooter';

export const AppSideBar = () => {
    return (
        <Sidebar>
            <SidebarHeader className="p-5">
                <Image src={'/logo.png'} alt="logo " width={40} height={40} />
            </SidebarHeader>
            <Button className="mt-5">
                {' '}
                <MessageCircleCode /> Start New Chat{' '}
            </Button>

            <SidebarContent className="p-5">
                <SidebarGroup>
                    <WorkspaceHistory />
                </SidebarGroup>
            </SidebarContent>
            <SideBarFooter></SideBarFooter>
        </Sidebar>
    );
};
