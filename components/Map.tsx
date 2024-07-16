'use client';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L, { Map as LeafletMap, Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { IListing, IListingPin } from "@/types";
import Link from "next/link";
import { useRef, useEffect } from "react";
import MarkerClusterGroup from 'react-leaflet-cluster';
import useTranslations from "@/components/hooks/useTranslations";

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
}

export default function Map(props: MapProps) {
    const { position, zoom, activeLocationId } = props;

    const mapRef = useRef<LeafletMap | null>(null);
    const markerRefs = useRef<{ [key: string]: LeafletMarker | null }>({});

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
                    duration: 0.1
                });
                markerRefs.current[activeLocationId]?.openPopup();
            }
        }
    }, [activeLocationId]);

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
                            ref={el => { markerRefs.current[location.id] = el }}
                        >
                            {!props.noPopup && <Popup>
                                <div>
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
            </MarkerClusterGroup>
        </MapContainer>
    );
}
