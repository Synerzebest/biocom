export interface SearchCityProps {
    city: string;
    setCity: (city: string) => void;
}

export interface AddLocationProps {
    isOpen: boolean;
    closeModal: () => void;
}

export interface ShopDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    name: string;
    city: string;
    address: string;
    products: string[];
    productionPlace: string;
    sectors: string[];
}

export interface LocationDataProps {
    id: string;
    name: string;
    address: string;
    city: string;
    productionPlace: string;
    products: string[];
    sectors: string[];
    imageUrl: string;
    authorMail: string;
  }