'use client';

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {map, Map as LeafletMap, Marker as LeafletMarker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import {IListing, IListingPin} from "@/types";
import Link from "next/link";
import {useRef, useEffect} from "react";
import useTranslations from "@/components/hooks/useTranslations";

interface MapProps {
    position: [number, number];
    zoom: number;
    locations: IListing[] | IListingPin[];
    noPopup?: boolean;
    activeLocationId?: number;
}

export default function Map(props: MapProps) {
    const {position, zoom, activeLocationId} = props;

    const mapRef = useRef<LeafletMap | null>(null);
    const markerRefs = useRef<{ [key: string]: LeafletMarker | null }>({});

    const t = useTranslations();

    useEffect(() => {
        Object.values(markerRefs.current).forEach(marker => {
            if (marker) {
                marker.closePopup();
            }
        });
        if (activeLocationId && markerRefs.current[activeLocationId]) {
            markerRefs.current[activeLocationId]?.openPopup();
            // mapRef?.current && mapRef.current.setView(markerRefs.current[activeLocationId]?.getLatLng(), 15)
            mapRef.current?.flyTo(markerRefs.current[activeLocationId]?.getLatLng(), undefined, {
                duration: 0.1
            });
        }
    }, [activeLocationId]);

    return (
        <MapContainer center={position} zoom={zoom} ref={mapRef}>
            <TileLayer
                url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png`}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {
                props.locations.map(location => (
                    <Marker
                        key={location.id}
                        position={[Number(location.lat), Number(location.lon)]}
                        ref={el => markerRefs.current[location.id] = el}
                    >
                        {!props.noPopup && <Popup>
                            <div>
                                {/*<img src={location.images[0]?.url} alt={location.title} />*/}
                                <p>{location?.title}</p>

                            </div>
                            <Link href={`/listing/${location.id}`} target={`_blank`}>
                                {t.viewMore}
                            </Link>
                        </Popup>}
                        {/*<Tooltip direction="left" offset={[-10, -20]} opacity={1} interactive={false} permanent={false} sticky={true}>*/}
                        {/*    {location.title}*/}
                        {/*</Tooltip>*/}
                    </Marker>
                ))
            }
        </MapContainer>
    );
}
