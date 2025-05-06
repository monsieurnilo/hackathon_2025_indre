import {GeoJSON, MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import type {GeoJsonObject} from "geojson";
import L from "leaflet";
import * as turf from "@turf/turf";

import indreGeoJson from "../../data/indre.geo.json";
import type {GeoFeaturePropertiesType} from "../types/GeoFeaturePropertiesType.ts";
import {useState} from "react";

export function Home() {
    const geoJsonData: GeoJsonObject = indreGeoJson as GeoJsonObject;

    //City selected by the user on the map
    const [selectedCity, setSelectedCity] = useState<GeoFeaturePropertiesType | null>(null);
    //Position of the marker on the map
    const [position, setPosition] = useState<L.LatLng | null>(null);

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                const { latlng } = e;

                let foundCity = null;
                L.geoJSON(geoJsonData).eachLayer((layer) => {
                    if (layer instanceof L.Polygon) {
                        const latLngs = layer.getLatLngs() as L.LatLng[][];
                        const flatLatLngs = latLngs.flat().map((latlng) => [latlng.lng, latlng.lat]);

                        if (flatLatLngs.length > 0 && flatLatLngs[0] !== flatLatLngs[flatLatLngs.length - 1]) {
                            flatLatLngs.push(flatLatLngs[0]);
                        }

                        const polygon = turf.polygon([flatLatLngs]);
                        const point = turf.point([latlng.lng, latlng.lat]);

                        if (turf.booleanPointInPolygon(point, polygon)) {
                            const feature = layer.feature;
                            if (feature && feature.properties) {
                                foundCity = feature.properties as GeoFeaturePropertiesType;
                            }
                        }
                    }
                });
                if (foundCity !== null){
                    setPosition(latlng);
                    setSelectedCity(foundCity);
                    map.flyTo(latlng, map.getZoom());
                }
            },
        });

        return position === null || selectedCity === null ? null : (
            <Marker position={position}>
                <Popup>
                    <div>
                        <strong>{selectedCity.nom}</strong>
                        <br />
                        Population: {selectedCity.population}
                        <br />
                        Code postal: {selectedCity.codesPostaux.join(", ")}
                    </div>
                </Popup>
            </Marker>
        );
    }

    return (
        <header>
            <section style={{ display: 'flex', flexDirection: 'row' }}>
                <div>
                    <h1>Informations de la ville sélectionnée :</h1>
                    <pre>{JSON.stringify(selectedCity, null, 2)}</pre>
                </div>
                <div style={{height: '100vh', width: '100%'}}>
                    <MapContainer center={[46.813744, 1.693057]} zoom={9} style={{height: '100%', width: '100%'}}>
                        <TileLayer
                            attribution='© OpenStreetMap contributors, © CartoDB'
                            url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                        />
                        <GeoJSON data={geoJsonData}/>
                        <LocationMarker/>
                    </MapContainer>
                </div>
            </section>

        </header>

    );
}