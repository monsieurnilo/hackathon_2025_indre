import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Tooltip,
  Circle,
} from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import * as turf from "@turf/turf";
import proj4 from "proj4";
import indreGeoJson from "../../data/indre.geo.json";
import type { GeoFeaturePropertiesType } from "../types/GeoFeaturePropertiesType.ts";
import { useEffect, useState } from "react";
import type { BaseDoctor } from "../interfaces/BaseDoctor.ts";

export function Home() {
  const geoJsonData: GeoJsonObject = indreGeoJson as GeoJsonObject;

  //City selected by the user on the map
  const [selectedCity, setSelectedCity] =
    useState<GeoFeaturePropertiesType | null>(null);
  //Position of the marker on the map
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const [doctors, setDoctors] = useState<BaseDoctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  async function fetchDoctors() {
    const response = await fetch("http://localhost:3000/api/doctors/indre");
    const data = await response.json();
    setDoctors(data);
  }

  function DoctorsPoints({ doctors }: { doctors: BaseDoctor[] }) {
    return doctors.map((doctor) => {
      const lat = parseFloat(doctor.coordonnees?.x);
      const lng = parseFloat(doctor.coordonnees?.y);

      if (!isNaN(lat) && !isNaN(lng)) {
        proj4.defs(
          "EPSG:2154",
          "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
        );

        const [longitude, latitude] = proj4("EPSG:2154", "EPSG:4326", [
          lat,
          lng,
        ]);
        return (
          <Circle
            key={doctor.siret}
            center={[latitude, longitude]}
            radius={15}
            color="red"
          ></Circle>
        );
      }
    });
  }

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        const { latlng } = e;

        let foundCity = null;
        L.geoJSON(geoJsonData).eachLayer((layer) => {
          if (layer instanceof L.Polygon) {
            const latLngs = layer.getLatLngs() as L.LatLng[][];
            const flatLatLngs = latLngs
              .flat()
              .map((latlng) => [latlng.lng, latlng.lat]);

            if (
              flatLatLngs.length > 0 &&
              flatLatLngs[0] !== flatLatLngs[flatLatLngs.length - 1]
            ) {
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
        if (foundCity !== null) {
          setPosition(latlng);
          setSelectedCity(foundCity);
          map.flyTo(latlng, map.getZoom());
        }
      },
    });

    return position === null || selectedCity === null ? null : (
      <Marker position={position}>
        <Tooltip permanent>
          <div>
            <strong>{selectedCity.nom}</strong>
            <br />
            Population: {selectedCity.population}
            <br />
            Code postal: {selectedCity.codesPostaux.join(", ")}
            <br />
            Nombre de docteurs: {doctors.filter((doctor) => doctor.codeCommune === selectedCity.code).length}
          </div>
        </Tooltip>
      </Marker>
    );
  }

  return (
    <header>
      <section style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <h1>Informations de la ville sélectionnée :</h1>
          <pre>{JSON.stringify(selectedCity, null, 2)}</pre>
        </div>
        <div style={{ height: "100vh", width: "100%" }}>
          <MapContainer
            center={[46.813744, 1.693057]}
            zoom={9}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors, © CartoDB"
              url="http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geoJsonData} />
            <DoctorsPoints doctors={doctors} />
            <LocationMarker />
          </MapContainer>
        </div>
      </section>
    </header>
  );
}
