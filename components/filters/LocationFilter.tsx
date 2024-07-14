import Select, {MultiValue} from 'react-select';
import {FilterProps} from "@/components/filters/Filters";

export const LocationFilter = ({filters, setFilters, translations}: FilterProps) => {
    const t = translations.filters.location;

    const options = [
        {
            value: 'warszawa',
            label: 'Warszawa'
        },
        {
            value: 'warszawa-bemowo',
            label: 'Bemowo'
        },
        {
            value: 'warszawa-bialoleka',
            label: 'Białołęka'
        },
        {
            value: 'warszawa-bielany',
            label: 'Bielany'
        },
        {
            value: 'warszawa-mokotow',
            label: 'Mokotów'
        },
        {
            value: 'warszawa-ochota',
            label: 'Ochota'
        },
        {
            value: 'warszawa-praga-poludnie',
            label: 'Praga Południe'
        },
        {
            value: 'warszawa-praga-polnoc',
            label: 'Praga Północ'
        },
        {
            value: 'warszawa-rembertow',
            label: 'Rembertów'
        },
        {
            value: 'warszawa-srodmiescie',
            label: 'Śródmieście'
        },
        {
            value: 'warszawa-targowek',
            label: 'Targówek'
        },
        {
            value: 'warszawa-ursus',
            label: 'Ursus'
        },
        {
            value: 'warszawa-ursynow',
            label: 'Ursynów'
        },
        {
            value: 'warszawa-wilanow',
            label: 'Wilanów'
        },
        {
            value: 'warszawa-wesoła',
            label: 'Wesoła',
        },
        {
            value: 'warszawa-wawer',
            label: 'Wawer'
        },
        {
            value: 'warszawa-wlochy',
            label: 'Włochy'
        },
        {
            value: 'warszawa-wola',
            label: 'Wola'
        },
        {
            value: 'warszawa-zoliborz',
            label: 'Żoliborz'
        },
        {
            value: 'konstancin',
            label: 'Konstancin'
        },
        {
            value: 'jeziorno',
            label: 'Jeziorno'
        },
        {
            value: 'piaseczno',
            label: 'Piaseczno'
        }
    ]

    const setLocationFilter = (selectedOptions: MultiValue<{ value: string, label: string } | undefined>) => {
        if (!selectedOptions || selectedOptions.length === 0) return setFilters({
            ...filters,
            locationFilter: undefined
        });
        setFilters({
            ...filters, locationFilter: selectedOptions.filter(option => !!option?.value)
                .map(option => option!.value)
        });
    }

    const findLocationOptions = () => {
        return filters.locationFilter?.map(location => options.find(option => option.value === location)) || [];
    }

    return (
        <Select options={options}
                isMulti={true}
                value={findLocationOptions()}
                onChange={setLocationFilter}
                placeholder={t.placeholder}
                isClearable={true}
                isOptionDisabled={() => filters.locationFilter ? filters.locationFilter.length >= 5 : false}
        />
    );
}
