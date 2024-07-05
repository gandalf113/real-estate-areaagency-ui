import {IListing} from "@/types";
import Image from "next/image";

export default async function Page({params}: { params: { listingId: string } }) {
    const listing: IListing = await findListing(parseInt(params.listingId));

    return <div className={`max-w-6xl mx-auto`}>
        <div className={`grid grid-cols-6 gap-4 mb-4`}>
            <Image src={listing.images[0]?.url} width={600} height={300} alt={``}
                   className={`rounded-sm col-span-4 w-full`}/>
            <div className={`bg-gray-100 col-span-2`}></div>
        </div>

        <h3 className={`text-3xl font-bold mb-2`}>Szczegóły ogłoszenia</h3>

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