import {LanguageType} from "@/types";
import translations from "@/app/translations";
import Link from "next/link";

export default async function NotFound({params: {lang},}: { params: { lang: LanguageType }; }) {
    const t = translations[lang].listingNotFound;

    return <section className="h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4x">{t.title}</p>
                <p className="mb-4 text-lg font-light ">{t.description}</p>
                <Link href="/"
                   className="inline-flex text-white bg-[#FF0000] font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">{t.returnToHome}</Link>
            </div>
        </div>
    </section>
}

