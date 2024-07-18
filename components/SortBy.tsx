import Select, { SingleValue } from "react-select";
import { Translations } from "@/types";

interface SortByProps {
    t: Translations,
    value?: { field: string, direction: string }
    setValue: (value: { field: string, direction: string }) => void
}

const SortBy = ({ value, setValue, t }: SortByProps) => {
    const options = [
        { value: { field: 'price', direction: 'desc' }, label: t.filters.sortBy.priceDesc },
        { value: { field: 'price', direction: 'asc' }, label: t.filters.sortBy.priceAsc },
        { value: { field: 'areaTotal', direction: 'desc' }, label: t.filters.sortBy.areaDesc },
        { value: { field: 'areaTotal', direction: 'asc' }, label: t.filters.sortBy.areaAsc },
    ];

    return (
        <div className="flex items-center space-x-2 w-fit">
            <Select
                name={`sort`}
                options={options}
                placeholder={t.filters.sortBy.placeholder}
                value={options.find(option => option.value.field === value?.field && option.value.direction === value?.direction)}
                onChange={(selectedOption: SingleValue<{ value: { field: string, direction: string }, label: string }>) => {
                    if (selectedOption) {
                        setValue(selectedOption.value);
                    }
                }}
                styles={{
                    control: (baseStyles, style) => ({
                        ...baseStyles,
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        borderColor: 'transparent',
                    }),
                    placeholder: (baseStyles, style) => ({
                        ...baseStyles,
                        color: 'black'
                    }),
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
}

export default SortBy;
