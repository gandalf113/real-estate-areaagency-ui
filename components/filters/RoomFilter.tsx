import Select, { MultiValue } from 'react-select';
import { FilterProps } from "@/components/filters/Filters";

export const RoomFilter = ({ filters, setFilters }: FilterProps) => {
    const options = [
        { value: '1', label: '1 pokój' },
        { value: '2', label: '2 pokoje' },
        { value: '3', label: '3 pokoje' },
        { value: '4', label: '4 pokoje' },
        { value: '5', label: '5 pokoi' },
        { value: '6', label: '6 pokoi' },
        { value: '7', label: '7 pokoi' },
        { value: '8', label: '8 pokoi' },
        { value: '9', label: '9 pokoi' },
        { value: '10', label: '10 pokoi' }
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
            placeholder={`Liczba pokoi`}
            maxMenuHeight={200}
        />
    );
};
