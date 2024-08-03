import {LanguageType} from "@/types";
import ListingPageCarousel from "@/components/listing-detail/ListingPageCarousel";
import translations from "@/app/translations";
import {useMemo} from "react";
import dynamic from "next/dynamic";
import ListingDetailCard from "@/components/listing-detail/ListingDetailCard";
import ContactForm from "@/components/listing-detail/ContactForm";
import { redirect } from 'next/navigation'

function formatPrice(price: string) {
    // Convert the price to a float
    let number = Number.parseFloat(price);

    // Otherwise, format the number with spaces
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


export default async function Page({params}: { params: { listingId: string, lang: LanguageType } }) {
    const Map = useMemo(() => dynamic(
        () => import('@/components/Map'),
        {
            loading: () => <div className={`w-full h-full bg-gray-200 animate-pulse`}/>,
            ssr: false
        }
    ), [])


    const listing = await findListing(parseInt(params.listingId), params.lang);
    if (!listing) {
        return redirect('/'+ params.lang + '/listing/' + params.listingId + '/not-found')
    }

    const t = translations[params.lang];

    const descriptionLines = listing.description ? listing.description.split('\n') : [];

    return <div className={`max-w-6xl mx-auto py-4 pb-16`}>
        <div className={`grid grid-cols-10 gap-4 mb-4 px-4`}>
            <div className={`lg:col-span-7 col-span-10`}>
                <ListingPageCarousel images={listing.images}/>
            </div>
            {/*Contact Info*/}
            <div className={`lg:block hidden col-span-3 rounded-sm h-[29rem] p-6`}>
                <ContactForm lang={params.lang} listing={listing}/>
            </div>
        </div>

        <div className={`px-4`}>
            <h1 className={`text-3xl font-bold my-8 lg:w-4/5`}>{listing.title}</h1>

            <div className={`lg:w-2/3`}>
                {descriptionLines.map((line: string, index: number) => <p key={index} className={`font-light mb-2`}>{line}</p>)}
            </div>

            <h3 className={`text-2xl font-bold my-8`}>{t.details}</h3>
            <div className={`flex md:flex-row flex-col gap-4 mb-4`}>
                <ListingDetailCard name={t.area} value={listing.areaTotal + ' m2'}/>
                <ListingDetailCard name={t.price} value={formatPrice(listing.price) + ' zł'}/>
                {listing.apartment_room_number ? <ListingDetailCard name={t.rooms} value={listing.apartment_room_number}/> : null}
                {listing.building_year ? <ListingDetailCard name={t.buildingYear} value={listing.building_year}/> : null}
                {listing.floor_number ? <ListingDetailCard name={t.floor} value={listing.floor_number}/> : null}
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

            <div className={`lg:hidden block mt-6`}>
                <h4 className={`text-2xl font-bold mb-4`}>{t.contact}</h4>
                <ContactForm lang={params.lang} listing={listing}/>
            </div>
        </div>

    </div>
}


async function findListing(id: number, lang: string) {
    const url = process.env.API_BASE_URL + '/listings/' + id + '?lang=' + lang;
    const res = await fetch(url, {next: {revalidate: 900}})

    if (!res.ok) {
        return Promise.reject("Listing not found");
    }

    return res.json()
}