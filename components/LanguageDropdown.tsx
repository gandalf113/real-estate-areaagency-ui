'use client';

import Select from 'react-select';
import { useRouter } from 'next/navigation';

interface LanguageDropdownProps {
    lang: string; // en, pl, ua
}

const LanguageDropdown = ({ lang }: LanguageDropdownProps) => {
    const router = useRouter();

    const handleChange = (selectedOption: { value: string; label: string } | null) => {
        if (selectedOption) {
            const currentPath = window.location.pathname;
            const newLocale = selectedOption.value;
            const newPath = `/${newLocale}${currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/')}`;
            router.push(newPath);
        }
    };

    const options = [
        { value: 'en', label: 'EN' },
        { value: 'pl', label: 'PL' },
        { value: 'ua', label: 'UA' },
    ];

    const selectedOption = options.find(option => option.value === lang) || { value: 'en', label: 'EN' };

    return (
        <Select
            options={options}
            className="lg:block hidden z-50"
            value={selectedOption}
            onChange={handleChange}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    backgroundColor: 'transparent',
                    border: 'none',
                    boxShadow: 'none',
                    color: state.isFocused ? '#FF0000' : '#000000',
                    cursor: 'pointer',
                    fontSize: '1em',
                    padding: '0',
                    '&:hover': {
                        color: '#FF0000',
                    },
                }),
                singleValue: (provided) => ({
                    ...provided,
                    color: '#000000',
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? '#FF0000' : '#ffffff',
                    color: state.isFocused ? '#ffffff' : '#000000',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#FF0000',
                        color: '#ffffff',
                    },
                }),
            }}
        />
    );
};

export default LanguageDropdown;
