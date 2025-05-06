import {
  GeoJSON,
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  Tooltip,
  Circle,
} from "react-leaflet";
import type {
  Feature,
  FeatureCollection,
  GeoJsonObject,
} from "geojson";
import L from "leaflet";
import * as turf from "@turf/turf";
import proj4 from "proj4";
import indreGeoJson from "../../data/indre.geo.json";
import type { GeoFeaturePropertiesType } from "../types/GeoFeaturePropertiesType.ts";
import { useEffect, useState } from "react";
import type { BaseDoctor } from "../interfaces/BaseDoctor.ts";

export function Home() {
  const geoJsonData: GeoJsonObject = indreGeoJson as GeoJsonObject;
  console.log(geoJsonData);

  //City selected by the user on the map
  const [selectedCity, setSelectedCity] =
    useState<GeoFeaturePropertiesType | null>(null);
  //Position of the marker on the map
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const [doctors, setDoctors] = useState<BaseDoctor[]>([]);
  const [municipalitiesProperties, setMunicipalitiesProperties] = useState<
    { nbDoctors: number; code: string; density: number }[]
  >([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const computeMunicipalitiesProperties = () => {
      setMunicipalitiesProperties(
        (geoJsonData as FeatureCollection).features.map((feature) => {
          const featureProperties = feature.properties ?? {};
          const doctorsCount = doctors.filter(
            (doctor) => doctor.codeCommune === featureProperties.code
          ).length;
          return {
            nbDoctors: doctorsCount,
            code: featureProperties.code || '',
            density: doctorsCount / (featureProperties.population || 1),
          };
        })
      );
    };

    computeMunicipalitiesProperties();
  }, [doctors, geoJsonData]);

  async function fetchDoctors() {
    const response = await fetch("http://localhost:3000/api/doctors/indre");
    const data = await response.json();
    setDoctors(data);
  }

  function style(feature: Feature | undefined) {
    const maxDensity = municipalitiesProperties.reduce(
      (acc, cur) => acc > cur.density ? acc : cur.density,
      0
    );
    const value = municipalitiesProperties.find(
      (municipality) => municipality.code === feature?.properties?.code
    )?.density;

    return {
      fillColor: "blue",
      weight: 2,
      opacity: 1,
      color: "grey",
      dashArray: "3",
      fillOpacity: Math.min(0.1 + ((value ? value : 0) / maxDensity), 0.9),
    };
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
            Nombre de docteurs:{" "}
            {
              doctors.filter(
                (doctor) => doctor.codeCommune === selectedCity.code
              ).length
            }
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
            <GeoJSON data={geoJsonData} style={style} />
            <DoctorsPoints doctors={doctors} />
            <LocationMarker />
          </MapContainer>
        </div>
      </section>
    </header>
  );
}
