import React, { useEffect } from 'react';
import {Marker, layerGroup, icon} from 'leaflet';
import useMap from '../use-map';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../hooks';
import { Location } from '../types/location';

type MapProps = {
  points: Location[];
}

function Map(props: MapProps): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const {points} = props;
  const selectedPoint = useAppSelector((state) => state.selectedOffer?.location);
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);
  const activeIcon = icon({
    iconUrl: '/img/pin-active.svg'
  });
  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });
        marker.addTo(markerLayer);
        if (point === selectedPoint) {
          marker.setIcon(activeIcon);
        }
      });
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, city, activeIcon]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default React.memo(Map);
