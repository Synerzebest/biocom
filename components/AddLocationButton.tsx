"use client"

import React, {useState} from 'react';
import AddLocation from './AddLocation';
import { useUser } from '@clerk/nextjs';

export default function AddLocationButton() {
    const [isOpen, setIsOpen] = useState(false)

    const { isSignedIn } = useUser();

    return (
        <>
            { isSignedIn ? (
                <div className="fixed bottom-2 right-2 z-10 shadow rounded-lg">
                    <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white p-4 rounded-lg relative font-bold hover:bg-green-600">Ajouter mon commerce</button>
                    <AddLocation isOpen={isOpen} closeModal={() => setIsOpen(false)}/>
                </div>
            ) : (
                <></>
            )}
            
        </>
    )
}