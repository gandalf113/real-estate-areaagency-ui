import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const PropertyTypeFilter = ({filters, setFilters, translations}: FilterProps) => {
    const options = [
        {
            value: 'house' as const,
            label: translations.filters.propertyType.house
        },
        {
            value: 'apartment' as const,
            label: translations.filters.propertyType.apartment
        },
        {
            value: 'commercial' as const,
            label: translations.filters.propertyType.commercial
        },
        {
            value: 'land' as const,
            label: translations.filters.propertyType.land
        }
    ]

    return (
        <Select options={options}
                value={options.find(option => option.value === filters.propertyType)}
                onChange={(selectedOption) => {
                    setFilters({...filters, propertyType: selectedOption?.value})
                }}
                placeholder={translations.filters.propertyType.placeholder}
                isClearable={false}
                styles={{
                    menu: (baseStyles) => {
                        return {
                            ...baseStyles,
                            zIndex: 30
                        }
                    }
                }}/>
    );
}
