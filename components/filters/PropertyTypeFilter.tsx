import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const PropertyTypeFilter = ({filters, setFilters}: FilterProps) => {
    const options = [
        {
            value: 'house' as const,
            label: 'Dom'
        },
        {
            value: 'apartment' as const,
            label: 'Mieszkanie'
        },
        {
            value: 'commercial' as const,
            label: 'Komercyjne obiekty'
        }
    ]

    return (
        <Select options={options} value={options.find(option => option.value === filters.propertyType)}
                onChange={(selectedOption) => {
                    setFilters({...filters, propertyType: selectedOption?.value})
                }} placeholder={`Typ nieruchomości`} isClearable={true}/>
    );
}
