import { Marker, Popup } from "react-leaflet";
import { useState } from "react";

const DraggableMarker = ({ latitude, longitude, onPositionChange }) => {
  const [position, setPosition] = useState({ lat: latitude, lng: longitude });

  const handleDragEnd = (e) => {
    const latLng = e.target.getLatLng();
    setPosition(latLng);
    onPositionChange(latLng.lat, latLng.lng);
  };

  return (
    <Marker
      draggable
      position={position}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    >
      <Popup>Drag me to update location</Popup>
    </Marker>
  );
};

export default DraggableMarker;
