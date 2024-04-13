import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string,
    containerStyles ?: string,
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: 'button' | 'submit';
    textStyles?: string;
    rightIcon?: string;
}

export interface SearchManufacturerProps{
    manufacturer: string;
    setManufacturer : (manufacturer: string) => void;
}

export interface CarProps{
    [x: string]: any;
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    manufacturer: string,
    year: number;
    fuel: string;
    limit: number;
    model: string;
}

export interface optionProps{
    title: string;
    value: string;
}
export interface customFilterProps{
    title: string;
    options: optionProps[];
}
export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}