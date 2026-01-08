import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "16px",
};

export default function LocationPreview({ lat, lng }) {
  if (!lat || !lng) return null;

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}
