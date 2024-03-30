import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import {toast, Toaster} from 'react-hot-toast';
import Image from 'next/image';

interface ShopCardProps {
  name: string;
  city: string;
  address: string;
  products: string[];
  photos: string[];
  productionPlace: string;
  sectors: string[];
  buttonText: string;
  onClick: () => void;
}

export default function ShopCard({ name, city, address, products, photos, productionPlace, sectors, buttonText, onClick }: ShopCardProps) {

  return (
    <div className="w-[350px] flex flex-col justify-between gap-4 shadow-lg p-4 rounded-lg">
      <div className="flex flex-col items-start">
        <p className="text-xl">{name}</p>
        <p className="text-sm text-gray-500">{address}, {city}</p>
      </div>

      <Carousel animation="slide">
        {photos.map((photo, index) => (
          <div key={index} className="flex items-center justify-center">
            <Image src={photo} alt={`Photo ${index}`} layout='responsive' width={100} height={100}/>
          </div>
        ))}
      </Carousel>
      <div className="flex flex-col gap-4">
        <p className="font-bold">Secteurs d&apos;activité</p>
        <ul>
          {sectors.map((sector, index) => (
            <li key={index}>{sector}</li>
          ))}
        </ul>
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
      
      <button type="button" onClick={onClick}>
          <div className="flex items-center gap-2 bg-green-500 p-4 rounded-xl justify-center text-white font-bold hover:bg-green-600">
              {buttonText}
          </div>
      </button>
      <Toaster />
    </div>
  
  );
}