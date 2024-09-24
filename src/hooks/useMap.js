import { useState, useEffect, useRef } from "react";
import { fromLonLat } from "ol/proj";
import createMap from "../components/utils/createMap";
import { easeOut } from "ol/easing";

import { useLocation } from "react-router-dom";
export const REACT_APP_MAP_CENTER_LON = process.env.REACT_APP_MAP_CENTER_LON;
export const REACT_APP_MAP_CENTER_LAT = process.env.REACT_APP_MAP_CENTER_LAT;

function useMap() {
  const location = useLocation();
  const vectorLayerRef = useRef(null);
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);
  console.log(REACT_APP_MAP_CENTER_LAT, REACT_APP_MAP_CENTER_LON);
  const [center, setCenter] = useState(
    fromLonLat([REACT_APP_MAP_CENTER_LAT, REACT_APP_MAP_CENTER_LON])
  );
  const [zoom, setZoom] = useState(9.5);
  useEffect(() => {
    const newMap = createMap({
      center,
      mapContainerRef: mapContainerRef.current,
      zoom,
      location,
    });
    if (newMap) {
      setMap(newMap);
      const targetZoom = 13;
      newMap
        .getView()
        .animate({ zoom: targetZoom, duration: 2000, easing: easeOut });
    }
  }, [mapContainerRef, center, zoom, location]);

  return {
    mapContainerRef,
    map,
    setZoom,
    setCenter,
    center,
    zoom,
    vectorLayerRef,
  };
}

export default useMap;
