import Select, { SingleValue } from 'react-select';
import { FilterProps } from "@/components/filters/Filters";
import React, { useState } from 'react';

export const PriceFilter = ({ filters, setFilters, translations }: FilterProps) => {
    const t = translations.filters;

    const options = [
        { value: '0-1000', label: '0 - 1000 zł' },
        { value: '1000-2000', label: '1000 - 2000 zł' },
        { value: '2000-3000', label: '2000 - 3000 zł' },
        { value: '3000-4000', label: '3000 - 4000 zł' },
        { value: '4000-5000', label: '4000 - 5000 zł' },
        { value: '5000-6000', label: '5000 - 6000 zł' },
        { value: '6000-7000', label: '6000 - 7000 zł' },
        { value: '7000-8000', label: '7000 - 8000 zł' },
        { value: '8000-9000', label: '8000 - 9000 zł' },
        { value: '9000-10000', label: '9000 - 10000 zł' },
        { value: '10000-11000', label: '10000 - 11000 zł' },
        { value: '11000-12000', label: '11000 - 12000 zł' },
        { value: '12000-13000', label: '12000 - 13000 zł' },
        { value: '13000-14000', label: '13000 - 14000 zł' },
        { value: '14000-15000', label: '14000 - 15000 zł' },
        { value: '15000-16000', label: '15000 - 16000 zł' },
        { value: '16000-17000', label: '16000 - 17000 zł' },
        { value: '17000-18000', label: '17000 - 18000 zł' },
        { value: '18000-19000', label: '18000 - 19000 zł' }
    ];

    const minOptions = options.map(option => ({ value: option.value.split('-')[0], label: option.label.split(' - ')[0] + ' zł' }));

    const filterMaxOptions = (minPrice: number | undefined) => {
        if (minPrice === undefined) return options.map(option => ({ value: option.value.split('-')[1], label: option.label.split(' - ')[1] }));
        return options.filter(option => {
            const [min, max] = option.value.split('-').map(Number);
            return minPrice < max;
        }).map(option => ({ value: option.value.split('-')[1], label: option.label.split(' - ')[1] }));
    };

    const [maxOptions, setMaxOptions] = useState(filterMaxOptions(undefined));

    const setMinPriceFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const min = selectedOption ? Number(selectedOption.value) : undefined;
        const max = filters.priceFilter?.max;
        setFilters({ ...filters, priceFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        // If current filter max price is lower than the new min price, reset the max price filter
        if (max && min && max < min) {
            setFilters({ ...filters, priceFilter: { min, max: undefined } });
        }
    };

    const setMaxPriceFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const max = selectedOption ? Number(selectedOption.value) : undefined;
        const min = filters.priceFilter?.min;
        setFilters({ ...filters, priceFilter: { min, max } });
    };

    const findMinPriceOption = (min?: number) => {
        return minOptions.find(option => Number(option.value) === min);
    };

    const findMaxPriceOption = (max?: number) => {
        return maxOptions.find(option => Number(option.value) === max);
    };

    return (
        <div className="flex col-span-2">
            <Select
                name="min-price"
                options={minOptions}
                value={findMinPriceOption(filters.priceFilter?.min)}
                onChange={setMinPriceFilter}
                placeholder={t.priceFrom.placeholder}
                isClearable={true}
                className="w-1/2"
            />
            <Select
                name="max-price"
                options={maxOptions}
                value={findMaxPriceOption(filters.priceFilter?.max)}
                onChange={setMaxPriceFilter}
                placeholder={t.priceTo.placeholder}
                isClearable={true}
                className="w-1/2"
            />
        </div>
    );
}
