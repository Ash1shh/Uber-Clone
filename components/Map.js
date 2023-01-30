import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef } from "react";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 17.3457,
        longitude: 78.5522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      // initialRegion={{
      //   latitude: origin?.loaction.lat,
      //   longitude: origin?.loaction.lng,
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.005,
      // }}
    >
      {!!origin && !!destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          lineDashPattern={[0]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
          onError={(error) => console.log("Directions error: ", error)}
        />
      )}
      {origin?.loaction && (
        <Marker
          coordinate={{
            latitude: origin?.loaction.lat,
            longitude: origin?.loaction.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        ></Marker>
      )}
      {destination?.loaction && (
        <Marker
          coordinate={{
            latitude: destination?.loaction.lat,
            longitude: destination?.loaction.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        ></Marker>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
