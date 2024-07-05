import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const TransactionTypeFilter = ({filters, setFilters}: FilterProps) => {

    const options = [
        {
            value: 'rent' as const,
            label: 'Wynająć'
        },
        {
            value: 'buy' as const,
            label: 'Kupić'
        }
    ]

    return (
        <Select options={options}
                value={options.find(option => option.value === filters.transactionType)}
                onChange={(selectedOption) => {
                    setFilters({...filters, transactionType: selectedOption?.value})
                }} placeholder={`Chcę...`} isClearable={true} />
    );
}
