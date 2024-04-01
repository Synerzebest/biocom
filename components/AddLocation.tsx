"use client"

import { Fragment, ChangeEvent, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Image from 'next/image';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import TextField from '@mui/material/TextField';
import { AddLocationProps } from '@/types';
import UploadPhoto from './UploadPhoto';
import { categories, sectors } from '@/constants';
import toast, {Toaster} from 'react-hot-toast';
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AddLocation = ({ isOpen, closeModal }: AddLocationProps) => {
    const [formData, setFormData] = useState<{
        name: string;
        address: string;
        city: string;
        productionPlace: string;
        products: string[];
        photos: string[];
        sectors: string[];
    }>({
        name: '',
        address: '',
        city: '',
        productionPlace: '',
        products: [],
        photos: [],
        sectors: []
    });

    const [addedImages, setAddedImages] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (base64Images: string[]) => {
        const uniqueImages = base64Images.filter(image => !addedImages.has(image));
        setFormData(prevState => ({
          ...prevState,
          photos: [...prevState.photos, ...uniqueImages]
        }));
        
        const imagesArray = Array.from(addedImages);
        const newImagesSet = new Set([...imagesArray, ...uniqueImages]);
        setAddedImages(newImagesSet);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const updateProducts = (formData.products as string[]).includes(value)
            ? formData.products.filter(item => item !== value)
            : [...formData.products, value];
        
        setFormData(prevState => ({
            ...prevState,
            products: updateProducts
        }));
    };

    const handleSectorChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sectorChecked = e.target.value;
        const updateSectors = (formData.sectors as string[]).includes(sectorChecked)
            ? formData.products.filter(item => item !== sectorChecked)
            : [...formData.sectors, sectorChecked];
        
        setFormData(prevState => ({
            ...prevState,
            sectors: updateSectors
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/addLocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('An error occurred while adding the location');
            }

            toast.success('Votre commerce est en attente de vérification');

        } catch (error) {
            console.error('Error:', error);
            toast.error("Oups! Une erreur s'est produite, réessayez ultérieurement.");
        } finally {
            setIsLoading(false);
            closeModal(); 
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-out duration-300'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                        >
                        <Dialog.Panel className='no-scrollbar relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5'>
                            <button
                            type='button'
                            className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                            onClick={closeModal}
                            >
                                <Image
                                    src='/close.svg'
                                    alt='close'
                                    width={20}
                                    height={20}
                                    className='object-contain'
                                />
                            </button>

                            <div className="w-full flex justify-center text-xl font-bold mt-4">
                                <p>Ajouter un nouveau commerce</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-4">
                                    <p className="text-md text-foreground-500">Informations</p>
                                    <TextField type="text" label="Nom" value={formData.name} onChange={handleChange} name="name" required={true} variant="outlined" />
                                    <TextField type="text" label="Adresse" value={formData.address} onChange={handleChange} name="address" required={true} variant="outlined"/>
                                    <TextField type="text" label="Ville, commune" value={formData.city} onChange={handleChange} name="city" required={true} variant="outlined"/>
                                    <TextField type="text" label="Lieu(x) de production et/ou de transformation" value={formData.productionPlace} onChange={handleChange} name="productionPlace" required={true} variant="outlined"/>
                                    <CheckboxGroup
                                        label="Produits vendus"
                                    >
                                        {categories.map((category, index) => (
                                            <Checkbox key={index} value={category.value} onChange={handleCheckboxChange}>{category.label}</Checkbox>
                                        ))}
                                    </CheckboxGroup>

                                    <div>
                                        <CheckboxGroup
                                        label="Secteur(s)"
                                        >
                                            {sectors.map((sector, index) => (
                                                <Checkbox key={index} value={sector.value} onChange={handleSectorChange}>{sector.label}</Checkbox>
                                            ))}
                                        </CheckboxGroup>
                                    </div>

                                    {/* <div className="flex flex-col gap-4 justify-center">
                                        <p className="text-md text-foreground-500">Ajoutez une photo</p>
                                        <UploadPhoto onImageChange={handleImageChange}/>
                                    </div> */}

                                    <p className="text-sm text-gray-500">ⓘ Ajouter une photo aide à référencer le commerce</p>

                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <div className="flex items-center gap-2 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
                                                <Spin indicator={<LoadingOutlined spin className="text-white" />} />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 bg-green-500 p-4 rounded-xl justify-center text-white font-bold">
                                                Ajouter
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition>
            <Toaster />
        </>
    );
}

export default AddLocation
