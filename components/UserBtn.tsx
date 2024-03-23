import React from 'react';
import { UserButton } from '@clerk/nextjs';

export default function UserBtn() {
    return (
        <div className="fixed top-[49rem] left-[1rem] z-10 flex gap-4 p-[10px] shadow-lg bg-white items-center rounded-lg">
            <p className="text-xl">Moi</p>
            <UserButton />
        </div>
    )
}