'use client'

import {IListing, IListingPin, LanguageType} from "@/types";
import ListingCard from "@/components/ListingCard";
import Pagination from "@/components/filters/Pagination";
import {useMemo, useState, useEffect} from "react";
import dynamic from "next/dynamic";
import useTranslations from "@/components/hooks/useTranslations";
import Map from "@/components/Map";

interface ListingsWithMapProps {
    listings: IListing[];
    pins: IListingPin[];
    totalPages: number;
    currentPage: number;
    lang: LanguageType
}

const ListingsWithMap = ({listings, pins, totalPages, currentPage, lang}: ListingsWithMapProps) => {
    const [activeLocationId, setActiveLocationId] = useState<number>();
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1024);
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleHover = (locationId: number) => {
        setActiveLocationId(locationId);
    };

    const t = useTranslations();

    return (
        <div className={`flex`}>
            <div className={`px-8 lg:w-7/12 w-full`}>
                {listings.length === 0 && <p className={`text-center text-2xl mt-8`}>{t.noResults}</p>}

                {/* Real Estate Listings */}
                {listings.map((listing: IListing) => (
                    // Card
                    <ListingCard key={listing.id}
                                 listing={listing}
                                 lang={lang}
                                 onMouseEnter={() => handleHover(listing.id)}
                                 onMouseLeave={() => setActiveLocationId(undefined)}
                    />
                ))}

                {listings && listings.length > 0 && totalPages > 1 && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />}
            </div>

            {/* The map */}
            {isLargeScreen && (
                <div className={`lg:block hidden sticky right-0 h-[calc(100vh-64px)] top-0 w-5/12`}>
                    <Map position={[52.247463, 21.015801]} zoom={10} locations={pins} activeLocationId={activeLocationId}/>
                </div>
            )}
        </div>
    );
}

export default ListingsWithMap;
