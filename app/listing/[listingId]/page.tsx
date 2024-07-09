import {IListing} from "@/types";
import Image from "next/image";
import ListingPageCarousel from "@/components/listing-detail/ListingPageCarousel";

export default async function Page({params}: { params: { listingId: string } }) {
    const listing: IListing = await findListing(parseInt(params.listingId));

    return <div className={`max-w-6xl mx-auto`}>
        <div className={`grid grid-cols-6 gap-4 mb-4`}>
            {/*<Image src={listing.images[0]?.url} width={600} height={300} alt={``}*/}
            {/*       className={`rounded-sm col-span-4 w-full`} />*/}
            <div className={`col-span-4`}>
                <ListingPageCarousel images={listing.images}/>
            </div>
            {/*Contact Info*/}
            <div className={`col-span-2 bg-gray-100 p-4 rounded-sm`}>
                <h3 className={`text-2xl font-bold mb-2`}>Kontakt</h3>
                <p className={`text-sm`}>{listing.contact_name}</p>
                <p className={`text-sm`}>Telefon: {listing.contact_name}</p>
                <p className={`text-sm`}>Email: {listing.contact_email}</p>
                {listing.contact_name && <p className={`text-sm`}>Firma: {listing.company_name}</p>}
            </div>
        </div>

        <h3 className={`text-3xl font-bold mb-2`}>Szczegóły ogłoszenia</h3>
        <div className={`grid grid-cols-2 gap-4 mb-8`}>
            <div>
                <p className={`text-sm`}>Powierzchnia: {listing.areaTotal} m<sup>2</sup></p>
                <p className={`text-sm`}>Cena: {listing.price} PLN</p>
                <p className={`text-sm`}>Liczba pokoi: {listing.apartment_room_number}</p>
                <p className={`text-sm`}>Data dodania: {listing.add_date}</p>
            </div>
            <div>
                <p className={`text-sm`}>Piętro: {listing.floor_number}</p>
                <p className={`text-sm`}>Miasto: {listing.city_name}</p>
                <p className={`text-sm`}>Ulica: {listing.street_name}</p>
            </div>
        </div>

        <h3 className={`text-3xl font-bold mb-2`}>Opis</h3>
        <p className={`text-sm`}>{listing.description}</p>
    </div>
}


async function findListing(id: number) {
    const url = process.env.API_BASE_URL + '/listings/' + id;
    const res = await fetch(url, {next: {revalidate: 900}})

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}