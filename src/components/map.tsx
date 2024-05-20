import React, { useEffect } from 'react';
import {Marker, layerGroup, icon} from 'leaflet';
import useMap from '../use-map';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../hooks';
import { Location } from '../types/location';
import { NameSpace } from '../const';

type MapProps = {
  points: Location[];
  isOfferPage: boolean;
}

function MapComponent(props: MapProps): JSX.Element {
  const city = useAppSelector((state) => state[NameSpace.Data].city);
  const {points, isOfferPage} = props;
  const selectedPoint = useAppSelector((state) => state[NameSpace.Data].selectedOffer?.location);
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
        if (point === selectedPoint && !isOfferPage) {
          marker.setIcon(activeIcon);
        }
      });
      map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom);
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, city, activeIcon, isOfferPage]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export const Map = React.memo(MapComponent);
