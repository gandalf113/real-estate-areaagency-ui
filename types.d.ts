export interface IListing {
    id: number;
    crm_id: string;
    status: string;
    transaction: string;
    title: string;
    description: string;
    areaTotal: string;
    price: string;
    deposit: string;
    lon: string;
    lat: string;
    city_name: string;
    street_name: string;
    precinct_name: string;
    apartment_room_number: number;
    floor_number: number;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    company_name: string;
    available_date: string;
    add_date: string;
    created_at: string;
    images: {
        id: number;
        url: string;
    }[];
}

export type LanguageType = 'en' | 'pl' | 'ua';

export interface Translations {
    contact: string;
    phone: string;
    email: string;
    company: string;
    details: string;
    area: string;
    price: string;
    rooms: string;
    dateAdded: string;
    floor: string;
    city: string;
    street: string;
    description: string;
    location: string;
    nextPage: string;
    noResults: string;
    navbar: {
        aboutUs: string;
        services: string;
        realEstate: string;
        team: string;
        reviews: string;
        blog: string;
        chatbot: string;
        contacts: string;
    };
    filters: {
        transactionType: {
            placeholder: string;
            sale: string;
            rent: string;
        };
        location: {
            placeholder: string;
        };
        rooms: {
            placeholder: string;
        };
        priceFrom: {
            placeholder: string;
        };
        priceTo: {
            placeholder: string;
        };
    };
}
