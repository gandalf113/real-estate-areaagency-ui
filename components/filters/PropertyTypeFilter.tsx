import Select from 'react-select';

export const PropertyTypeFilter = () => {
    const options = [
        {
            value: 'all',
            label: 'Wszystkie'
        },
        {
            value: 'house',
            label: 'Dom'
        },
        {
            value: 'apartment',
            label: 'Mieszkanie'
        },
        {
            value: 'commercial',
            label: 'Komercyjne obiekty'
        }
    ]

    return (
        <Select options={options} />
    );
}
