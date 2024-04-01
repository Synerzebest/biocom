"use client"

import { useState, useEffect } from 'react';
import { z, ZodError } from 'zod';
import { Skeleton } from "antd";
import ShopCard from './ShopCard';
import toast, { Toaster } from "react-hot-toast";

type Location = {
    id: string;
    name: string;
    address: string;
    city: string;
    productionPlace: string;
    products: string[];
    sectors: string[];
    onClick: () => void;
};

export default function ShopCardsContainer() {
    const [locations, setLocations] = useState<Location[]>([]);

    const [loading, setLoading] = useState(true);

    const locationSchema = z.object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        productionPlace: z.string(),
        products: z.array(z.string()),
        sectors: z.array(z.string())
    });

    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await fetch('/api/getLocation');
                if (!response.ok) {
                    throw new Error('An error occurred while fetching the locations');
                }
                const data: any[] = await response.json();

                const validatedLocations = data.map((location: any) => {
                    try {
                        locationSchema.parse(location);

                        return { ...location };
                    } catch (error) {
                        if (error instanceof ZodError) {
                            console.error('Invalid location:', error);
                        }
                        return null;
                    }
                }).filter(Boolean) as Location[];

                const sortedLocations = validatedLocations.reverse();
                setLocations(sortedLocations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        }
        fetchLocations();
    }, [locationSchema]);

    const handleCopyAddress = (address: string, city: string) => {
        const tempInput = document.createElement('input');
        tempInput.value = `${address}, ${city}`;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        toast.success('Adresse copiée dans le presse-papiers');
    };

    return(
        <div className="flex flex-col gap-[50px] items-center">
            <div>
                <p className="text-xl font-bold text-center">Découvrez le commerce qui vous convient</p>
            </div>
            <div className="w-[90%] flex flex-wrap gap-8 justify-center mx-auto">
                
                {loading ? (
                    <div className="w-[90%] flex flex-row flex-wrap gap-8 justify-center mx-auto">
                        <div className="w-1/4 min-w-[250px] flex flex-col gap-4 py-[15px]">
                            <Skeleton active/>
                            <Skeleton.Image active/> 
                            <Skeleton active />
                        </div>
                        <div className="w-1/4 min-w-[250px] flex flex-col gap-4 py-[15px]">
                            <Skeleton active/>
                            <Skeleton.Image active/> 
                            <Skeleton active />
                        </div>
                        <div className="w-1/4 min-w-[250px] flex flex-col gap-4 py-[15px]">
                            <Skeleton active/>
                            <Skeleton.Image active/> 
                            <Skeleton active />
                        </div>
                    </div>
                ) : (
                    locations.map((location, index) => (
                        <ShopCard key={index} name={location.name} city={location.city} address={location.address} products={location.products} productionPlace={location.productionPlace} sectors={location.sectors} />
                    ))
                )}
            </div>
            <Toaster />
        </div>
    )
}