import { SingleValue } from 'react-select';
import CreateSelect from 'react-select/creatable';
import { FilterProps } from "@/components/filters/Filters";
import React, { useState, useEffect } from 'react';

const values = [3000, 5000, 7000, 10000, 15000, 20000, 30000, 50000, 70000, 100000, 150000, 200000, 300000, 500000, 700000, 1000000, 2500000, 5000000, 10000000, 15000000, 20000000, 25000000];

export const PriceFilter = ({ filters, setFilters, translations, transactionType }: FilterProps & {
    transactionType?: 'buy' | 'rent';
}) => {
    const t = translations.filters;

    function formatPrice(price: number) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const createOptions = (min: number, max: number) => {
        return values.filter(value => value >= min && value <= max).map(value => ({
            value: value.toString(),
            label: formatPrice(value) + ' zł'
        }));
    };

    const filterMaxOptions = (minPrice?: number) => {
        const max = transactionType === 'buy' ? 25000000 : values[values.length - 1];
        const start = minPrice || (transactionType === 'buy' ? 700000 : 0);
        return createOptions(start, max);
    };

    const initialMinOptions = transactionType === 'buy' ? createOptions(700000, 25000000) : createOptions(0, 1000000);
    const initialMaxOptions = filterMaxOptions();

    const [minOptions, setMinOptions] = useState(initialMinOptions);
    const [maxOptions, setMaxOptions] = useState(initialMaxOptions);

    useEffect(() => {
        setMinOptions(transactionType === 'buy' ? createOptions(700000, 25000000) : createOptions(0, 1000000));
        setMaxOptions(filterMaxOptions());
    }, [transactionType]);

    const setMinPriceFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const min = selectedOption ? Number(selectedOption.value) : undefined;
        const max = filters.priceFilter?.max;
        setFilters({ ...filters, priceFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        if (max && min && max < min) {
            setFilters({ ...filters, priceFilter: { min, max: undefined } });
        }
    };

    const handleCreateMinOption = (inputValue: string) => {
        const newOption = { value: inputValue, label: `${inputValue} zł` };
        const min = Number(inputValue);
        const max = filters.priceFilter?.max;
        setFilters({ ...filters, priceFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        if (max && min && max < min) {
            setFilters({ ...filters, priceFilter: { min, max: undefined } });
        }
        setMinOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const setMaxPriceFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const max = selectedOption ? Number(selectedOption.value) : undefined;
        const min = filters.priceFilter?.min;
        setFilters({ ...filters, priceFilter: { min, max } });
    };

    const handleCreateMaxOption = (inputValue: string) => {
        const newOption = { value: inputValue, label: `${inputValue} zł` };
        const max = Number(inputValue);
        const min = filters.priceFilter?.min;
        setFilters({ ...filters, priceFilter: { min, max } });
        setMaxOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const handleNumberOnlyInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!/[\d\b]/.test(e.key) && e.key.length === 1 && !['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const formatCreateLabel = (inputValue: string) => `${inputValue} zł`;

    return (
        <div className="flex col-span-2">
            <CreateSelect
                name="min-price"
                options={minOptions}
                value={filters.priceFilter?.min ? { value: filters.priceFilter.min.toString(), label: filters.priceFilter.min.toString() + " zł" } : undefined}
                onChange={setMinPriceFilter}
                onCreateOption={handleCreateMinOption}
                placeholder={t.priceFrom.placeholder}
                isClearable={true}
                onKeyDown={handleNumberOnlyInput}
                className="w-1/2"
                formatCreateLabel={formatCreateLabel}
                styles={{
                    menu: (baseStyles) => {
                        return {
                            ...baseStyles,
                            zIndex: 30
                        }
                    }
                }}
            />
            <CreateSelect
                name="max-price"
                options={maxOptions}
                value={filters.priceFilter?.max ? { value: filters.priceFilter.max.toString(), label: filters.priceFilter.max.toString() + " zł" } : undefined}
                onChange={setMaxPriceFilter}
                onCreateOption={handleCreateMaxOption}
                placeholder={t.priceTo.placeholder}
                isClearable={true}
                className="w-1/2"
                onKeyDown={handleNumberOnlyInput}
                formatCreateLabel={formatCreateLabel}
                styles={{
                    menu: (baseStyles) => {
                        return {
                            ...baseStyles,
                            zIndex: 30
                        }
                    }
                }}
            />
        </div>
    );
};
