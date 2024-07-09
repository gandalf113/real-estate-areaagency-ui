import Link from "next/link";
import Image from "next/image";
import {IListing} from "@/types";
import ListingCardCarousel from "@/components/listing-card/ListingCardCarousel";

interface ListingCardProps {
    listing: IListing
}

const ListingCard = ({listing}: ListingCardProps) => {
    const hasImages = listing.images.length > 0;

    const images = listing.images.slice(0, 16);

    return (
        <Link key={listing.id} href={`/listing/${listing.id}`}>
            <div className={`grid sm:grid-cols-5 grid-cols-1 gap-x-2 w-full shadow cursor-pointer bg-white mb-4`}>
                <div className={`w-full sm:col-span-2`}>
                    {hasImages ? <ListingCardCarousel images={images}/> :
                        <Image src={hasImages ? listing.images[0]?.url : "/no-image.png"} alt={`House`}
                               width={600} height={300} className={`w-full h-full object-cover`}/>}
                </div>
                <div className={`h-fit p-4 sm:col-span-3`}>
                    <p className={`text-xs mb-0.5`}>{listing.areaTotal} m<sup>2</sup></p>
                    <h2 className={`text-lg font-bold mb-1`}>{listing.price} PLN</h2>
                    <p className={`text-gray-500`}>{listing.description.slice(0, 200)}...</p>
                </div>
            </div>
        </Link>
    )
}

export default ListingCard;