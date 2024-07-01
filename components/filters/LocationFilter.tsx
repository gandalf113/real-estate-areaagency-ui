import Select from 'react-select';

export const LocationFilter = () => {
    const options = [
        {
            value: 'krakow',
            label: 'Kraków'
        },
        {
            value: 'warsaw',
            label: 'Warszawa'
        },
        {
            value: 'gdansk',
            label: 'Gdańsk'
        },
        {
            value: 'poznan',
            label: 'Poznań'
        },
        {
            value: 'wroclaw',
            label: 'Wrocław'
        },
        {
            value: 'lodz',
            label: 'Łódź'
        },
        {
            value: 'szczecin',
            label: 'Szczecin'
        },
        {
            value: 'katowice',
            label: 'Katowice'
        },
        {
            value: 'bialystok',
            label: 'Białystok'
        },
        {
            value: 'lublin',
            label: 'Lublin'
        }
    ]

    return (
        <Select options={options} />
    );
}
