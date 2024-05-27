import React, { useEffect } from 'react';
import {Marker, layerGroup, icon} from 'leaflet';
import useMap from '../../use-map';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { Location } from '../../types/location';
import { NameSpace, TIMEOUT } from '../../const';

type MapProps = {
  points: Location[];
}

function MapComponent(props: MapProps): JSX.Element {
  const city = useAppSelector((state) => state[NameSpace.Data].city);
  const {points} = props;
  const selectedPoint = useAppSelector((state) => state[NameSpace.Data].selectedOffer?.location);
  const mapRef = React.useRef(null);
  const map = useMap(mapRef, city);
  const activeIcon = icon({
    iconUrl: '/img/pin-active.svg'
  });
  useEffect(() => {
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
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
      }
    }, TIMEOUT);

    return () => {
      isMounted = false;
    };
  }, [map, points, selectedPoint, city, activeIcon]);


  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export const Map = React.memo(MapComponent);
