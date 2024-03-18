"use client"

import React, { useState } from 'react';
import { AutoComplete } from 'antd';
import { cities } from '@/constants';
import ShopCard from './ShopCard';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type Location = {
    id: string;
    name: string;
    address: string;
    city: string;
    productionPlace: string;
    products: string[];
    photos: string[];
};

const SearchCity: React.FC = () => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    const getPanelValue = (searchText: string) => {
        const filteredCities = cities.filter(city =>
            city.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredCities.map(city => ({ value: city }));
    };

    const handleSearch = async () => {
        if (searchValue.trim() === '') return;

        setLoading(true);
        try {
            const response = await fetch(`/api/searchLocations?city=${searchValue}`);
            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }
            const data = await response.json();
            setLocations(data.locations);
        } catch (error) {
            console.error('Error fetching locations:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-[5rem]">
            <div className="flex flex-col gap-2 items-center">
                <AutoComplete
                    options={options}
                    style={{ width: 250, height: 50 }}
                    onSearch={(text) => setOptions(getPanelValue(text))}
                    onSelect={(value) => setSearchValue(value)} 
                    placeholder="Bruxelles"
                />
                <button onClick={handleSearch} className="w-[250px] flex items-center gap-2 hover:bg-green-600 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
                    Rechercher
                </button>
            </div>
            {loading ? (
                <div className="flex items-center gap-2 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
                    <p className="text-lg">Chargement</p>
                    <Spin indicator={<LoadingOutlined spin className="text-white" />} />
                </div>
            ) : (
                locations.map((location, index) => (
                    <ShopCard
                        key={index}
                        name={location.name}
                        city={location.city}
                        address={location.address}
                        products={location.products}
                        photos={location.photos}
                        productionPlace={location.productionPlace}
                    />
                ))
            )}
        </div>
    );
};

export default SearchCity;
