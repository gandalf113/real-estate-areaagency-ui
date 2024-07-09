import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const TransactionTypeFilter = ({filters, setFilters, applyFilters}: FilterProps) => {

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

    const onChange = (selectedOption: any) => {
        setFilters({...filters, transactionType: selectedOption?.value})
    }

    return (
        <Select options={options}
                value={options.find(option => option.value === filters.transactionType)}
                onChange={onChange} placeholder={`Chcę...`} isClearable={true}/>
    );
}
