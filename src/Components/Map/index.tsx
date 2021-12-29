import * as React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onFeatureClick } from "./Events/feature.click";
import { MapMouseEvent } from "mapbox-gl";

interface MapboxMapProps {
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onCreated?(map: mapboxgl.Map): void;
  onLoaded?(map: mapboxgl.Map): void;
  onMove?(map: mapboxgl.Map): void;
  onClickCallback?(feature: any): void;
  onRemoved?(): void;
  initialPosition?: Array<number>;
  minZoom?: number;
  massType?: string | undefined;
  onClickCallback?: (feature: any) => void;
}

function MapboxMap({
  initialOptions = {},
  onCreated,
  onLoaded,
  onRemoved,
  onMove,
  initialPosition,
  minZoom,
  onClickCallback,
}: MapboxMapProps) {
  const [, setMap] = React.useState<mapboxgl.Map>();
  const mapNode = React.useRef(null);
  let mapboxMap: mapboxgl.Map;

  React.useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      style: "mapbox://styles/henrikmaa/ckpgvm9aq054l17qcqnupn5uq",
      center: initialPosition ?? [0, 0],
      zoom: 14,
      minZoom: minZoom ?? null,
      trackResize: true,
      ...initialOptions,
    });

    setMap(mapboxMap);

    if (onCreated) onCreated(mapboxMap);
    if (onMove) mapboxMap.on("move", () => onMove(mapboxMap));

    mapboxMap.once("load", () => {
      if (onLoaded) {
        onLoaded(mapboxMap);
      }
    });

    if (onClickCallback) {
      onFeatureClick("hubs", mapboxMap, (event: MapMouseEvent) =>
        onClickCallback(event)
      );
    }

    return () => {
      mapboxMap.remove();
      setMap(undefined);
      if (onRemoved) onRemoved();
    };
  }, []);

  return (
    <>
      <div
        ref={mapNode}
        style={{ width: "100%", height: "100%", display: "flex" }}
      ></div>
    </>
  );
}

export default MapboxMap;
