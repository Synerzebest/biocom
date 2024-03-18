"use client"

import { useState, useEffect } from 'react';
import { z, ZodError } from 'zod';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ShopCard from './ShopCard';

type Location = {
    id: string;
    name: string;
    address: string;
    city: string;
    productionPlace: string;
    products: string[];
    photos: string[];
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
        photos: z.array(z.string())
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
                console.error('Error fetching announcements:', error);
            }
        }
        fetchLocations();
    }, [locationSchema]);


    return(
        <div className="flex flex-col gap-[50px] items-center">
            <div>
                <p className="text-xl font-bold text-center">Découvrez des commerces écoresponsables</p>
            </div>
            <div className="w-[90%] flex flex-wrap gap-8 justify-center mx-auto">
                
                {loading ? (
                    <div className="flex items-center gap-2 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
                        <p className="text-lg">Chargement</p>
                        <Spin indicator={<LoadingOutlined spin className="text-white" />} />
                    </div>
                ) : (
                    locations.map((location, index) => (
                        <ShopCard key={index} name={location.name} city={location.city} address={location.address} products={location.products} photos={location.photos} productionPlace={location.productionPlace} />
                    ))
                )}

            </div>
        </div>
    )
}