import React from "react";
import { Map as MapContainer, Marker, TileLayer } from "react-leaflet";
import LocationIcon from "./icons/LocationIcon";
import PropTypes from "prop-types";

const Map = ({ lat, lon }) => {
  return (
    <MapContainer center={[lat, lon]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]} icon={LocationIcon} />
    </MapContainer>
  );
};

Map.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
};
export default Map;
