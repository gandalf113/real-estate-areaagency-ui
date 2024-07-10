import {useMemo} from "react";
import dynamic from "next/dynamic";
import {IListing, LanguageType} from "@/types";
import Filters from "@/components/filters/Filters";
import ListingCard from "@/components/ListingCard";
import Pagination from "@/components/filters/Pagination";
import translations from "@/app/translations";


interface HomePageProps {
    params: {lang: LanguageType}
    searchParams: ListingsQueryParams;
}

export default async function Home({params, searchParams}: HomePageProps) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const t = translations[params.lang];

    const currentPage = Number.parseInt(searchParams.page || '1');
    const {listings, totalPages} = await findListings({...searchParams, page: currentPage.toString()}, params.lang);

    return (
        <>
            <div className={`px-8 pt-4 pb-16 flex flex-col`}>
                <Filters/>
            </div>
            <main className="flex overflow-x-clip pb-8">
                <div className={`px-8 lg:w-7/12 w-full`}>
                    {listings.length === 0 && <p className={`text-center text-2xl mt-8`}>{t.noResults}</p>}

                    {/* Real Estate Listings */}
                    {listings.map((listing: IListing) => (
                        // Card
                        <ListingCard key={listing.id} listing={listing} lang={params.lang}/>
                    ))}

                    {listings && listings.length > 0 && totalPages > 1 && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />}
                </div>

                {/* The map */}
                <div className={`lg:block hidden sticky right-0 h-[calc(100vh-64px)] top-0 w-5/12`}>
                    <Map position={[52.247463, 21.015801]} zoom={10} locations={listings}/>
                </div>
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