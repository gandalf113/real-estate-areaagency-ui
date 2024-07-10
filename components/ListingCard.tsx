import Link from "next/link";
import Image from "next/image";
import {IListing, LanguageType} from "@/types";
import ListingCardCarousel from "@/components/listing-card/ListingCardCarousel";

interface ListingCardProps {
    listing: IListing
    lang?: LanguageType
}

const ListingCard = ({listing, lang}: ListingCardProps) => {
    const hasImages = listing.images.length > 0;

    const images = listing.images.slice(0, 16);

    const hrefUrl = lang ? `/${lang}/listing/${listing.id}` : `/listing/${listing.id}`;

    return (
        <Link key={listing.id} href={hrefUrl}>
            <div className={`grid sm:grid-cols-5 grid-cols-1 gap-x-2 w-full shadow cursor-pointer bg-white mb-4`}>
                <div className={`w-full sm:col-span-2`}>
                    {hasImages ? <ListingCardCarousel images={images}/> :
                        <Image src={hasImages ? listing.images[0]?.url : "/no-image.png"} alt={`House`}
                               width={600} height={300} className={`w-full h-full object-cover`}/>}
                </div>
                <div className={`p-4 sm:col-span-3 flex flex-col h-full`}>
                    <span className={`text-xs mb-0.5`}>{listing.areaTotal} m<sup>2</sup> {" | "}
                        {listing.apartment_room_number} {listing.apartment_room_number > 1 ? 'pokoje' : 'pokój'}
                        {" | "} {listing.city_name}
                        </span>

                    <h2 className={`text-lg font-bold mb-1`}>{listing.title}</h2>
                    {/*Grow to fill*/}
                    <p className={`text-gray-500 flex-grow `}>{listing.description.slice(0, 100)}...</p>
                    <p className={`w-fit mt-auto h-fit ml-auto`}>{listing.price} zł {listing.transaction === 'wynajem' && ' / miesiąc'}</p>

                </div>
            </div>
        </Link>
    )
}

export default ListingCard;