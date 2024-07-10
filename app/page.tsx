import {useMemo} from "react";
import dynamic from "next/dynamic";
import {IListing} from "@/types";
import Filters from "@/components/filters/Filters";
import ListingCard from "@/components/ListingCard";
import Pagination from "@/components/filters/Pagination";


interface HomePageProps {
    searchParams: ListingsQueryParams;
}

export default async function Home({searchParams}: HomePageProps) {

    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const currentPage = Number.parseInt(searchParams.page || '1');
    const {listings, totalPages} = await findListings({...searchParams, page: currentPage.toString()});

    return (
        <>
            <div className={`px-8 py-14 flex flex-col border-t-2`}>
                <Filters/>
            </div>
            <main className="flex overflow-x-clip">
                <div className={`px-8 lg:w-7/12 w-full`}>
                    {listings.length === 0 && <p className={`text-center text-2xl mt-8`}>Brak wyników</p>}

                    {/* Real Estate Listings */}
                    {listings.map((listing: IListing) => (
                        // Card
                        <ListingCard key={listing.id} listing={listing}/>
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

async function findListings(params: ListingsQueryParams = {}) {
    const queryParams = Object.keys(params)
        .map(key => {
            const value = (params as any)[key];
            return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : '';
        })
        .filter(param => param !== '')
        .join('&');

    const url = process.env.API_BASE_URL + `/listings?` + queryParams;
    const res = await fetch(url, {next: {revalidate: 900}})
    console.log(url)

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}