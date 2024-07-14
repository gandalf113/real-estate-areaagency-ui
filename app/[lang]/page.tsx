import {useMemo} from "react";
import dynamic from "next/dynamic";
import {IListing, LanguageType} from "@/types";
import Filters from "@/components/filters/Filters";
import ListingCard from "@/components/ListingCard";
import Pagination from "@/components/filters/Pagination";
import translations from "@/app/translations";
import ListingsWithMap from "@/components/ListingsWithMap";


interface HomePageProps {
    params: {lang: LanguageType}
    searchParams: ListingsQueryParams;
}

export default async function Home({params, searchParams}: HomePageProps) {

    const t = translations[params.lang];

    const currentPage = Number.parseInt(searchParams.page || '1');
    const {listings, totalPages} = await findListings({...searchParams, page: currentPage.toString()}, params.lang);

    return (
        <>
            <div className={`px-8 pt-4 pb-16 flex flex-col`}>
                <Filters/>
            </div>
            <main className="overflow-x-clip pb-8">
                <ListingsWithMap
                    listings={listings}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    lang={params.lang} />
            </main>
        </>
    );
}

interface ListingsQueryParams {
    page?: string;
    limit?: string;
    transactionType?: string;
    propertyType?: string;
    location?: string;
    minRooms?: string;
    maxRooms?: string;
    minPrice?: string;
    maxPrice?: string;
}

async function findListings(search: ListingsQueryParams = {}, lang: string) {
    const params = {
        lang,
        ...search
    }
    const queryParams = Object.keys(params)
        .map(key => {
            const value = (params as any)[key];
            return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : '';
        })
        .filter(param => param !== '')
        .join('&');

    console.log(queryParams)

    const url = process.env.API_BASE_URL + `/listings?` + queryParams;
    const res = await fetch(url, {next: {revalidate: 900}})

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}