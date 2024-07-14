import Link from "next/link";
import Image from "next/image";
import {IListing, LanguageType} from "@/types";
import ListingCardCarousel from "@/components/listing-card/ListingCardCarousel";
import './ListingCard.css'
import translations from "@/app/translations";

interface ListingCardProps {
    listing: IListing
    lang: LanguageType
}

const ListingCard = ({listing, lang}: ListingCardProps) => {
    const hasImages = listing.images.length > 0;

    const images = listing.images.slice(0, 16);
    const t = translations[lang].listingCard;

    function formatPrice(price: string) {
        // Convert the price to a float
        let number = Number.parseFloat(price);

        // Check if the price is in the millions
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + ' mln';
        }

        // Otherwise, format the number with spaces
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    function formatLocation(city: string, street: string, precinct: string) {
        if (city && street && precinct) {
            return `${city}, ${precinct}, ul. ${street}`;
        } else if (city && precinct) {
            return `${city}, ${precinct}`;
        } else if (city && street) {
            return `${city}, ${street}`;
        } else if (city) {
            return city;
        } else {
            return '';
        }
    }

    const formatAdditionalInfo = (listing: IListing) => {
        const { apartment_room_number, floor_number, areaTotal } = listing;

        let roomPart = '';
        if (apartment_room_number === 1) {
            roomPart = `${apartment_room_number} ${t.room}`;
        } else if (apartment_room_number >= 2 && apartment_room_number <= 4) {
            roomPart = `${apartment_room_number} ${t.roomsNominative}`;
        } else if (apartment_room_number >= 5) {
            roomPart = `${apartment_room_number} ${t.roomsGentitive}`;
        }

        const floorPart = floor_number === 0 ? t.floor_0 : `${floor_number} ${t.floor}`;
        const areaPart = `${areaTotal} m²`;

        if (apartment_room_number && floor_number && areaTotal) {
            return `${roomPart} • ${floorPart} • ${areaPart}`;
        } else if (apartment_room_number && floor_number) {
            return `${roomPart} • ${floorPart}`;
        } else if (apartment_room_number && areaTotal) {
            return `${roomPart} • ${areaPart}`;
        } else if (floor_number && areaTotal) {
            return `${floorPart} • ${areaPart}`;
        } else if (apartment_room_number) {
            return roomPart;
        } else if (floor_number) {
            return floorPart;
        } else if (areaTotal) {
            return areaPart;
        } else {
            return '';
        }
    };

    const price = formatPrice(listing.price);
    const location = formatLocation(listing.city_name, listing.street_name, listing.precinct_name);

    const hrefUrl = lang ? `/${lang}/listing/${listing.id}` : `/listing/${listing.id}`;

    return (
        <Link key={listing.id} href={hrefUrl}>
            <div
                className={`grid sm:grid-cols-5 grid-cols-1 w-full shadow-lg group duration-100 cursor-pointer bg-white bg-opacity-60 hover:bg-opacity-75 mb-4 gap-x-2 rounded-lg overflow-hidden`}>
                <div className={`w-full max-h-56 sm:col-span-2`}>
                    {hasImages ? <ListingCardCarousel images={images}/> :
                        <Image src={hasImages ? listing.images[0]?.url : "/no-image.png"} alt={`House`}
                               width={600} height={300} className={`w-full h-full object-cover`}/>}
                </div>
                <div className={`p-4 sm:col-span-3 flex flex-col gap-y-2 h-full`}>
                    <div className={`text-black  font-light`}> {formatAdditionalInfo(listing)}</div>

                    <h2 className={`text-xl font-light mb-1 line-clamp-3 flex-grow`}>{listing.title}</h2>
                    <div className={`font-thin`}>{location}</div>
                    <p className={`w-fit ml-auto font-thin text-xl`}>{price} zł {listing.transaction === 'wynajem' && ' / miesiąc'}</p>

                    {/*Grow to fill*/}
                    {/*<p className="text-gray-500 flex-grow ellipsis-multiline" style={{lineClamp: 'none'}}>*/}
                    {/*    {listing.description.slice(0, 200)}*/}
                    {/*</p>*/}
                </div>
            </div>
        </Link>
    )
}

export default ListingCard;
