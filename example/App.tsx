import React from "react";
import { MapView, MapMarker, MapCallout } from "@draftbit/expo-maps";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const mapRef = React.createRef<MapView<any>>();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        apiKey={process.env.EXPO_PUBLIC_WEB_GOOGLE_MAPS_API_KEY}
        showsCompass={true}
        style={styles.map}
        latitude={43.741895}
        autoClusterMarkers
        longitude={-73.989308}
        zoom={16}
      >
        <MapMarker
          latitude={40.741895}
          longitude={-73.989308}
          pinColor={"red"}
          title="Draftbit"
          description="A simple MapView example"
        />
        <MapMarker
          latitude={40.741895}
          longitude={-73.979308}
          pinColor={"blue"}
        >
          <MapCallout showTooltip>
            <Text>With Callout</Text>
          </MapCallout>
        </MapMarker>

        <MapMarker
          latitude={43.741895}
          longitude={-73.989308}
          pinColor={"green"}
          title="Draftbit"
          description="A simple MapView example"
        />
        <MapMarker
          latitude={43.741895}
          longitude={-73.979308}
          pinColor={"yellow"}
        >
          <MapCallout showTooltip>
            <Text>With Callout</Text>
          </MapCallout>
        </MapMarker>
      </MapView>
      <Button
        title="Zoom to Chicago"
        onPress={() => {
          mapRef.current?.animateToLocation({
            latitude: 41.8781,
            longitude: -87.6298,
            zoom: 10,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
});
