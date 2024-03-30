"use client"

import { useEffect, useState } from "react";
import { z, ZodError } from 'zod';
import { Skeleton } from "antd";
import ShopCard from './ShopCard';
import toast, {Toaster} from "react-hot-toast";

type Location = {
    id: string;
    name: string;
    address: string;
    city: string;
    productionPlace: string;
    products: string[];
    photos: string[];
    sectors: string[];
    onClick: () => void;
};

const ValidateShops = () => {
    const [unvalidatedLocations, setUnvalidatedLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    const locationSchema = z.object({
        name: z.string(),
        address: z.string(),
        city: z.string(),
        productionPlace: z.string(),
        products: z.array(z.string()),
        photos: z.array(z.string()),
        sectors: z.array(z.string())
    });

    useEffect(() => {
        async function fetchLocations() {
            try {
                const response = await fetch('/api/getUnvalidatedLocations');
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
                setUnvalidatedLocations(sortedLocations);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        }
        fetchLocations();
    }, [locationSchema]);

    const handleValidateLocation = async (id: string) => {
        try {
            const response = await fetch(`/api/validateLocation?id=${id}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to validate location');
            }
            const updatedLocations = unvalidatedLocations.filter(location => location.id !== id);
            setUnvalidatedLocations(updatedLocations);
            toast.success('Shop validé')
        } catch (error) {
            console.error('Error validating location:', error);
            toast.error('Une erreur est survenue')
        }
    };


    return (
        <div className="flex flex-col items-start gap-[50px]">
            <div className="pl-[50px] pt-10">
               <p className="text-xl font-bold text-center">Shops à valider</p> 
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
                    unvalidatedLocations.map((location, index) => (
                            <ShopCard key={index} name={location.name} city={location.city} address={location.address} products={location.products} photos={location.photos} productionPlace={location.productionPlace} sectors={location.sectors} buttonText="Valider" onClick={() => handleValidateLocation(location.id)} />
                    ))
                )}
                <Toaster />
            </div>
        </div>
    )
}

export default ValidateShops;
