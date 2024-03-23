import React from 'react';
import { UserButton } from '@clerk/nextjs';

export default function UserBtn() {
    return (
        <div className="fixed bottom-2 left-2 z-10 flex gap-4 p-[10px] shadow-lg bg-white items-center rounded-lg">
            <p className="text-xl">Me</p>
            <UserButton />
        </div>
    )
}