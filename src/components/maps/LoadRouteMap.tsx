import { useEffect, useMemo, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import {
  LngLatBounds,
  type Map as MapInstance,
  type Marker as MarkerInstance,
} from 'maplibre-gl';

import mapLibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import locationCoordinatesData from '@/data/locationCoordinates.json';
import stateCoordinatesData from '@/data/stateCoordinates.json';

maplibregl.setWorkerUrl(mapLibreWorkerUrl);

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

const createDirectionElement = (color: string, rotation: number) => {
  const element = document.createElement('div');
  const arrow = document.createElement('div');

  element.setAttribute('aria-label', 'Route direction');
  element.style.width = '14px';
  element.style.height = '16px';

  arrow.style.position = 'absolute';
  arrow.style.top = '0';
  arrow.style.left = '0';
  arrow.style.width = '14px';
  arrow.style.height = '16px';
  arrow.style.backgroundColor = color;
  arrow.style.clipPath = 'polygon(0 0, 100% 50%, 0 100%)';
  arrow.style.filter = 'drop-shadow(0 0 1px #ffffff)';
  arrow.style.transform = `rotate(${String(rotation)}deg)`;
  arrow.style.transformOrigin = 'center';
  element.append(arrow);

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
    const destinationElement = createMarkerElement(`Destination: ${destination}`);
    const destinationMarker = new maplibregl.Marker({
      element: destinationElement,
    }).setLngLat(destinationCoordinates).addTo(map);
    markersRef.current = [originMarker, destinationMarker];

    map.on('load', () => {
      map.addSource('load-route', {
        type: 'geojson',
        data: route,
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
      const bounds = new LngLatBounds(originCoordinates, originCoordinates);
      bounds.extend(destinationCoordinates);
      map.once('idle', () => {
        const originPoint = map.project(originCoordinates);
        const destinationPoint = map.project(destinationCoordinates);
        const deltaX = destinationPoint.x - originPoint.x;
        const deltaY = destinationPoint.y - originPoint.y;
        const routeLength = Math.hypot(deltaX, deltaY);
        const routeAngle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        const directionX = deltaX / routeLength;
        const directionY = deltaY / routeLength;
        const destinationRadiusX = destinationElement.offsetWidth / 2;
        const destinationRadiusY = destinationElement.offsetHeight / 2;
        const destinationBoundary = 1 / Math.sqrt(
          (directionX / destinationRadiusX) ** 2
          + (directionY / destinationRadiusY) ** 2,
        );
        const arrowTipOffset = destinationBoundary - 2 + 7;
        const arrowPoint = map.unproject([
          destinationPoint.x - directionX * arrowTipOffset,
          destinationPoint.y - directionY * arrowTipOffset,
        ]);
        const directionMarker = new maplibregl.Marker({
          element: createDirectionElement(routeColor, routeAngle),
          anchor: 'center',
        }).setLngLat(arrowPoint).addTo(map);
        markersRef.current.push(directionMarker);
      });
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
  }, [destination, destinationCoordinates, origin, originCoordinates]);

  useEffect(() => {
    const map = mapRef.current;
    const routeColor = getRouteColor();

    if (map?.isStyleLoaded() && map.getLayer('load-route-line')) {
      map.setPaintProperty('load-route-line', 'line-color', routeColor);
    }

    markersRef.current.forEach((marker, index) => {
      const element = marker.getElement();

      if (index < 2) {
        element.style.borderColor = routeColor;
      } else if (element.firstElementChild instanceof HTMLElement) {
        element.firstElementChild.style.backgroundColor = routeColor;
      }
    });
  }, [mode, systemMode]);

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
