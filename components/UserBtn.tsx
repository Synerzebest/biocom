"use client"

import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function UserBtn() {
    const { isSignedIn } = useUser();

    return (
        <div className="fixed bottom-2 left-2 z-10">
                { isSignedIn ? (
                    <div className="flex gap-4 p-[10px] shadow-lg bg-white items-center rounded-lg">
                        <p className="text-xl">Me</p>
                        <UserButton />
                    </div>
                ) : (
                    <div className="flex gap-2 p-[10px] shadow-lg bg-white items-center rounded-lg">
                        <p>Ajouter mon commerce</p>
                        <Link href="/sign-in" className="underline text-blue-500">Connexion</Link>
                    </div>
                )}
                
        </div>

    )
}