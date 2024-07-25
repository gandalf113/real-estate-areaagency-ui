'use client'

import {IListing, IListingPin, LanguageType} from "@/types";
import ListingCard from "@/components/ListingCard";
import Pagination from "@/components/filters/Pagination";
import {useMemo, useState, useEffect} from "react";
import dynamic from "next/dynamic";
import useTranslations from "@/components/hooks/useTranslations";
import Filters from "@/components/filters/Filters";
import {useSearchParams} from "next/navigation";

interface ListingsWithMapProps {
    listings: IListing[];
    pins: IListingPin[];
    totalPages: number;
    currentPage: number;
    lang: LanguageType
}

const ListingsWithMap = ({listings, pins, totalPages, currentPage, lang}: ListingsWithMapProps) => {
    const [activeLocationId, setActiveLocationId] = useState<number>();

    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-screen bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const handleClickPin = (locationId: number) => {
        setActiveLocationId(locationId);
    };

    const t = useTranslations();

    const searchParams = useSearchParams();

    const transactionType = searchParams.get('transactionType');
    const priceFilter = searchParams.get('priceFilter');
    const maxPrice = priceFilter ? parseInt(priceFilter.split('-')[1]) : undefined;


    return (
        <div className={`flex`}>
            <div className={`px-8 lg:w-7/12 w-full`}>
                <div className={`mb-4`}>
                    <Filters/>
                </div>

                {listings.length === 0 && <p className={`text-center text-2xl mt-8`}>
                    {t.noResults}
                </p>}

                {(listings.length === 0 && maxPrice && maxPrice < 700000 && transactionType === "buy") ?
                    <p className={`text-center text-2xl mt-8`}>
                        {t.tooCheap}
                    </p> : null}


                {/* Real Estate Listings */}
                {listings.map((listing: IListing) => (
                    // Card
                    <ListingCard key={listing.id}
                                 listing={listing}
                                 lang={lang}
                                 onClickPin={() => handleClickPin(listing.id)}
                    />
                ))}

                {listings && listings.length > 0 && totalPages > 1 && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />}
            </div>

            <div className={`lg:block hidden sticky right-0 h-[calc(100vh-64px)] top-0 w-5/12`}>
                <Map position={[52.247463, 21.015801]} zoom={10} locations={pins}
                     activeLocationId={activeLocationId}
                     setActiveLocationId={setActiveLocationId}/>
            </div>
        </div>
    );
}

export default ListingsWithMap;
