import * as React from "react";
import { Platform } from "react-native";
import { Circle as MapCircleComponent } from "./react-native-maps";
import type { MapCircleProps as MapCircleComponentProps } from "react-native-maps";
import Color from "color";

export interface MapCircleProps extends Omit<
  MapCircleComponentProps,
  "center"
> {
  latitude: number;
  longitude: number;
}

const MapCircle: React.FC<React.PropsWithChildren<MapCircleProps>> = ({
  latitude,
  longitude,
  radius = 2000,
  fillColor: fillColorProp = "#FFFFFF",
  strokeColor = "#000000",
  ...rest
}) => {
  const parsedColor = Color(fillColorProp);

  let fillColor;
  if (parsedColor.alpha() === 0) {
    fillColor = "transparent";
  } else if (Platform.OS !== "web") {
    // Web maps by default uses a lower opacity for the circle, native needs this extra step
    fillColor = parsedColor.alpha(0.3).rgb().string();
  } else {
    fillColor = fillColorProp;
  }

  return (
    <MapCircleComponent
      center={{
        latitude,
        longitude,
      }}
      radius={radius}
      fillColor={fillColor}
      strokeColor={strokeColor}
      {...rest}
    />
  );
};

export default MapCircle;
