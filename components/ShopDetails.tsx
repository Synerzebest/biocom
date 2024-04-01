"use client"

import { ShopDetailsProps } from "@/types";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

const ShopDetails = ({isOpen, closeModal, name, city, address, products, productionPlace, sectors }: ShopDetailsProps) => {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' onClose={closeModal} className="relative z-10">
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
                    <div className='w-full flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-out duration-300'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                        >
                        <Dialog.Panel className='relative w-full max-w-lg max-h-[90vh] transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5 overflow-hidden no-scrollbar'>
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
                                <p>Informations supplémentaires</p>
                            </div>

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

                            <div className="absolute bottom-[-135px] right-[-200px] opacity-90">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 400" width="420" height="420">
                                    <path d="M310.7623291015625,356.95068359375C290.96562001546226,340.3766889444987,219.8206301879883,325.0642766316732,233.63229370117188,292.3766784667969C247.44395721435546,259.68908030192057,345.6980704752604,276.78623970031737,364.5740051269531,229.59640502929688C383.44993977864584,182.40657035827638,298.42751953125,152.02690395355225,307.1748962402344,108.52017974853516C315.9222729492187,65.01345554351806,375.1748789469401,72.5201803970337,398.6546936035156,60.08968734741211" fill="none" stroke-width="19" stroke="url(&quot;#SvgjsLinearGradient1000&quot;)" stroke-linecap="round" stroke-dasharray="0 0" stroke-opacity="0.71" transform="matrix(0.986677251825204,0.35912115049195215,-0.35912115049195215,0.986677251825204,79.08414729300637,-110.4387275848388)"></path>
                                    <defs>
                                        <linearGradient id="SvgjsLinearGradient1000">
                                            <stop stop-color="hsl(105, 69%, 40%)" offset="0"></stop>
                                            <stop stop-color="hsl(105, 69%, 60%)" offset="1"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ShopDetails;