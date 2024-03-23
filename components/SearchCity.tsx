"use client"

import React, { useState } from 'react';
import { AutoComplete, Select, Skeleton } from 'antd';
import { cities, sectors } from '@/constants';
import ShopCard from './ShopCard';

type Location = {
    id: string;
    name: string;
    address: string;
    city: string;
    productionPlace: string;
    products: string[];
    photos: string[];
    sectors: string[]
};

const SearchCity: React.FC = () => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchSector, setSearchSector] = useState<string>('');

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
            const response = await fetch(`/api/searchLocations?city=${searchValue}&sector=${searchSector}`);
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

    const onChange = (value: string) => {
        setSearchSector(value)
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    return (
        <div className="flex flex-col gap-[5rem] w-screen">
            <div className="flex flex-col gap-2 items-center">
                <div className="flex gap-2 items-center">
                    <AutoComplete
                        options={options}
                        style={{ width: 250, height: 50 }}
                        onSearch={(text) => setOptions(getPanelValue(text))}
                        onSelect={(value) => setSearchValue(value)} 
                        placeholder="Ville, commune"
                    />
                    <Select
                        showSearch
                        placeholder="Secteur d'activités"
                        optionFilterProp="children"
                        onChange={onChange}
                        filterOption={filterOption}
                        options={sectors}
                        className="h-[50px] w-[250px]"
                    >

                    </Select>
                </div>
                
                <button onClick={handleSearch} className="w-[250px] flex items-center gap-2 hover:bg-green-600 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
                    Rechercher
                </button>
            </div>
            <div className="w-[90%] flex flex-row flex-wrap gap-8 justify-center mx-auto">
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
                    locations?.map((location, index) => (
                        <ShopCard
                            key={index}
                            name={location.name}
                            city={location.city}
                            address={location.address}
                            products={location.products}
                            photos={location.photos}
                            productionPlace={location.productionPlace}
                            sectors={location.sectors}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchCity;
