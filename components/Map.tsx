'use client'

import  {MapContainer, Marker, Popup, TileLayer} from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import {IListing} from "@/types";


interface MapProps {
    position: [number, number]
    zoom: number,
    locations: IListing[],
    noPopup?: boolean
}

export default function Map(props: MapProps) {
    const {position, zoom} = props

    return <MapContainer center={position} zoom={zoom}>
        <TileLayer
            url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png`}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            //     url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        {
            props.locations.map(location => (
                <Marker key={location.id} position={[Number(location.lat), Number(location.lon)]}>
                    {!props.noPopup && <Popup>
                        <div>
                            <img src={location.images[0]?.url} alt={location.title}/>
                            <p>{location.description.slice(0, 100)}...</p>
                            <span>{location.price} PLN</span>
                            <span> | {location.areaTotal} m<sup>2</sup></span>
                            <br/>
                        </div>
                        <button className={`mt-2`}>Zobacz</button>
                    </Popup>}
                </Marker>
            ))
        }
    </MapContainer>
}
