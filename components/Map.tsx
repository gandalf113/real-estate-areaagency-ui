'use client';

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L, {Map as LeafletMap, Marker as LeafletMarker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./Map.css";
import {IListing, IListingPin} from "@/types";
import {useRef, useEffect} from "react";
import MarkerClusterGroup from 'react-leaflet-cluster';
import useTranslations from "@/components/hooks/useTranslations";
import ListingMapCarousel from "@/components/ListingMapCarousel";
import {useRouter} from "next/navigation";
import listingMapCarousel from "@/components/ListingMapCarousel";
import Link from "next/link";

const icon = L.icon({
    iconUrl: "/static/marker/marker-icon.png",
    shadowUrl: '/static/marker/marker-shadow.png',
});

interface MapProps {
    position: [number, number];
    zoom: number;
    locations: IListing[] | IListingPin[];
    noPopup?: boolean;
    activeLocationId?: number;
    setActiveLocationId?: (id: number | undefined) => void;
}

export default function Map(props: MapProps) {
    const {position, zoom, activeLocationId, setActiveLocationId} = props;

    const mapRef = useRef<LeafletMap | null>(null);
    const markerRefs = useRef<{ [key: string]: LeafletMarker | null }>({});

    const router = useRouter();

    function formatPrice(price: string) {
        // Convert the price to a float
        let number = Number.parseFloat(price);

        // Otherwise, format the number with spaces
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    const t = useTranslations();

    useEffect(() => {
        Object.values(markerRefs.current).forEach(marker => {
            if (marker) {
                marker.closePopup();
            }
        });
        if (activeLocationId && mapRef.current && markerRefs?.current?.[activeLocationId]) {
            const markerLocation = markerRefs.current[activeLocationId]?.getLatLng();
            if (markerLocation) {
                mapRef.current.flyTo(markerLocation, 15, {
                    animate: false
                });
                markerRefs.current[activeLocationId]?.openPopup();
            }
        }
    }, [activeLocationId]);

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Object.values(markerRefs.current).forEach(marker => {
            if (marker) {
                marker.closePopup();
            }
        });

        if (setActiveLocationId) {
            setActiveLocationId(undefined);
        }
    }

    return (
        <MapContainer center={position} zoom={zoom} ref={mapRef}>
            <TileLayer
                url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <MarkerClusterGroup maxClusterRadius={40}
            >
                {
                    props.locations.map(location => (
                        <Marker
                            key={location.id}
                            position={[Number(location.lat), Number(location.lon)]}
                            icon={icon}
                            ref={el => {
                                markerRefs.current[location.id] = el
                            }}
                        >
                            {!props.noPopup &&
                                <Popup offset={[12, 15]} closeButton={false} autoClose className={`relative`}>
                                    <Link href={`/listing/${location.id}`} className={`!text-black`}>
                                        <ListingMapCarousel locationId={location.id}/>

                                        {/*Close button*/}
                                        <button
                                            className={`absolute top-2 right-2 p-2 z-30 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-lg`}
                                            onClick={handleClose}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5`} fill="none"
                                                 viewBox="0 0 24 24"
                                                 stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>

                                        <div className={`p-4`}>

                                            <div className={`font-bold mb-2`}>{location?.title}</div>

                                            <div className={`flex items-center justify-between`}>
                                                <div
                                                    className={`w-fit mt-0`}>{formatPrice(location.price)} zł {location.transaction === 'wynajem' && ' / ' + t.listingCard.month}</div>

                                            </div>
                                        </div>


                                    </Link>
                                </Popup>}
                            {/*<Tooltip direction="left" offset={[-10, -20]} opacity={1} interactive={false} permanent={false} sticky={true}>*/}
                            {/*    {location.title}*/}
                            {/*</Tooltip>*/}
                        </Marker>
                    ))
                }
            </MarkerClusterGroup>
        </MapContainer>
    );
}
