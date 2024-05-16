import {requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy} from 'expo-location'
import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function MapaComponent({idFazenda}) {
    const [userLocation, setUserLocation] = useState(null)
    const [layout, setLayout] = useState(null);
    const mapRef = useRef(null);


    async function requestLocationPermission() {
        const {granted} = await requestForegroundPermissionsAsync();
        if(granted) {
            const currentLocation = await getCurrentPositionAsync()
            setUserLocation(currentLocation)
        }
    }

    useEffect(() => {
        requestLocationPermission();
    }, [])

    useEffect(() => {
        if (mapRef.current) {
            watchPositionAsync({
                accuracy: LocationAccuracy.Highest,
                timeInterval: 1000,
                distanceInterval: 1
            }, (response) => {
                setUserLocation(response);
                mapRef.current.animateCamera({
                    center: response.coords
                });
            });
            mapRef.current = mapRef;
        }
    }, []);

    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        if (width > 0 && height > 0) {
            setLayout({ width, height });
        }
    };



    /// consultar coordendas a partir do idFazenda
    const baseLatitude = -23.252397187217248;
    const baseLongitude = -45.88726586466118;
    const variation = 0.0005;
    const areaCoordinates = [
        { latitude: baseLatitude + variation, longitude: baseLongitude + variation },
        { latitude: baseLatitude - variation, longitude: baseLongitude + variation },
        { latitude: baseLatitude - 2*variation, longitude: baseLongitude - 3*variation },
        { latitude: baseLatitude + variation, longitude: baseLongitude - variation },
        { latitude: baseLatitude + 4*variation, longitude: baseLongitude - 4*variation },
        { latitude: baseLatitude + 5*variation, longitude: baseLongitude - 2*variation }
    ];

   return (
        <View style={styles.container} onLayout={onLayout}>
            {layout && userLocation && (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude,
                        }}
                    />
                    <Polygon
                        coordinates={areaCoordinates}
                        fillColor="rgba(0, 200, 0, 0.5)" // dentro
                        strokeColor="rgba(0, 0, 0, 0.5)" // borda
                        strokeWidth={2} // largura borda
                    />
                </MapView>
            )}
        </View>
    );
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItens: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: '100%'
    }
})