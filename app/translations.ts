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
        viewMore: "View More",
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
        contactForm: {
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send",
            phone: "Phone number",
            reason: {
                needMoreInfo: {
                    label: "I need more information",
                    content: "This rental apartment seems interesting to me. I would like to know more. Please contact me. \n"
                },
                scheduleVisit: {
                    label: "I want to schedule a visit",
                    content: "I would like to schedule a visit to view the apartment. Please contact me to arrange a time.\n"
                },
                other: {
                    label: "Other reason",
                    content: ""
                }
            },
            validation: {
                nameRequired: "Name is required",
                invalidEmail: "Invalid email",
                invalidPhoneNumber: "Invalid phone number",
                messageRequired: "Message is required"
            }
        },
        listingCard: {
            floor: "floor",
            floor_0: "Ground floor",
            room: "room",
            roomsNominative: "rooms",
            roomsGentitive: "rooms"
        }
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
        viewMore: "Zobacz więcej",
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
        contactForm: {
            name: "Imię",
            email: "Email",
            message: "Wiadomość",
            send: "Wyślij",
            phone: "Numer telefonu",
            reason: {
                needMoreInfo: {
                    label: "Potrzebuję więcej informacji",
                    content: "To mieszkanie na wynajem wydaje mi się interesujące. Chętnie poznam więcej szczegółów. Proszę o kontakt. \n"
                },
                scheduleVisit: {
                    label: "Chcę umówić się na wizytę",
                    content: "Chciałbym umówić się na wizytę w celu obejrzenia mieszkania. Proszę o kontakt w celu ustalenia terminu.\n"
                },
                other: {
                    label: "Inny powód",
                    content: ""
                }
            },
            validation: {
                nameRequired: "Imię jest wymagane",
                invalidEmail: "Nieprawidłowy adres email",
                invalidPhoneNumber: "Nieprawidłowy numer telefonu",
                messageRequired: "Wiadomość jest wymagana"
            }
        },
        listingCard: {
            floor: "piętro",
            floor_0: "Parter",
            room: "pokój",
            roomsNominative: "pokoje",
            roomsGentitive: "pokoi"
        }
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
        viewMore: "Детальніше",
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
        contactForm: {
            name: "Ім'я",
            email: "Ел. пошта",
            message: "Повідомлення",
            send: "Надіслати",
            phone: "Номер телефону",
            reason: {
                needMoreInfo: {
                    label: "Мені потрібна додаткова інформація",
                    content: "Ця квартира для оренди виглядає цікавою. Я б хотів дізнатися більше. Будь ласка, зв'яжіться зі мною. \n"
                },
                scheduleVisit: {
                    label: "Я хочу запланувати візит",
                    content: "Я хотів би запланувати візит для перегляду квартири. Будь ласка, зв'яжіться зі мною, щоб домовитися про час.\n"
                },
                other: {
                    label: "Інша причина",
                    content: ""
                }
            },
            validation: {
                nameRequired: "Ім'я є обов'язковим",
                invalidEmail: "Недійсна електронна адреса",
                invalidPhoneNumber: "Недійсний номер телефону",
                messageRequired: "Повідомлення є обов'язковим"
            }
        },
        listingCard: {
            floor: "поверх",
            floor_0: "Перший поверх",
            room: "кімната",
            roomsNominative: "кімнати",
            roomsGentitive: "кімнат"
        }
    }
};

export default translations;
