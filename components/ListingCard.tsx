import Link from "next/link";
import Image from "next/image";
import {IListing, LanguageType} from "@/types";
import ListingCardCarousel from "@/components/listing-card/ListingCardCarousel";
import './ListingCard.css'
import translations from "@/app/translations";

interface ListingCardProps {
    listing: IListing
    lang: LanguageType
    onClickPin?: () => void
}

const ListingCard = ({listing, lang, onClickPin}: ListingCardProps) => {
    const hasImages = listing.images.length > 0;

    const images = listing.images.slice(0, 16);
    const t = translations[lang];

    function formatPrice(price: string) {
        // Convert the price to a float
        let number = Number.parseFloat(price);

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
        const {apartment_room_number, floor_number, areaTotal} = listing;

        let roomPart = '';
        if (apartment_room_number === 1) {
            roomPart = `${apartment_room_number} ${t.listingCard.room}`;
        } else if (apartment_room_number >= 2 && apartment_room_number <= 4) {
            roomPart = `${apartment_room_number} ${t.listingCard.roomsNominative}`;
        } else if (apartment_room_number >= 5) {
            roomPart = `${apartment_room_number} ${t.listingCard.roomsGentitive}`;
        }

        const floorPart = floor_number === 0 ? t.listingCard.floor_0 : `${floor_number} ${t.floor}`;
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

    const handleClickPin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (onClickPin) {
            onClickPin();
        }
    }

    const price = formatPrice(listing.price);
    const location = formatLocation(listing.city_name, listing.street_name, listing.precinct_name);

    const hrefUrl = lang ? `/${lang}/listing/${listing.id}` : `/listing/${listing.id}`;

    return (
        <Link key={listing.id} href={hrefUrl}>
            <div
                className={`font-sans grid sm:grid-cols-5 grid-cols-1 w-full shadow-lg duration-100 cursor-pointer bg-slate-50 bg-opacity-80 hover:bg-opacity-90 mb-4 gap-x-2 rounded overflow-hidden`}>
                <div className={`w-full max-h-56 sm:col-span-2`}>
                    {hasImages ? <ListingCardCarousel images={images}/> :
                        <Image src={hasImages ? listing.images[0]?.url : "/no-image.png"} alt={`House`}
                               width={600} height={300} className={`w-full h-full object-cover`}/>}
                </div>
                <div className={`p-4 sm:col-span-3 flex flex-col gap-y-2 h-full`}>
                    <div className={`text-black  font-light`}> {formatAdditionalInfo(listing)}</div>

                    <h2 className={`text-xl mb-1 line-clamp-3 font-semibold flex-grow`}>{listing.title}</h2>
                    <div className={`font-thin`}>{location}</div>

                    <div className={`flex justify-between items-end`}>
                        <div
                            className={`w-fit font-thin text-xl`}>{price} zł {listing.transaction === 'wynajem' && ' / ' + t.listingCard.month}</div>
                        {/*  Location Pin Icon  */}
                        <button onClick={handleClickPin} className={`lg:flex items-center text-gray-700 gap-x-1 hidden px-2 py-0.5 hover:bg-zinc-200 bg-opacity-40 duration-300 rounded-lg text-sm`}>
                            {t.showOnMap}
                            <svg fill="#808080" height="28px" width="28px" version="1.1" id="Capa_1"
                                 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                 viewBox="0 0 297 297" xmlSpace="preserve">
                                <g>
                                    <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
		c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
		C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892
		c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"/>
                                    <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614
		c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901
		c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104
		C179.265,127.948,165.464,141.901,148.5,141.901z"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ListingCard;
