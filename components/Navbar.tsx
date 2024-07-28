import Link from "next/link";
import LanguageDropdown from "@/components/LanguageDropdown";
import translations from "@/app/translations";
import {LanguageType} from "@/types";


interface NavbarProps {
    lang: LanguageType
}

export default function Navbar({lang}: NavbarProps) {
    const t = translations[lang];

    const navigation = [
        {
            content: t.navbar.aboutUs,
            href: 'https://areaagency.pl/?currency=PLN#main-slide-2'
        },
        {
            content: t.navbar.services,
            href: 'https://areaagency.pl/?currency=PLN#main-slide-3'
        },
        {
            content: t.navbar.realEstate,
            href: "/" + lang,
            active: true,
        },
        {
            content: t.navbar.team,
            href: 'https://areaagency.pl/?currency=PLN#main-slide-5'
        },
        {
            content: t.navbar.reviews,
            href: 'https://areaagency.pl/en/?currency=PLN#main-slide-6'
        },
        {
            content: t.navbar.blog,
            href: 'https://areaagency.pl/en/blog'
        },
        {
            content: t.navbar.chatbot,
            href: 'https://areaagency.pl/en/chat-bot/'
        },
        {
            content: t.navbar.contacts,
            href: 'https://areaagency.pl/en/?currency=PLN#main-slide-7'
        }

    ]


    return (
        <nav className={`flex md:px-[71px] px-12 items-center justify-between pb-8`}>
            <div className={`flex items-center`}>
                <div className={`flex flex-col items-center gap-y-[14px] mr-7`}>
                    <div className={`h-[20px] w-[1px] bg-[#FF0000] invisible`}/>
                    <Link href={`https://areaagency.pl/en/?currency=PLN`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="134" height="22" viewBox="0 0 134 22"
                             className={`fill-zinc-900 hover:fill-[#FF0000] duration-200`}>
                            <path
                                d="M17.4396 21.3163L11.0133 6.28012L4.58697 21.3163H0L8.99228 0.306519H13.0343L22.0038 21.3163H17.4396Z"></path>
                            <path
                                d="M129.298 21.3163L122.872 6.28012L116.446 21.3163H111.859L120.851 0.306519H124.893L133.862 21.3163H129.298Z"></path>
                            <path d="M44.7114 17.1144H40.5105V21.2936H44.7114V17.1144Z"></path>
                            <path d="M125.007 17.1144H120.806V21.2936H125.007V17.1144Z"></path>
                            <path d="M13.1004 17.1144H8.89941V21.2936H13.1004V17.1144Z"></path>
                            <path
                                d="M53.295 14.5023C56.0653 13.4575 57.9501 10.6638 57.9501 7.66563C57.9501 3.59995 54.6575 0.306519 50.5928 0.306519H40.5105V4.57662L45.2337 10.8228L48.4128 15.0247L53.1814 21.3163H58.4269L53.295 14.5023ZM50.5928 10.8228H50.4792L45.7106 4.50848H50.5928C52.3185 4.50848 53.7264 5.96213 53.7264 7.66563C53.7264 9.36912 52.3185 10.8228 50.5928 10.8228Z"></path>
                            <path
                                d="M91.3761 17.1144H82.2703V12.9124H83.5873H88.6057H92.784V8.68772H85.8581L83.0878 4.50848H93.6015V0.306519H78.0693V4.50848L80.817 8.68772H78.0693V21.3163H94.1464L91.3761 17.1144Z"></path>
                        </svg>
                    </Link>
                </div>
                <div className={`lg:flex hidden flex-col items-center gap-y-[14px] mr-7`}>
                    <div className={`h-[20px] w-[1px] bg-[#FF0000] invisible`}/>
                    <Link href={`https://areaagency.pl/en/?currency=PLN#main-slide-1`}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="#000" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="7" r="1"></circle>
                            <circle cx="1" cy="7" r="1"></circle>
                            <circle cx="7" cy="1" r="1"></circle>
                            <circle cx="1" cy="1" r="1"></circle>
                        </svg>
                    </Link>
                </div>
                <div className={`lg:flex items-center hidden xl:gap-x-4`}>

                    {navigation.map((item, index) => (
                        <div key={index}
                             className={`${item.active ? 'text-[#FF0000]' : 'hover:text-[#FF0000] duration-200'} flex flex-col items-center justify-center gap-y-[14px] xl:mr-[20px] mr-4`}>
                            <div className={`h-[20px] w-[1px] bg-[#FF0000] ${item.active ? 'visible' : 'invisible'}`}/>
                            <Link href={item.href}
                                  className={`xl:text-[.9em] text-balance text-sm  tracking-wide`}>
                                {item.content}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`flex flex-col items-center gap-y-[14px] lg:mr-7`}>
                <div className={`h-[20px] w-[1px] bg-[#FF0000] invisible`}/>
                <div className={`flex items-center gap-x-2`}>

                    {/*Language Dropdown*/}
                    <LanguageDropdown lang={lang}/>

                </div>
            </div>
        </nav>

    )
}