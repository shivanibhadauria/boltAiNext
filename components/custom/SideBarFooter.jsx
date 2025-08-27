import React from 'react';
import { Settings, MessageCircleQuestion, Wallet, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { googleLogout } from '@react-oauth/google';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

const SideBarFooter = () => {
    const router = useRouter();
    const { toggleSidebar } = useSidebar();

    const options = [
        {
            name: 'setting',
            icon: Settings,
        },
        {
            name: 'Help Center',
            icon: MessageCircleQuestion,
        },
        {
            name: 'My Subscription',
            icon: Wallet,
            path: '/pricing',
        },
    ];

    const pathClicked = (path) => {
        if (path) {
            router.push(path);
        }
    };
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/');
        toggleSidebar();
    };

    return (
        <div className="p-5 mb-10">
            {options.map((option, index) => {
                const Icon = option.icon;
                return (
                    <Button
                        variant="ghost"
                        className="w-full flex justify-start my-3"
                        key={index}
                        onClick={() => pathClicked(option.path)}
                    >
                        <Icon />
                        {option.name}
                    </Button>
                );
            })}
            <Button
                variant="ghost"
                className="w-full flex justify-start my-3"
                onClick={logout}
            >
                <LogOut />
                Sign Out
            </Button>
        </div>
    );
};

export default SideBarFooter;
