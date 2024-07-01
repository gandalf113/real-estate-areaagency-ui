import Select from 'react-select';


export const TransactionTypeFilter = () => {
    const options = [
        {
            value: 'rent',
            label: 'Wynajem'
        },
        {
            value: 'sale',
            label: 'Sprzedaż'
        }
    ]

    return (
        <Select options={options} />
    );
}
