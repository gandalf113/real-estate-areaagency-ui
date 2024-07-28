export interface IListing {
    id: number;
    crm_id: string;
    provider: string;
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
    building_year: number;
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

export interface IListingPin {
    id: number;
    lat: number;
    lon: number;
    title: string;
    description: string;
    price: string;
    transaction: string;
}

export type LanguageType = 'en' | 'pl' | 'ua' | 'ru';

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
    buildingYear: string;
    city: string;
    street: string;
    description: string;
    location: string;
    nextPage: string;
    noResults: string;
    tooCheap: string;
    viewMore: string;
    showOnMap: string;
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
        showMoreFilters: string;
        showLessFilters: string;
        transactionType: {
            placeholder: string;
            sale: string;
            rent: string;
        };
        propertyType: {
            placeholder: string;
            apartment: string;
            house: string;
            commercial: string;
            investment: string;
            land: string;
        }
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
        areaFrom: {
            placeholder: string;
        },
        areaTo: {
            placeholder: string;
        },
        yearBuiltFrom: {
            placeholder: string;
        },
        yearBuiltTo: {
            placeholder: string;
        },
        sortBy: {
            placeholder: string;
            priceAsc: string;
            priceDesc: string;
            areaAsc: string;
            areaDesc: string;
        }
    },
    contactForm: {
        name: string;
        email: string;
        phone: string;
        message: string;
        send: string;
        sendResultSuccess: string;
        sendResultError: string;
        reason: {
            needMoreInfo: {
                label: string,
                content: string
            },
            scheduleVisit: {
                label: string,
                content: string
            },
            other: {
                label: string,
                content: string
            }
        },
        validation: {
            nameRequired: string;
            invalidEmail: string;
            invalidPhoneNumber: string;
            messageRequired: string;
        }
    },
    listingCard: {
        month: string;
        floor: string;
        floor_0: string;
        room: string;
        roomsNominative: string;
        roomsGentitive: string;
    },
    listingNotFound: {
        title: string;
        description: string;
        returnToHome: string;
    }
}
