"use client"

import Image from 'next/image';
import ShopDetails from "./ShopDetails"
import { useState, useEffect, MouseEventHandler } from "react";
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from "react-hot-toast";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LocationDataProps} from "@/types";

interface ShopCardProps {
  name: string;
  city: string;
  address: string;
  products: string[];
  productionPlace: string;
  sectors: string[];
  imageUrl: string;
}

export default function ShopCard({ name, city, address, products, productionPlace, sectors, imageUrl }: ShopCardProps) {
  const [token, setToken] = useState<string | null>(null);
  const [able, setAble] = useState<boolean>(false);
  const [unvalidatedLocations, setUnvalidatedLocations] = useState<LocationDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const handleValidateLocation: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const id = event.currentTarget.id; 
  
    try {
      setIsLoading(true); 
  
      const response = await fetch(`/api/validateLocations`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to validate location');
      }
  
      const updatedLocations = unvalidatedLocations.filter(location => location.id !== id);
      setUnvalidatedLocations(updatedLocations);
      toast.success('Shop validé');
    } catch (error) {
      console.error('Error validating location:', error);
      toast.error('Une erreur est survenue lors de la validation');
    } finally {
      setIsLoading(false); 
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="w-[350px] flex flex-col justify-between gap-4 shadow-lg p-4 rounded-lg">
      <div className="flex flex-col items-start">
        <p className="text-xl">{name}</p>
        <p className="text-sm text-gray-500">{address}, {city}</p>
      </div>

      <div className="flex items-center justify-center">
        <Image src={imageUrl} alt="photo du magasin" layout='responsive' width={100} height={100}/>
      </div>
  
      <div className="flex flex-col gap-4">
        <p className="font-bold">Produits vendus</p>
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      </div>
  
      <div>
        <p className="font-bold">Lieu(x) de production</p>
        <p>{productionPlace}</p>
      </div>
  
      <button onClick={() => setIsOpen(true)} className="bg-green-500 text-white p-4 rounded-lg relative font-bold hover:bg-green-600">
        Informations supplémentaires
      </button>
      
      {able && (
        isLoading ? (
          <div className="flex items-center gap-2 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
            <Spin indicator={<LoadingOutlined spin className="text-white" />} />
          </div>
        ) : (
          <button onClick={handleValidateLocation} className="bg-green-500 text-white p-4 rounded-lg relative font-bold hover:bg-green-600">
            Valider
          </button>
        )
      )}
  
      <ShopDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} name={name} address={address} city={city} products={products} productionPlace={productionPlace} sectors={sectors} />
      
      <Toaster />
    </div>
  );
  
}