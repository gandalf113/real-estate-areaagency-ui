import {IListing, LanguageType} from "@/types";
import ListingPageCarousel from "@/components/listing-detail/ListingPageCarousel";
import translations from "@/app/translations";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import ListingDetailCard from "@/components/listing-detail/ListingDetailCard";

export default async function Page({params}: { params: { listingId: string, lang: LanguageType } }) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])

    const listing: IListing = await findListing(parseInt(params.listingId), params.lang);
    const t = translations[params.lang];


    return <div className={`max-w-6xl mx-auto py-4 pb-16`}>
        <div className={`grid grid-cols-6 gap-4 mb-4`}>
            <div className={`col-span-4`}>
                <ListingPageCarousel images={listing.images}/>
            </div>
            {/*Contact Info*/}
            <div className={`col-span-2 h-full`}>
                {/*<h3 className={`text-2xl font-bold mb-2`}>{t.contact}</h3>*/}

                {/*<div className={`col-span-2 bg-gray-100 rounded-sm h-[29rem] p-4`}>*/}
                {/*    <p className={`text-xl mb-4`}>{listing.contact_name}</p>*/}
                {/*    <p className={`text-`}>{listing.contact_phone}</p>*/}
                {/*    <p className={`text-`}>{listing.contact_email}</p>*/}
                {/*    {listing.company_name && <p className={`text-sm`}>{t.company}: {listing.company_name}</p>}*/}
                {/*</div>*/}
            </div>
        </div>


        <h1 className={`text-3xl font-bold my-8 lg:w-4/5`}>{listing.title}</h1>
        <p className={`font-light w-3/4`}>{listing.description}</p>

        <h3 className={`text-2xl font-bold my-8`}>{t.details}</h3>
        <div className={`grid grid-cols-4 gap-4 mb-4`}>
            <ListingDetailCard name={t.area} value={listing.areaTotal + ' m2'}/>
            <ListingDetailCard name={t.price} value={listing.price + ' zł'}/>
            <ListingDetailCard name={t.rooms} value={listing.apartment_room_number}/>
            <ListingDetailCard name={t.dateAdded} value={new Date(listing.add_date).toLocaleDateString()}/>

        </div>
        <h1 className={`text-2xl font-bold mt-12 mb-4`}>{t.contact}</h1>

        <div className={`gap-4 mb-4`}>
            <p className={``}>{listing.contact_name}</p>
            <p>{t.phone}: {listing.contact_phone}</p>
            <p>{t.email}: {listing.contact_email}</p>
        </div>

        <h1 className={`text-2xl font-bold mt-12 mb-4`}>{t.location}</h1>
        <p className={`font-light w-3/4 mb-4`}>{listing.city_name}, {listing.street_name}, {listing.precinct_name},
            ul. {listing.street_name}</p>

        <div className={`md:w-4/5 h-96 overflow-hidden`}>
            <div className={`h-full bg-red-200 overflow-hidden rounded-xl shadow-lg`}>
                <Map position={[Number.parseFloat(listing.lat) - 0.004, Number.parseFloat(listing.lon)]} zoom={15}
                     locations={[listing]} noPopup/>
            </div>
        </div>
    </div>
}


async function findListing(id: number, lang: string) {
    const url = process.env.API_BASE_URL + '/listings/' + id + '?lang=' + lang;
    const res = await fetch(url, {next: {revalidate: 900}})

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}