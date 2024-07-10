// translations.ts
import {LanguageType, Translations} from '@/types';

const translations: Record<LanguageType, Translations> = {
    en: {
        contact: "Contact",
        phone: "Phone",
        email: "Email",
        company: "Company",
        details: "Listing Details",
        location: "Location",
        area: "Area",
        price: "Price",
        rooms: "Number of Rooms",
        dateAdded: "Date Added",
        floor: "Floor",
        city: "City",
        street: "Street",
        description: "Description",
        noResults: "No results",
        nextPage: "Next Page",
        navbar: {
            aboutUs: "About Us",
            services: "Services",
            realEstate: "Real Estate",
            team: "Team",
            reviews: "Reviews",
            blog: "Blog",
            chatbot: "Chatbot",
            contacts: "Contacts"
        },
        filters: {
            transactionType: {
                placeholder: "I want to...",
                rent: "Rent",
                sale: "Buy",
            },
            location: {
                placeholder: "Location",
            },
            rooms: {
                placeholder: "Rooms",
            },
            priceFrom: {
                placeholder: "Price from..",
            },
            priceTo: {
                placeholder: "Price to..",
            },
        },
    },
    pl: {
        contact: "Kontakt",
        phone: "Telefon",
        email: "Email",
        company: "Firma",
        details: "Szczegóły ogłoszenia",
        location: "Lokalizacja",
        area: "Powierzchnia",
        price: "Cena",
        rooms: "Liczba pokoi",
        dateAdded: "Data dodania",
        floor: "Piętro",
        city: "Miasto",
        street: "Ulica",
        description: "Opis",
        nextPage: "Następna strona",
        noResults: "Brak wyników",
        navbar: {
            aboutUs: "O nas",
            services: "Usługi",
            realEstate: "Nieruchomości",
            team: "Zespół",
            reviews: "Opinie",
            blog: "Blog",
            chatbot: "Chatbot",
            contacts: "Kontakt"
        },
        filters: {
            transactionType: {
                placeholder: "Chcę...",
                rent: "Wynająć",
                sale: "Kupić",
            },
            location: {
                placeholder: "Lokalizacja",
            },
            rooms: {
                placeholder: "Liczba pokoi",
            },
            priceFrom: {
                placeholder: "Cena od..",
            },
            priceTo: {
                placeholder: "Cena do..",
            },
        },
    },
    ua: {
        contact: "Контакт",
        phone: "Телефон",
        email: "Ел. пошта",
        company: "Компанія",
        details: "Деталі оголошення",
        location: "Локація",
        area: "Площа",
        price: "Ціна",
        rooms: "Кількість кімнат",
        dateAdded: "Дата додавання",
        floor: "Поверх",
        city: "Місто",
        street: "Вулиця",
        description: "Опис",
        nextPage: "Наступна сторінка",
        noResults: "Немає результатів",
        navbar: {
            aboutUs: "Про нас",
            services: "Послуги",
            realEstate: "Нерухомість",
            team: "Команда",
            reviews: "Відгуки",
            blog: "Блог",
            chatbot: "Чатбот",
            contacts: "Контакти"
        },
        filters: {
            transactionType: {
                placeholder: "Я хочу...",
                rent: "Орендувати",
                sale: "Купити",
            },
            location: {
                placeholder: "Локація",
            },
            rooms: {
                placeholder: "Кількість кімнат",
            },
            priceFrom: {
                placeholder: "Ціна від..",
            },
            priceTo: {
                placeholder: "Ціна до..",
            },
        },
    }
};

export default translations;
