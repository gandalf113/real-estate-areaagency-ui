import { SingleValue } from 'react-select';
import CreateSelect from 'react-select/creatable';
import { FilterProps } from "@/components/filters/Filters";
import React, { useState } from 'react';

const values = [0, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 200, 250, 300, 400, 500, 1000];

export const AreaFilter = ({ filters, setFilters, translations }: FilterProps) => {
    const t = translations.filters;


    const createOptions = (min: number, max: number) => {
        return values.filter(value => value >= min && value <= max).map(value => ({
            value: value.toString(),
            label: value + ' m²'
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
        const max = filters.areaFilter?.max;
        setFilters({ ...filters, areaFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        if (max && min && max < min) {
            setFilters({ ...filters, areaFilter: { min, max: undefined } });
        }
    };

    const handleCreateMinOption = (inputValue: string) => {
        const newOption = { value: inputValue, label: `${inputValue} m²` };
        const min = Number(inputValue);
        const max = filters.areaFilter?.max;
        setFilters({ ...filters, areaFilter: { min, max } });
        setMaxOptions(filterMaxOptions(min));
        if (max && min && max < min) {
            setFilters({ ...filters, areaFilter: { min, max: undefined } });
        }
        setMinOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const setMaxFilter = (selectedOption: SingleValue<{ value: string }>) => {
        const max = selectedOption ? Number(selectedOption.value) : undefined;
        const min = filters.areaFilter?.min;
        setFilters({ ...filters, areaFilter: { min, max } });
    };

    const handleCreateMaxOption = (inputValue: string) => {
        const newOption = { value: inputValue, label: `${inputValue} m²` };
        const max = Number(inputValue);
        const min = filters.areaFilter?.min;
        setFilters({ ...filters, areaFilter: { min, max } });
        setMaxOptions((prevOptions) => [...prevOptions, newOption]);
    };

    const handleNumberOnlyInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!/[\d\b]/.test(e.key) && e.key.length === 1 && !['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'].includes(e.key)) {
            e.preventDefault();
        }
    };

    const formatCreateLabel = (inputValue: string) => `${inputValue} m²`;

    return (
        <div className="flex col-span-2">
            <CreateSelect
                name="min-area"
                options={minOptions}
                value={filters.areaFilter?.min ? { value: filters.areaFilter.min.toString(), label: filters.areaFilter.min.toString() + " m²" } : undefined}
                onChange={setMinFilter}
                onCreateOption={handleCreateMinOption}
                placeholder={t.areaFrom.placeholder}
                isClearable={true}
                onKeyDown={handleNumberOnlyInput}
                className="w-1/2"
                formatCreateLabel={formatCreateLabel}
            />
            <CreateSelect
                name="max-area"
                options={maxOptions}
                value={filters.areaFilter?.max ? { value: filters.areaFilter.max.toString(), label: filters.areaFilter.max.toString() + " m²" } : undefined}
                onChange={setMaxFilter}
                onCreateOption={handleCreateMaxOption}
                placeholder={t.areaTo.placeholder}
                isClearable={true}
                className="w-1/2"
                onKeyDown={handleNumberOnlyInput}
                formatCreateLabel={formatCreateLabel}
            />
        </div>
    );
};
