import React from 'react';
import { UserButton } from '@clerk/nextjs';

export default function UserBtn() {
    return (
        <div className="absolute top-[2rem] right-[2rem] h-screen z-10">
            <UserButton />
        </div>
    )
}