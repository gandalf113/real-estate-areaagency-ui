import Select from 'react-select';

export const PriceFilter = () => {
    const options = [
        {
            value: [0, 1000],
            label: '0 - 1000 zł'
        },
        {
            value: [1000, 2000],
            label: '1000 - 2000 zł'
        },
        {
            value: [2000, 3000],
            label: '2000 - 3000 zł'
        },
        {
            value: [3000, 4000],
            label: '3000 - 4000 zł'
        },
        {
            value: [4000, 5000],
            label: '4000 - 5000 zł'
        },
        {
            value: [5000, 6000],
            label: '5000 - 6000 zł'
        },
        {
            value: [6000, 7000],
            label: '6000 - 7000 zł'
        },
        {
            value: [7000, 8000],
            label: '7000 - 8000 zł'
        },
        {
            value: [8000, 9000],
            label: '8000 - 9000 zł'
        },
        {
            value: [9000, 10000],
            label: '9000 - 10000 zł'
        },
        {
            value: [10000, 11000],
            label: '10000 - 11000 zł'
        },
        {
            value: [11000, 12000],
            label: '11000 - 12000 zł'
        },
        {
            value: [12000, 13000],
            label: '12000 - 13000 zł'
        },
        {
            value: [13000, 14000],
            label: '13000 - 14000 zł'
        },
        {
            value: [14000, 15000],
            label: '14000 - 15000 zł'
        },
        {
            value: [15000, 16000],
            label: '15000 - 16000 zł'
        },
        {
            value: [16000, 17000],
            label: '16000 - 17000 zł'
        },
        {
            value: [17000, 18000],
            label: '17000 - 18000 zł'
        },
        {
            value: [18000, 19000],
            label: '18000 - 19000 zł'
        }
    ]

    return (
        <Select name="amount" />
    );
}