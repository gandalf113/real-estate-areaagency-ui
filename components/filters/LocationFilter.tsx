import Select from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const LocationFilter = ({filters, setFilters}: FilterProps) => {
    const options = [
        {
            value: 'warszawa' as const,
            label: 'Warszawa'
        },
        {
            value: 'warszawa-bemowo' as const,
            label: 'Bemowo'
        },
        {
            value: 'warszawa-bialoleka' as const,
            label: 'Białołęka'
        },
        {
            value: 'warszawa-bielany' as const,
            label: 'Bielany'
        },
        {
            value: 'warszawa-mokotow' as const,
            label: 'Mokotów'
        },
        {
            value: 'warszawa-ochota' as const,
            label: 'Ochota'
        },
        {
            value: 'warszawa-praga-poludnie' as const,
            label: 'Praga Południe'
        },
        {
            value: 'warszawa-praga-polnoc' as const,
            label: 'Praga Północ'
        },
        {
            value: 'warszawa-rembertow' as const,
            label: 'Rembertów'
        },
        {
            value: 'warszawa-srodmiescie' as const,
            label: 'Śródmieście'
        },
        {
            value: 'warszawa-targowek' as const,
            label: 'Targówek'
        },
        {
            value: 'warszawa-ursus' as const,
            label: 'Ursus'
        },
        {
            value: 'warszawa-ursynow' as const,
            label: 'Ursynów'
        },
        {
            value: 'warszawa-wilanow' as const,
            label: 'Wilanów'
        },
        {
            value: 'warszawa-wesoła' as const,
            label: 'Wesoła',
        },
        {
            value: 'warszawa-wawer' as const,
            label: 'Wawer'
        },
        {
            value: 'warszawa-wlochy' as const,
            label: 'Włochy'
        },
        {
            value: 'warszawa-wola' as const,
            label: 'Wola'
        },
        {
            value: 'warszawa-zoliborz' as const,
            label: 'Żoliborz'
        },
        {
            value: 'konstancin' as const,
            label: 'Konstancin'
        },
        {
            value: 'jeziorno' as const,
            label: 'Jeziorno'
        },
        {
            value: 'piaseczno' as const,
            label: 'Piaseczno'
        }
    ]

    console.log(options.map((opt) => opt.value))

    return (
        <Select options={options} value={options.find(option => option.value === filters.locationFilter)}
                onChange={(selectedOption) => {
                    setFilters({...filters, locationFilter: selectedOption?.value})
                }} placeholder={`Lokalizacja`} isClearable={true}/>
    );
}
