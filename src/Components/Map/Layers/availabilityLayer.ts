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
      "text-field": [
        "format",
        ["get", "available_vehicles"],
        {
          "font-scale": 1,
        },
      ],
      "text-offset": [0.6, 0],
      "icon-allow-overlap": true,
      "text-allow-overlap": true,
      "icon-image": "cycle-bg-light",
      "icon-size": 0.8,
    },
    paint: {
      "text-color": "#000",
      "text-halo-color": "#000",
      "text-halo-width": 0.3,
    },
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
