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
            buildingYear: "Building Year",
            description: "Description",
            noResults: "No results",
            tooCheap: "Please select a higher price range",
            nextPage: "Next Page",
            viewMore: "View More",
            showOnMap: "Show on Map",
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
                propertyType: {
                    placeholder: "Property type",
                    apartment: "Apartment",
                    house: "House",
                    commercial: "Commercial",
                    investment: "Investment",
                    land: "Land",
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
                areaFrom: {
                    placeholder: "Area from..",
                },
                areaTo: {
                    placeholder: "Area to..",
                },
                yearBuiltFrom: {
                    placeholder: "Year built from..",
                },
                yearBuiltTo: {
                    placeholder: "Year built to..",
                },
                sortBy: {
                    placeholder: "Sort by",
                    priceDesc: "Price (descending)",
                    priceAsc: "Price (ascending)",
                    areaDesc: "Area (descending)",
                    areaAsc: "Area (ascending)",
                },
                showMoreFilters: "More filters",
                showLessFilters: "Less filters"
            },
            contactForm: {
                name: "Name",
                email: "Email",
                message: "Message",
                send: "Send",
                phone: "Phone number",
                sendResultSuccess: "Thank you for your message. Our consultant will contact you shortly.",
                sendResultError: "An error occurred while sending the message. Please try again later.",
                reason: {
                    needMoreInfo: {
                        label: "I need more information",
                        content: "This property seems interesting to me. I would like to know more details. Please contact me.\n"
                    },
                    scheduleVisit: {
                        label: "I want to schedule a visit",
                        content: "I would like to schedule a visit to view the property. Please contact me to arrange a meeting.\n"
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
                roomsGentitive: "rooms",
                month: "month"
            },
            listingNotFound: {
                title: "Listing not found",
                description: "The listing you are looking for does not exist or has been removed.",
                returnToHome: "Return to home page"
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
            buildingYear: "Rok budowy",
            nextPage: "Następna strona",
            noResults: "Brak wyników",
            tooCheap: "Proszę wybrać wyższy przedział cenowy",
            viewMore: "Zobacz więcej",
            showOnMap: "Pokaż na mapie",
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
                propertyType: {
                    placeholder: "Typ nieruchomości",
                    apartment: "Mieszkania",
                    investment: "Inwestycyjne",
                    house: "Domy",
                    commercial: "Komercyjne obiekty",
                    land: "Działki",
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
                areaFrom: {
                    placeholder: "Powierzchnia od..",
                },
                areaTo: {
                    placeholder: "Powierzchnia do..",
                },
                yearBuiltFrom: {
                    placeholder: "Rok budowy od..",
                },
                yearBuiltTo: {
                    placeholder: "Rok budowy do..",
                },
                sortBy: {
                    priceDesc: "Cena (malejąco)",
                    priceAsc: "Cena (rosnąco)",
                    areaDesc: "Powierzchnia (malejąco)",
                    areaAsc: "Powierzchnia (rosnąco)",
                    placeholder: "Sortuj według"
                },
                showLessFilters: "Mniej filtrów",
                showMoreFilters: "Więcej filtrów"
            },
            contactForm: {
                name: "Imię",
                email: "Email",
                message: "Wiadomość",
                send: "Wyślij",
                phone: "Numer telefonu",
                sendResultSuccess: "Dziękujemy za wiadomość. Nasz konsultant skontaktuje się z Tobą wkrótce.",
                sendResultError: "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.",
                reason: {
                    needMoreInfo: {
                        label: "Potrzebuję więcej informacji",
                        content: "Ta nieruchomość wydaje mi się interesująca. Chętnie poznam więcej szczegółów. Proszę o kontakt. \n"
                    },
                    scheduleVisit: {
                        label: "Chcę umówić się na wizytę",
                        content: "Chciałbym umówić się na wizytę w celu obejrzenia nieruchomości. Proszę o kontakt w celu ustalenia terminu.\n"
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
                roomsGentitive: "pokoi",
                month: "miesiąc"
            },
            listingNotFound: {
                title: "Ogłoszenie zostało usunięte",
                description: "Przepraszamy, szukane ogłoszenie nie istnieje lub zostało usunięte.",
                returnToHome: "Powrót na stronę główną"
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
            buildingYear: "Рік будівництва",
            nextPage: "Наступна сторінка",
            noResults: "Немає результатів",
            tooCheap: "Будь ласка, оберіть вищий ціновий діапазон",
            viewMore: "Детальніше",
            showOnMap: "Показати на карті",
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
                propertyType: {
                    placeholder: "Тип нерухомості",
                    apartment: "Квартира",
                    house: "Будинок",
                    commercial: "Комерційна",
                    investment: "Інвестиційна",
                    land: "Земля",
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
                areaFrom: {
                    placeholder: "Площа від..",
                },
                areaTo: {
                    placeholder: "Площа до..",
                },
                yearBuiltFrom: {
                    placeholder: "Рік будівництва від..",
                },
                yearBuiltTo: {
                    placeholder: "Рік будівництва до..",
                },
                sortBy: {
                    priceDesc: "Ціна (спаданням)",
                    priceAsc: "Ціна (зростанням)",
                    areaDesc: "Площа (спаданням)",
                    areaAsc: "Площа (зростанням)",
                    placeholder: "Сортувати за"
                },
                showLessFilters: "Менше фільтрів",
                showMoreFilters: "Більше фільтрів"
            },
            contactForm: {
                name: "Ім'я",
                email: "Ел. пошта",
                message: "Повідомлення",
                send: "Надіслати",
                phone: "Номер телефону",
                sendResultSuccess: "Дякуємо за ваше повідомлення. Наш консультант зв'яжеться з вами найближчим часом.",
                sendResultError: "Під час відправлення повідомлення виникла помилка. Будь ласка, спробуйте ще раз пізніше.",
                reason: {
                    needMoreInfo: {
                        label: "Мені потрібна додаткова інформа",
                        content: "Цей об'єкт здається мені цікавим. Я був би радий дізнатися більше деталей. Будь ласка, не соромтеся звертатися до мене."
                    },
                    scheduleVisit: {
                        label: "Я хочу запланувати візит",
                        content: "Я хотів би домовитися про зустріч для перегляду нерухомості. Будь ласка, зв'яжіться зі мною, щоб домовитися про зустріч."
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
                roomsGentitive: "кімнат",
                month: "місяць"
            },
            listingNotFound: {
                title: "Оголошення не знайдено",
                description: "Оголошення, яке ви шукаєте, не існує або було видалено.",
                returnToHome: "Повернутися на головну сторінку"
            }
        },
        ru: {
            contact: "Контакт",
            phone: "Телефон",
            email: "Электронная почта",
            company: "Компания",
            details: "Детали объявления",
            location: "Местоположение",
            area: "Площадь",
            price: "Цена",
            rooms: "Количество комнат",
            dateAdded: "Дата добавления",
            floor: "Этаж",
            city: "Город",
            street: "Улица",
            buildingYear: "Год постройки",
            description: "Описание",
            noResults: "Нет результатов",
            tooCheap: "Пожалуйста, выберите более высокий ценовой диапазон",
            nextPage: "Следующая страница",
            viewMore: "Показать больше",
            showOnMap: "Показать на карте",
            navbar: {
                aboutUs: "О нас",
                services: "Услуги",
                realEstate: "Недвижимость",
                team: "Команда",
                reviews: "Отзывы",
                blog: "Блог",
                chatbot: "Чатбот",
                contacts: "Контакты"
            },
            filters: {
                transactionType: {
                    placeholder: "Я хочу...",
                    rent: "Арендовать",
                    sale: "Купить",
                },
                propertyType: {
                    placeholder: "Тип недвижимости",
                    apartment: "Квартира",
                    house: "Дом",
                    commercial: "Коммерческая",
                    investment: "Инвестиционная",
                    land: "Земля",
                },
                location: {
                    placeholder: "Местоположение",
                },
                rooms: {
                    placeholder: "Количество комнат",
                },
                priceFrom: {
                    placeholder: "Цена от..",
                },
                priceTo: {
                    placeholder: "Цена до..",
                },
                areaFrom: {
                    placeholder: "Площадь от..",
                },
                areaTo: {
                    placeholder: "Площадь до..",
                },
                yearBuiltFrom: {
                    placeholder: "Год постройки от..",
                },
                yearBuiltTo: {
                    placeholder: "Год постройки до..",
                },
                sortBy: {
                    placeholder: "Сортировать по",
                    priceDesc: "Цена (по убыванию)",
                    priceAsc: "Цена (по возрастанию)",
                    areaDesc: "Площадь (по убыванию)",
                    areaAsc: "Площадь (по возрастанию)",
                },
                showMoreFilters: "Больше фильтров",
                showLessFilters: "Меньше фильтров"
            },
            contactForm: {
                name: "Имя",
                email: "Электронная почта",
                message: "Сообщение",
                send: "Отправить",
                phone: "Номер телефона",
                sendResultSuccess: "Спасибо за ваше сообщение. Наш консультант свяжется с вами в ближайшее время.",
                sendResultError: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
                reason: {
                    needMoreInfo: {
                        label: "Мне нужно больше информации",
                        content: "Этот объект недвижимости кажется мне интересным. Я хотел бы узнать больше подробностей. Пожалуйста, свяжитесь со мной.\n"
                    },
                    scheduleVisit: {
                        label: "Я хочу назначить визит",
                        content: "Я хотел бы назначить встречу для просмотра недвижимости. Пожалуйста, свяжитесь со мной, чтобы договориться о встрече.\n"
                    },
                    other: {
                        label: "Другая причина",
                        content: ""
                    }
                },
                validation: {
                    nameRequired: "Имя обязательно",
                    invalidEmail: "Недействительный адрес электронной почты",
                    invalidPhoneNumber: "Недействительный номер телефона",
                    messageRequired: "Сообщение обязательно"
                }
            },
            listingCard: {
                floor: "этаж",
                floor_0: "Первый этаж",
                room: "комната",
                roomsNominative: "комнаты",
                roomsGentitive: "комнат",
                month: "месяц"
            },
            listingNotFound: {
                title: "Объявление не найдено",
                description: "Объявление, которое вы ищете, не существует или было удалено.",
                returnToHome: "Вернуться на главную страницу"
            }
        }
    }
;

export default translations;
