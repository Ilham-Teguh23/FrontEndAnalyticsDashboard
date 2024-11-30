import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { fetchRouteData } from "../redux/slices/dataSlice";
import { useParams } from 'react-router-dom';

import imageTaxi from "../images/image-taxi.png";
import imageMarker from "../images/image-marker.png";

const DetailDataSet = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { routeData, loading, error } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(fetchRouteData(id));
    }, [dispatch, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!routeData) return <div>No route data available</div>;

    const { pickup_latitude, pickup_longitude, dropoff_latitude, dropoff_longitude } = routeData;
    const pickupPosition = [parseFloat(pickup_latitude), parseFloat(pickup_longitude)];
    const dropoffPosition = [parseFloat(dropoff_latitude), parseFloat(dropoff_longitude)];

    return (
        <MapContainer
            center={pickupPosition}
            zoom={13}
            style={{ width: '100%', height: '500px' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={pickupPosition} icon={new L.Icon({
                iconUrl: imageTaxi,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
            })}>
                <Popup>Penjemputan</Popup>
            </Marker>

            <Marker position={dropoffPosition} icon={new L.Icon({
                iconUrl: imageMarker,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
            })}>
                <Popup>Pengantaran</Popup>
            </Marker>

            <RoutingControl
                pickupPosition={pickupPosition}
                dropoffPosition={dropoffPosition}
            />
        </MapContainer>
    );
}

const RoutingControl = ({ pickupPosition, dropoffPosition }) => {
    const map = useMap();
    const [routeInfo, setRouteInfo] = useState({ distance: 0, time: 0 });

    useEffect(() => {
        if (map && pickupPosition && dropoffPosition) {
            const routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(pickupPosition),
                    L.latLng(dropoffPosition),
                ],
                routeWhileDragging: true,
                createMarker: () => null,
                showAlternatives: false,
                lineOptions: {
                    styles: [{ color: '#ff6600', weight: 4 }]
                },
                routeAdded: (e) => {
                    const route = e.route;
                    setRouteInfo({
                        distance: route.summary.totalDistance,
                        time: route.summary.totalTime,
                    });
                }
            }).addTo(map);

            return () => {
                if (map.hasLayer(routeControl)) {
                    map.removeControl(routeControl);
                }
            };
        }
    }, [map, pickupPosition, dropoffPosition]);

    return (
        <div className="route-info-panel">
            <h4>Informasi Rute</h4>
            <p><strong>Jarak:</strong> {routeInfo.distance / 1000} km</p>
            <p><strong>Waktu:</strong> {Math.round(routeInfo.time / 60)} menit</p>
        </div>
    );
};

export default DetailDataSet;
