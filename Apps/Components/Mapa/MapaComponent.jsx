import {requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy} from 'expo-location'
import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';


export default function MapaComponent() {
    const [userLocation, setUserLocation] = useState(null)

    const mapRef = useRef(MapView)

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
        watchPositionAsync({
            accuracy: LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setUserLocation(response)
            mapRef.current?.animateCamera({
                center: response.coords
            })
        })
    }, [])

    return (
        <View style={styles.container}>
            
            {
                userLocation  && 
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

                </MapView>
            }
            

            
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItens: 'center',
        justifyContent: 'center',
    },
    map: {

    }
})