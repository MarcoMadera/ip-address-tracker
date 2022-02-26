import React, { ReactElement } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import LocationIcon from "./icons/LocationIcon";

export default function Map({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): ReactElement {
  return (
    <MapContainer center={[lat || 0, lon || 0]} zoom={12}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat || 0, lon || 0]} icon={LocationIcon} />
    </MapContainer>
  );
}
