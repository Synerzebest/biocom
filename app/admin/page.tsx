'use client'

import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';
import { ValidateShops, Footer } from "@/components";
import Link from "next/link";

export default function Page() {
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [able, setAble] = useState<boolean>(false);

    useEffect(() => {
        // Check if a token already exists in localstorage
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            const isTokenValid = checkTokenValidity(storedToken);
            if (isTokenValid) {
                setToken(storedToken);
                setAble(true);
            } else {
                // Delete invalid token
                localStorage.removeItem('accessToken');
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            const isTokenValid = checkTokenValidity(token);
            setAble(isTokenValid);
        } else {
            setAble(false);
        }
    }, [token]);

    function checkTokenValidity(token: string): boolean {
        try {
            const decodedToken: { [key: string]: any } = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            return decodedToken.exp >= currentTime;
        } catch (error) {
            console.error("An error occurred while validating token:", error);
            return false;
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/accessAdmin?password=${password}`);
            const data = await response.json();

            if (data.success) {
                localStorage.setItem('accessToken', data.token);
                setToken(data.token);
                setAble(true);
            } else {
                toast.error("Mot de passe incorrect");
            }
        } catch (error) {
            console.error("An error occured:", error);
            toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
    };

    return (
        <>
            <div className="w-screen">
                {able ? (
                    <>
                        <div className="w-screen flex justify-center my-4 relative z-10">
                            <Link href="/" className="flex justify-center">
                                <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-600 via-green-500 to-green-700">Local</p>
                                <p className="text-7xl font-bold text-slate-700">Nest</p>
                            </Link>
                        </div>

                        <div className="w-screen">
                            <ValidateShops />
                        </div>
                    </>
                ) : (
                    <div className="w-11/12 h-screen sm:w-[80%] m-auto flex flex-col items-center justify-center gap-4">
                        <p className="text-2xl">Accéder à la page administrateur</p>
                        <form onSubmit={handlePasswordSubmit} className="w-[350px] flex flex-col items-center gap-4">
                            <TextField className="w-full" type="password" label="Mot de passe" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" required={true} variant="outlined" />
                            <button className="w-full bg-green-500 text-white p-4 rounded-lg relative font-bold hover:bg-green-600">Accéder</button>
                        </form>
                    </div>
                )}
                <Toaster />
            </div>
            <Footer />
        </>
    )
}
