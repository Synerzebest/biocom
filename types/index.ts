export interface SearchCityProps {
    city: string;
    setCity: (city: string) => void;
}

export interface AddLocationProps {
    isOpen: boolean;
    closeModal: () => void;
}
