import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";
import {Translations} from "@/types";

export const TransactionTypeFilter = ({filters, setFilters, translations}: FilterProps & {
    translations: Translations
}) => {
    const t = translations.filters.transactionType;

    const options = [
        {
            value: 'rent' as const,
            label: t.rent
        },
        {
            value: 'buy' as const,
            label: t.sale
        }
    ]

    const onChange = (selectedOption: any) => {
        setFilters({...filters, transactionType: selectedOption?.value})
    }

    return (
        <Select options={options}
                value={options.find(option => option.value === filters.transactionType)}
                onChange={onChange} placeholder={t.placeholder} isClearable={false}
                styles={{
                    menu: (baseStyles) => {
                        return {
                            ...baseStyles,
                            zIndex: 30
                        }
                    }
                }}
        />
    );
}
