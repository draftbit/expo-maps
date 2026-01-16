## `@draftbit/expo-maps`

Expo compatible maps library for iOS, Android, and Web

### Install

- **Install `react-native-maps` with Expo (compatible version)**:

```bash
npx expo install react-native-maps
```

- **Install `@draftbit/expo-maps`**:

```bash
npm install @draftbit/expo-maps
# or
yarn add @draftbit/expo-maps
```

### Configure API keys

- **iOS and Android (in your app config, e.g. `app.config.js` or `app.json`)**:

```js
ios: {
  config: {
    googleMapsApiKey: "<YOUR_IOS_GOOGLE_MAPS_API_KEY_HERE>",
  },
},
android: {
  config: {
    googleMaps: {
      apiKey: "<YOUR_ANDROID_GOOGLE_MAPS_API_KEY_HERE>",
    },
  },
},
```

### Usage

**Render `MapView` and pass a key for Web**, similar to `example/App.tsx`:

```tsx
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MapView, MapMarker, MapCallout } from "@draftbit/expo-maps";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        apiKey={"<YOUR_WEB_GOOGLE_MAPS_API_KEY_HERE>"}
        style={styles.map}
        latitude={40.741895}
        longitude={-73.989308}
        zoom={14}
      >
        <MapMarker latitude={40.741895} longitude={-73.989308}>
          <MapCallout showTooltip>
            <Text>Cool Place</Text>
          </MapCallout>
        </MapMarker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
```

### Note on Keys

You can hard-code your keys as above, or the reccomended way is to wire them to env vars.

- **Env vars used by the example app in `example/`**:
  - `IOS_GOOGLE_MAPS_API_KEY`
  - `ANDROID_GOOGLE_MAPS_API_KEY`
  - `EXPO_PUBLIC_WEB_GOOGLE_MAPS_API_KEY`
