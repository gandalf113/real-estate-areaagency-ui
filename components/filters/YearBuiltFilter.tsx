import { SingleValue } from 'react-select';
import CreateSelect from 'react-select/creatable';
import { FilterProps } from "@/components/filters/Filters";
import React, { useState } from 'react';


const values = [1900, 1920, 1940, 1960, 1980, 2000, 2010, 2020, 2022, new Date().getFullYear()];

export const YearBuiltFilter = ({ filters, setFilters, translations }: FilterProps) => {
    const t = translations.filters;


    const createOptions = (min: number, max: number) => {
        return values.filter(value => value >= min && value <= max).map(value => ({
            value: value.toString(),
            label: value.toString()
        }));
    };

    const filterMaxOptions = (minValue?: number) => {
        const max = values[values.length - 1];
        const start = minValue || 0;
        return createOptions(start, max);
    };

    const [minOptions, setMinOptions] = useState(createOptions(0, 1000000));
    const [maxOptions, setMaxOptions] = useState(filterMaxOptions());

    const setMinFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const min = selectedOption ? Number(selectedOption.value) : undefined;
        const max = filters.yearBuiltFilter?.max;
        setFilters({ ...filters, yearBuiltFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        if (max && min && max < min) {
            setFilters({ ...filters, yearBuiltFilter: { min, max: undefined } });
        }
    };

    const handleCreateMinOption = (inputValue: string) => {
        const newOption = { value: inputValue, label: `${inputValue}` };
        const min = Number(inputValue);
        const max = filters.yearBuiltFilter?.max;
        setFilters({ ...filters, yearBuiltFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        if (max && min && max < min) {
            setFilters({ ...filters, yearBuiltFilter: { min, max: undefined } });
        }
        setMinOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const setMaxFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const max = selectedOption ? Number(selectedOption.value) : undefined;
        const min = filters.yearBuiltFilter?.min;
        setFilters({ ...filters, yearBuiltFilter: { min, max } });
    };

    const handleCreateMaxOption = (inputValue: string) => {
        const newOption = { value: inputValue, label: `${inputValue}` };
        const max = Number(inputValue);
        const min = filters.yearBuiltFilter?.min;
        setFilters({ ...filters, yearBuiltFilter: { min, max } });
        setMaxOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const handleNumberOnlyInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!/[\d\b]/.test(e.key) && e.key.length === 1 && !['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const formatCreateLabel = (inputValue: string) => `${inputValue}`;

    return (
        <div className="flex col-span-2">
            <CreateSelect
                name="min-year-built"
                options={minOptions}
                value={filters.yearBuiltFilter?.min ? { value: filters.yearBuiltFilter.min.toString(), label: filters.yearBuiltFilter.min.toString() } : undefined}
                onChange={setMinFilter}
                onCreateOption={handleCreateMinOption}
                placeholder={t.yearBuiltFrom.placeholder}
                isClearable={true}
                onKeyDown={handleNumberOnlyInput}
                className="w-1/2"
                formatCreateLabel={formatCreateLabel}
            />
            <CreateSelect
                name="max-year-built"
                options={maxOptions}
                value={filters.yearBuiltFilter?.max ? { value: filters.yearBuiltFilter.max.toString(), label: filters.yearBuiltFilter.max.toString() } : undefined}
                onChange={setMaxFilter}
                onCreateOption={handleCreateMaxOption}
                placeholder={t.yearBuiltTo.placeholder}
                isClearable={true}
                className="w-1/2"
                onKeyDown={handleNumberOnlyInput}
                formatCreateLabel={formatCreateLabel}
            />
        </div>
    );
};
