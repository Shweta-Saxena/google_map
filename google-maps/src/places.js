import React, { useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";

const containerStyle = {
  height: "500px",
};
const center = {
  lat: 28.375694,
  lng: 79.435959,
};

function Places() {
  const baseURL = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: baseURL,
   });
  const [map, setMap] = useState(null);

  const originRef = useRef();
  const destinationRef = useRef();

  // async function calculateRoute() {
  //   if (originRef.current.value === "" || destinationRef.current.value === "") {
  //     return;
  //   }
  //   const directionService = new window.google.maps.DirectionsService();
  //   const results = await directionService.route({
  //     origin: originRef.current.value,
  //     destination: destinationRef.current.value,
  //     travelMode: window.google.maps.TravelMode.DRIVING,
  //   });
  //   setDirectionsResponse(results);
  //   setDistance(results.routes[0].legs[0].distance.text);
  //   setDuration(results.routes[0].legs[0].duration.text);
  // }

  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   setDistance("");
  //   setDuration("");
  //   originRef.current.value("");
  //   destinationRef.current.value("");
  // }
  return (
    <div className="App">
      
     
      {/* <button type="button" onClick={calculateRoute}>
        Calculate Route
      </button>
      <button type="button" onClick={clearRoute}>
        Clear
      </button> */}
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={(map) => setMap(map)}
          
          >
            <Marker
              position={center}
              animation={window.google.maps.Animation.BOUNCE}
            ></Marker>
            {/* {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )} */}
          </GoogleMap>
        </>
      ) : null}
    
     {/* {distance}
     {duration} */}
    </div>
  );
}

export default Places;
