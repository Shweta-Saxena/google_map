import {
  GoogleMap,
  useJsApiLoader,
  InfoBox,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState , useRef } from "react";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";


const containerStyle = {
  height: "500px",
  width: "100%",
};
const center = {
  lat: 28.375694,
  lng: 79.435959,
};

const position = [
  {
    lat: 28.375694,
    lng: 79.435959,
  },
  {
    lat: 28.802958,
    lng: 79.025444,
  },
  {
    lat: 28.033709,
    lng: 79.120544,
  },
  {
    lat: 28.7700672,
    lng: 79.4882816,
  },
  {
    lat: 28.667856,
    lng: 77.449791,
  },
];
function App() {
  const baseURL = `${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
  const [origin, setOrigin] = useState("");
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  // const [distance, setDistance] = useState("");
  // const [duration, setDuration] = useState("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: baseURL,
   
  });
  // const originRef = useRef();
  // const destinationRef = useRef();
  function getReverseGeocodingData() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);

      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${baseURL}`
        )
        .then((response) => {
          console.log(response.data.results[0]);
          setOrigin(response.data.results[0].formatted_address);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  }

  //   async function calculateRoute() {
  //   if (originRef.current?.value === "" || destinationRef.current?.value === "") {
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
  
  // }

  return (
    <>
     {/* <Autocomplete
        style={{ width: "50%" }}
        apiKey={baseURL}
        placeholder="Enter your origin "
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        ref={originRef}
        options={{
          componentRestrictions: { country: ["in", "uk", "us"]},
          types: ["geocode"],
        }}
      />
      <Autocomplete
        style={{ width: "50%" }}
        apiKey={baseURL}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        placeholder="Enter your destination"
        ref={destinationRef}
        options={{
          componentRestrictions: { country: "in" },
          // location: toLocation,
          types: ["geocode"],
        }}
      />  */}
       {/* <button type="button" onClick={calculateRoute}>
        Calculate Route
      </button>
      <button type="button" onClick={clearRoute}>
        Clear
      </button> */}
      <div className="App">
        <div>
          <button onClick={() => map.panTo(center)}>
            Go back to Center position
          </button>
          <button onClick={getReverseGeocodingData}>Current location</button>
        </div>

        <p className="para">{origin}</p>
      </div>

      <div>
        {isLoaded ? (
          <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
              onLoad={(map) => setMap(map)}
                options={{
                  zoomControl:true,
                  // streetViewControl: false,
                  // mapTypeControl: false,
                  // fullscreenControl: false,
              }}
            >

              <InfoBox position={center}>
                <div
                  style={{
                    backgroundColor: "yellow",
                    opacity: 0.75,
                    padding: 12,
                  }}
                >
                  <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                    STORES
                  </div>
                </div>
              </InfoBox>
            
              {position.map((item, index) => {
                return (
                  <Marker
                    position={{ lat: item.lat, lng: item.lng }}
                    id={item}
                    key={item.lat + index}
                    name="Center"
                    draggable={true}
                    animation={window.google.maps.Animation.DROP}
                    // icon={"/map_pin.svg"}
                  ></Marker>
                );
              })}
               {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            </GoogleMap>
          </>
        ) : null}
      </div>
   
   {/* {distance}
   {duration} */}
    </>
  );
}

export default App;
