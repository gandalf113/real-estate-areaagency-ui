import Image from "next/image";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import {IListing} from "@/types";
import Link from "next/link";
import {navigation} from "@/components/Navbar";
import Filters from "@/components/filters/Filters";

export default async function Home() {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const listings: IListing[] = await findListings();

    return (
        <>
            <div className={`px-8 py-14 flex flex-col border-t-2`}>
                <Filters/>
            </div>
            <main className="flex overflow-x-clip">
                <div className={`px-8 lg:w-7/12 w-full`}>
                    {/*Controls */}
                    {/* Real Estate Listings */}
                    <div className={`space-y-4`}>
                        {listings.map((listing, index) => (
                            <div key={listing.id}
                                 className={`flex items-start gap-x-4 w-full shadow cursor-pointer bg-white`}>
                                <Image src={listing.images[0].url} alt={`House`} width={300} height={200}
                                       className={`h-full object-cover`}/>
                                <div className={`h-fit p-4`}>
                                    <h2 className={`text-lg font-bold mb-2`}>{listing.price} PLN</h2>
                                    <p className={`text-gray-500`}>{listing.description.slice(0, 200)}...</p>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>


                {/*The map*/}
                <div className={`lg:block hidden sticky right-0 h-[calc(100vh-64px)] top-0 w-5/12`}>
                    <Map position={[52.247463, 21.015801]} zoom={10} locations={listings}/>
                </div>

            </main>
        </>)
        ;
}


async function findListings() {
    const res = await fetch('http://159.65.117.50:3000/listings')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}