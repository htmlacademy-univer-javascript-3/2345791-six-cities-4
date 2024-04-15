import React, { useEffect } from 'react';
import {Marker, layerGroup} from 'leaflet';
import useMap from '../use-map';
import {Point} from '../types/point';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../hooks';

type MapProps = {
  points: Point[];
  selectedPoint?: Point;
}

function Map(props: MapProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const {points, selectedPoint} = props;

  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });
        marker.addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
