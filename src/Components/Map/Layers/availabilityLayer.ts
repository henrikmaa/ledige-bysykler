import mapboxgl from "mapbox-gl";
import { BikeHub } from "../../../../dto/hubs.dto";

export const loadBikeHubs = (map: mapboxgl.Map, hubData: BikeHub[]) => {
  map.addSource("hub-source", {
    type: "geojson",
    data: convertHubToGeojson(hubData),
    tolerance: 0,
  });

  map.addLayer({
    id: "hubs",
    type: "symbol",
    source: "hub-source",
    layout: {
      "icon-allow-overlap": true,
      "text-allow-overlap": true,
      "icon-image": "bicycle",
      "icon-size": 2,
    },
    paint: {},
  });
};

const convertHubToGeojson = (hubData: BikeHub[]): any => {
  return {
    type: "FeatureCollection",
    features: hubData.map((hub: BikeHub) => {
      return {
        type: "Feature",
        properties: {
          name: hub.name,
          available_slots: hub.available_slots,
          available_vehicles: hub.available_vehicles,
          capacity: hub.capacity,
          type: "BikeHub",
        },
        geometry: {
          type: "Point",
          coordinates: [Number(hub.longitude), Number(hub.latitude)],
        },
      };
    }),
  };
};
