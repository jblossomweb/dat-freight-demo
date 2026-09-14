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

    map.on('load', () => {
      map.addSource('load-stops', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: originCoordinates },
              properties: { label: `Origin: ${origin}` },
            },
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: destinationCoordinates },
              properties: { label: `Destination: ${destination}` },
            },
          ],
        },
      });
      map.addLayer({
        id: 'load-stop-circles',
        type: 'circle',
        source: 'load-stops',
        paint: {
          'circle-color': routeColor,
          'circle-radius': 9,
          'circle-stroke-color': routeColor,
          'circle-stroke-width': 2,
        },
      });
      map.addSource('load-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [originCoordinates, destinationCoordinates],
          },
          properties: {},
        },
      });
      map.addLayer({
        id: 'load-route-line',
        type: 'line',
        source: 'load-route',
        paint: {
          'line-color': routeColor,
          'line-width': 2,
          'line-opacity': 1,
        },
      });
      map.addLayer({
        id: 'load-stop-labels',
        type: 'symbol',
        source: 'load-stops',
        layout: {
          'text-field': ['get', 'label'],
          'text-font': ['Open Sans Semibold'],
          'text-size': 11,
          'text-offset': [0, 1],
          'text-anchor': 'top',
        },
        paint: {
          'text-color': routeColor,
          'text-halo-color': '#fff',
          'text-halo-width': 1,
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
        const arrowTipOffset = 16;
        const arrowPoint = map.unproject([
          destinationPoint.x - directionX * arrowTipOffset,
          destinationPoint.y - directionY * arrowTipOffset,
        ]);
        const directionMarker = new maplibregl.Marker({
          element: createDirectionElement(routeColor, routeAngle),
          anchor: 'center',
        }).setLngLat(arrowPoint).addTo(map);
        markersRef.current.push(directionMarker);
        map.on('move', () => {
          const currentOriginPoint = map.project(originCoordinates);
          const currentDestinationPoint = map.project(destinationCoordinates);
          const currentDeltaX = currentDestinationPoint.x - currentOriginPoint.x;
          const currentDeltaY = currentDestinationPoint.y - currentOriginPoint.y;
          const currentRouteLength = Math.hypot(currentDeltaX, currentDeltaY);
          const currentDirectionX = currentDeltaX / currentRouteLength;
          const currentDirectionY = currentDeltaY / currentRouteLength;
          const currentArrowPoint = map.unproject([
            currentDestinationPoint.x - currentDirectionX * arrowTipOffset,
            currentDestinationPoint.y - currentDirectionY * arrowTipOffset,
          ]);

          directionMarker.setLngLat(currentArrowPoint);
        });
      });
      map.fitBounds(bounds, { padding: 96, maxZoom: 8 });
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

    if (map?.isStyleLoaded()) {
      if (map.getLayer('load-route-line')) {
        map.setPaintProperty('load-route-line', 'line-color', routeColor);
      }

      if (map.getLayer('load-stop-circles')) {
        map.setPaintProperty('load-stop-circles', 'circle-color', routeColor);
        map.setPaintProperty('load-stop-circles', 'circle-stroke-color', routeColor);
      }

      if (map.getLayer('load-stop-labels')) {
        map.setPaintProperty('load-stop-labels', 'text-color', routeColor);
      }
    }

    markersRef.current.forEach(marker => {
      const element = marker.getElement();

      if (element.firstElementChild instanceof HTMLElement) {
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
