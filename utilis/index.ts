import { CarProps, FilterProps } from "@/types";

export async function fetchCars (filters: FilterProps) {
    const {manufacturer, limit, year, model, fuel } = filters;
    const headers = {
		'X-RapidAPI-Key': 'ab5f7ef4femsh3a461d0bd7fc1b2p1e2a44jsnc19a7190e57b',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers: headers,
    });
    const result = await response.json();
    return result;
}
export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  }
  export const generateCarImageUrl = (car: CarProps, angle ?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', 'hrjavascript-mastery' || '');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model?.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 
  export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname
  }
  export async function getDetails (year: string | string[],model: string | string[]) {
    const headers = {
		'X-RapidAPI-Key': 'ab5f7ef4femsh3a461d0bd7fc1b2p1e2a44jsnc19a7190e57b',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?year=${year}&model=${model}`,{
        headers: headers,
    });
    const result = await response.json();
    return result;
}
export const daysCalculator = (mpg: number, year: number,start: string, end: string) => {
  const DayCharges = calculateCarRent(mpg, year)
  //define two date object variables with dates inside it
   const date1 = new Date(start);
   const date2 = new Date(end);
  //calculate time difference
   var time_difference = date2.getTime() - date1.getTime();
  //calculate days difference by dividing total milliseconds in a day
   var days_difference = time_difference / (1000 * 60 * 60 * 24);
    return Math.ceil(days_difference * parseFloat(DayCharges) * 1.13)
}

export const compareDates = (start: string, end:string) => {
  const date1 = new Date(start);
const date2 = new Date(end);
if (date1 < date2) {
  return true
} else {
  return false
}
// date1 and date2 are not the same

}