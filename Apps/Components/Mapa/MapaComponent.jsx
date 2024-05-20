import {requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy} from 'expo-location'
import { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { Text } from 'react-native';
import { Button } from 'react-native';


export default function MapaComponent({idFazenda}) {
    const [userLocation, setUserLocation] = useState(null)
    const [layout, setLayout] = useState(null);

    const[modalVisible, setModalVisible] = useState(false)
    const[selectedTrap, setSelectedTrap] = useState(null)

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

    const openModal = (trap) => {
        setSelectedTrap(trap)
        setModalVisible(true)
    }


    /// consultar coordendas a partir do idFazenda
    const baseLatitude = -23.252878437203105;
    const baseLongitude = -45.887229091425475;
    const variation = 0.0005;
    const fazendaCoordenadas = [
        { latitude: baseLatitude + variation, longitude: baseLongitude + variation },
        { latitude: baseLatitude - variation, longitude: baseLongitude + variation },
        { latitude: baseLatitude - variation, longitude: baseLongitude - variation },
        { latitude: baseLatitude + variation, longitude: baseLongitude - variation }
    ];


    const talhoesCoordendas = [
        { latitude: -23.25301760849988, longitude: -45.88675673797255 },
        { latitude: -23.25283289833868, longitude: -45.887701248827646 },
        { latitude: -23.25320593977841, longitude: -45.887677066665425 },
        { latitude: -23.2532900343274, longitude:  -45.887424760575776}
    ];

    const armadilhasCoordenadas = [
        { latitude: -23.253055841583876, longitude: -45.887694077343205},
        { latitude: -23.253262448934326, longitude: -45.887435711485765},
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
                        pinColor='#239fd3'
                    />

                    

                    {armadilhasCoordenadas.map((coordenada, index) => (
                        <Marker
                            key={index} 
                            coordinate={{
                                latitude: coordenada.latitude,
                                longitude: coordenada.longitude,
                            }}
                            onPress={() => openModal(coordenada)}
                        />
                    ))}






                    <Polygon
                        coordinates={fazendaCoordenadas}
                        fillColor="rgba(0, 100, 0, 0.5)" // dentro
                        strokeColor="rgba(0, 0, 0, 0.5)" // borda
                        strokeWidth={2} // largura borda
                    />

                    <Polygon
                        coordinates={talhoesCoordendas}
                        fillColor="rgba(255, 255, 0, 1)" // dentro
                        strokeColor="rgba(0, 0, 0, 0.5)" // borda
                        strokeWidth={2} // largura borda
                    />
                </MapView>
            )}


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Detalhes da Armadilha:</Text>
                        {selectedTrap && (
                            <Text>Latitude: {selectedTrap.latitude}, Longitude: {selectedTrap.longitude}</Text>
                        )}
                        <Button title="Fechar" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>

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