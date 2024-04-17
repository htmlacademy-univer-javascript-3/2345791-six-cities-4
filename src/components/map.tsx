import React, { useEffect } from 'react';
import {Marker, layerGroup} from 'leaflet';
import useMap from '../use-map';
import {Point} from '../types/point';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../hooks';

type MapProps = {
  points: Point[];
}

function Map(props: MapProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const {points} = props;
  const selectedPoint = useAppSelector((state) => state.selectedOffer.point);
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
        if (point === selectedPoint) {
          marker.setOpacity(0.5);
        }
      });
      map.flyTo([city.lat, city.lng], 10);
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, city]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
