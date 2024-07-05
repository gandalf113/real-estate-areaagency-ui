import Image from "next/image";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import {IListing} from "@/types";
import Link from "next/link";
import Filters from "@/components/filters/Filters";


interface HomePageProps {
    params: { page: string };
    searchParams: ListingsQueryParams;
}
export default async function Home({ params, searchParams }: HomePageProps) {

    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const listings: IListing[] = await findListings(searchParams);

    return (
        <>
            <div className={`px-8 py-14 flex flex-col border-t-2`}>
                <Filters/>
            </div>
            <main className="flex overflow-x-clip">
                <div className={`px-8 lg:w-7/12 w-full`}>
                    {/* Real Estate Listings */}
                    {listings.map((listing, index) => (
                        // Card
                        <Link key={listing.id} href={`/listing/${listing.id}`}>
                            <div className={`flex items-start gap-x-4 w-full shadow cursor-pointer bg-white mb-4`}>
                                <Image src={listing.images[0]?.url} alt={`House`} width={300} height={200}
                                       className={`h-full object-cover`}/>
                                <div className={`h-fit p-4`}>
                                    <p className={`text-xs mb-0.5`}>{listing.areaTotal} m<sup>2</sup></p>
                                    <h2 className={`text-lg font-bold mb-1`}>{listing.price} PLN</h2>
                                    <p className={`text-gray-500`}>{listing.description.slice(0, 200)}...</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


                {/*The map*/}
                <div className={`lg:block hidden sticky right-0 h-[calc(100vh-64px)] top-0 w-5/12`}>
                    <Map position={[52.247463, 21.015801]} zoom={10} locations={listings}/>
                </div>

            </main>
        </>)
        ;
}

interface ListingsQueryParams {
    page?: number;
    limit?: number;
    transactionType?: string;
    propertyType?: string;
    location?: string;
    minRooms?: number;
    maxRooms?: number;
    minPrice?: number;
    maxPrice?: number;
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

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}