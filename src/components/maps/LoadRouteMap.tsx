import { useEffect, useMemo, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import {
  LngLatBounds,
  type Map as MapInstance,
  type Marker as MarkerInstance,
} from 'maplibre-gl';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import locationCoordinatesData from '@/data/locationCoordinates.json';
import stateCoordinatesData from '@/data/stateCoordinates.json';

interface LoadRouteMapProps {
  origin: string;
  destination: string;
  height?: number | string;
}

type Coordinates = [number, number];

const toCoordinates = (coordinates: number[]): Coordinates => [
  coordinates[0],
  coordinates[1],
];

const toCoordinateRecord = (
  coordinateData: Record<string, number[]>,
): Record<string, Coordinates> => Object.fromEntries(
  Object.entries(coordinateData).map(([location, coordinates]) => [
    location,
    toCoordinates(coordinates),
  ]),
);

const stateCoordinates = toCoordinateRecord(stateCoordinatesData);
const locationCoordinates = toCoordinateRecord(locationCoordinatesData);

const resolveLocation = (location: string): Coordinates | undefined => {
  if (Object.hasOwn(locationCoordinates, location)) {
    return locationCoordinates[location];
  }

  const state = location.split(', ')[1];
  return state ? stateCoordinates[state] : undefined;
};

const getRouteColor = () => getComputedStyle(document.documentElement)
  .getPropertyValue('--mui-palette-primary-main')
  .trim();

const getRouteBearing = (
  [originLongitude, originLatitude]: Coordinates,
  [destinationLongitude, destinationLatitude]: Coordinates,
) => {
  const longitudeDelta = (destinationLongitude - originLongitude) * Math.PI / 180;
  const originLatitudeRadians = originLatitude * Math.PI / 180;
  const destinationLatitudeRadians = destinationLatitude * Math.PI / 180;
  const y = Math.sin(longitudeDelta) * Math.cos(destinationLatitudeRadians);
  const x = Math.cos(originLatitudeRadians) * Math.sin(destinationLatitudeRadians)
    - Math.sin(originLatitudeRadians)
    * Math.cos(destinationLatitudeRadians)
    * Math.cos(longitudeDelta);

  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
};

const createMarkerElement = (label: string) => {
  const element = document.createElement('div');
  const [heading, location] = label.split(': ');

  element.setAttribute('aria-label', label);
  element.style.backgroundColor = '#ffffff';
  element.style.border = `2px solid ${getRouteColor()}`;
  element.style.borderRadius = '999px';
  element.style.color = '#111827';
  element.style.fontFamily = 'Archivo, sans-serif';
  element.style.fontSize = '11px';
  element.style.fontWeight = '800';
  element.style.padding = '4px 8px';
  element.style.textAlign = 'center';
  element.style.whiteSpace = 'nowrap';

  const headingElement = document.createElement('strong');
  headingElement.style.fontSize = '10px';
  headingElement.style.fontWeight = '600';
  headingElement.textContent = `${heading}:`;

  const locationElement = document.createElement('span');
  locationElement.textContent = location;

  element.append(headingElement, document.createElement('br'), locationElement);

  return element;
};

const LoadRouteMap: React.FC<LoadRouteMapProps> = ({
  origin,
  destination,
  height = 400,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapInstance | null>(null);
  const markersRef = useRef<MarkerInstance[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const { mode, systemMode } = useColorScheme();
  const originCoordinates = useMemo(() => resolveLocation(origin), [origin]);
  const destinationCoordinates = useMemo(
    () => resolveLocation(destination),
    [destination],
  );

  useEffect(() => {
    if (!originCoordinates || !destinationCoordinates || !mapContainerRef.current) {
      return undefined;
    }

    const mapStyle = import.meta.env.VITE_MAP_STYLE_URL as string | undefined;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle ?? 'https://tiles.openfreemap.org/styles/liberty',
      center: originCoordinates,
      zoom: 3,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    const routeColor = getRouteColor();
    const routeBearing = getRouteBearing(originCoordinates, destinationCoordinates);

    const route = {
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: [originCoordinates, destinationCoordinates],
      },
      properties: {},
    };

    const originMarker = new maplibregl.Marker({
      element: createMarkerElement(`Origin: ${origin}`),
    }).setLngLat(originCoordinates).addTo(map);
    const destinationMarker = new maplibregl.Marker({
      element: createMarkerElement(`Destination: ${destination}`),
    }).setLngLat(destinationCoordinates).addTo(map);
    markersRef.current = [originMarker, destinationMarker];

    map.on('load', () => {
      map.addSource('load-route', {
        type: 'geojson',
        data: route,
      });
      map.addSource('load-route-arrow', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: destinationCoordinates,
          },
          properties: {
            rotation: routeBearing - 90,
          },
        },
      });
      map.addLayer({
        id: 'load-route-line',
        type: 'line',
        source: 'load-route',
        paint: {
          'line-color': routeColor,
          'line-width': 2,
          'line-opacity': 0.85,
        },
      });
      map.addLayer({
        id: 'load-route-direction-arrow',
        type: 'symbol',
        source: 'load-route-arrow',
        layout: {
          'text-field': '▶',
          'text-size': 18,
          'text-anchor': 'right',
          'text-offset': [-2, 0],
          'text-rotate': ['get', 'rotation'],
          'text-allow-overlap': true,
          'text-ignore-placement': true,
          'text-rotation-alignment': 'map',
        },
        paint: {
          'text-color': routeColor,
          'text-halo-color': '#ffffff',
          'text-halo-width': 1,
        },
      });

      const bounds = new LngLatBounds(originCoordinates, originCoordinates);
      bounds.extend(destinationCoordinates);
      map.fitBounds(bounds, { padding: 64, maxZoom: 8 });
    });

    map.on('error', () => {
      setMapError('The route map could not be loaded.');
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [destination, destinationCoordinates, mode, origin, originCoordinates, systemMode]);

  if (!originCoordinates || !destinationCoordinates) {
    return (
      <Alert severity="info">
        Route map unavailable for these locations.
      </Alert>
    );
  }

  if (mapError) {
    return <Alert severity="error">{mapError}</Alert>;
  }

  return (
    <Box
      ref={mapContainerRef}
      role="region"
      aria-label={`Route from ${origin} to ${destination}`}
      sx={{
        width: '100%',
        alignSelf: 'stretch',
        flex: 1,
        height,
        minHeight: 0,
        borderRadius: 1,
        overflow: 'hidden',
      }}
    />
  );
};

export default LoadRouteMap;
