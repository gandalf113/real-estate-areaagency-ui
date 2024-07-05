import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const LocationFilter = ({filters, setFilters}: FilterProps) => {
    const options = [
        {
            value: 'Warszawa',
            label: 'Warszawa'
        },
        {
            value: 'Gdańsk',
            label: 'Gdańsk'
        },
    ]

    return (
        <Select options={options} value={options.find(option => option.value === filters.locationFilter)}
                onChange={(selectedOption) => {
                    setFilters({...filters, locationFilter: selectedOption?.value})
                }} placeholder={`Lokalizacja`} isClearable={true}/>
    );
}
