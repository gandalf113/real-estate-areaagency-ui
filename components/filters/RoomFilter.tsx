import Select, { MultiValue } from 'react-select';
import { FilterProps } from "@/components/filters/Filters";

export const RoomFilter = ({ filters, setFilters, translations }: FilterProps) => {
    const t = translations.filters.rooms;

    const options = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
        { value: '7', label: '7' },
        { value: '8', label: '8' },
        { value: '9', label: '9' },
        { value: '10', label: '10' }
    ];

    const setRoomFilter = (selectedOptions: MultiValue<{ value: string, label: string } | undefined>) => {
        if (!selectedOptions || selectedOptions.length === 0) return setFilters({...filters, roomFilter: undefined});
        setFilters({...filters, roomFilter: selectedOptions.map(option => Number(option?.value))});
    };

    const findRoomOptions = () => {
        return filters.roomFilter?.map(room => options.find(option => Number(option.value) === room)) || [];
    };

    return (
        <Select
            options={options}
            isMulti={true}
            value={findRoomOptions()}
            onChange={setRoomFilter}
            placeholder={t.placeholder}
            maxMenuHeight={200}
        />
    );
};
