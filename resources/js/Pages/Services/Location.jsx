import { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 10.3157, // Cebu
  lng: 123.8854,
};

export default function Location() {
  // const geocoder = new window.google.maps.Geocoder();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);
  const [address, setAddress] = useState("");

  // 🗝️ Two keys
  const mapsApiKey = import.meta.env.VITE_MAPS_API_KEY; // Maps + Places
  const geocodeApiKey = import.meta.env.VITE_GEOCODE_API_KEY; // optional fallback

  const autocompleteRef = useRef(null);

  // When user selects a place from Autocomplete suggestions
  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
        setAddress(place.formatted_address || place.name);
      }
    }
  }, []);

  // Optional: manual geocoding if you want to handle raw input
  const handleGeocode = async () => {
    if (!address) return;
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${geocodeApiKey}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      setMapCenter(location);
      setMarkerPosition(location);
    } else {
      alert("Geocoding failed: " + data.status);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Google Map + Autocomplete</h3>

      <LoadScript
        googleMapsApiKey={mapsApiKey}
        libraries={["places"]} // needed for Autocomplete
      >
        {/* Address input with Autocomplete */}
        <div className="flex gap-2 mb-2">
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="flex-1 px-3 py-2 border rounded"
            />
          </Autocomplete>
          {/* Optional fallback button using Geocoding API key */}
          <button
            onClick={handleGeocode}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Locate
          </button>
        </div>

        {/* Google Map */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15}
          // onClick={(e) => {
          //   // allow clicking on map to place marker manually
          //   const lat = e.latLng.lat();
          //   const lng = e.latLng.lng();
          //   setMarkerPosition({ lat, lng });
          // }}
          onClick={(e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();

            const newPos = { lat, lng };
            setMarkerPosition(newPos);
            setMapCenter(newPos);

            // Reverse geocode
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: newPos }, (results, status) => {
              if (status === "OK" && results[0]) {
                setAddress(results[0].formatted_address);
              } else {
                setAddress("No address found");
              }
            });
          }}
        >
          {/* <Marker position={markerPosition} draggable={true} /> */}
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              const newPos = { lat, lng };

              setMarkerPosition(newPos);
              setMapCenter(newPos);

              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: newPos }, (results, status) => {
                if (status === "OK" && results[0]) {
                  setAddress(results[0].formatted_address);
                } else {
                  setAddress("No address found");
                }
              });
            }}
          />
        </GoogleMap>
      </LoadScript>

      <div className="mt-4">
        <p className="text-gray-700">
          Selected Coordinates:{" "}
          <span className="font-semibold">
            {markerPosition.lat}, {markerPosition.lng}
          </span>
        </p>
        <p className="text-gray-700">
          Address: <span className="font-semibold">{address}</span>
        </p>
      </div>
    </div>
  );
}
