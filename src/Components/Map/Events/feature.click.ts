import { MapMouseEvent } from "mapbox-gl";

export const onMapMouseEnter = (map: mapboxgl.Map) => {
  map.getCanvas().style.cursor = "pointer";
};

export const onMapMouseLeave = (map: mapboxgl.Map) => {
  map.getCanvas().style.cursor = "";
};

export const getFeature = (
  map: mapboxgl.Map,
  event: MapMouseEvent,
  callbackFunc: (feature: any) => void
) => {
  const feature = map.queryRenderedFeatures(event.point);
  if (feature && feature[0].properties) {
    callbackFunc(feature[0].properties);
  } else {
    return null;
  }
};

export const onFeatureClick = (
  key: string,
  map: mapboxgl.Map,
  callbackFunc: (feature: any) => void
) => {
  map.on("click", key, (event: MapMouseEvent) => {
    return getFeature(map, event, callbackFunc);
  });
  map.on("mouseenter", key, () => onMapMouseEnter(map));
  map.on("mouseleave", key, () => onMapMouseLeave(map));
};
