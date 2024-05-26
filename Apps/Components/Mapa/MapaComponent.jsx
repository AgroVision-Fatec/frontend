import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import icon_location2 from '../../../assets/icon_location2.png';

const LegendItem = ({ color, text, icon }) => {
  return (
    <View style={styles.legendItem}>
      <Image source={icon} style={{ width: 28, height: 28, tintColor: color }} />
      <Text style={styles.legendText}>{text}</Text>
    </View>
  );
};

const MapaComponent = ({ idFazenda }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [layout, setLayout] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTrap, setSelectedTrap] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  const locationWatcher = useRef(null);


  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentLocation = await getCurrentPositionAsync();
      setUserLocation(currentLocation);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (mapReady) {
      const startWatching = async () => {
        locationWatcher.current = await watchPositionAsync({
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1
        }, (response) => {
          setUserLocation(response);
          if (mapRef.current && typeof mapRef.current.animateCamera === 'function') {
            mapRef.current.animateCamera({
              center: response.coords
            });
          }
        });
      };
      startWatching();
    }

    return () => {
      if (locationWatcher.current && typeof locationWatcher.current.remove === 'function') {
        locationWatcher.current.remove();
      }
    };
  }, [mapReady]);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setLayout({ width, height });
    }
  };

  const openModal = (trap) => {
    setSelectedTrap(trap);
    setModalVisible(true);
  }

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
    { latitude: -23.2532900343274, longitude: -45.887424760575776}
  ];

  const armadilhasCoordenadas = [
    { latitude: -23.253055841583876, longitude: -45.887694077343205},
    { latitude: -23.253262448934326, longitude: -45.887435711485765},
  ];

  return (
    <View style={styles.container} onLayout={onLayout}>
      {layout && userLocation && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}
            onMapReady={() => setMapReady(true)}
          >
            <Marker
              coordinate={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }}
              anchor={{ x: 0.5, y: 0.5 }}
              centerOffset={{ x: 0, y: -50 }}
            >
              <Image 
                source={icon_location2} 
                style={{ width: 80, height: 80 }}
                tintColor={'#5CE1E6'}
              />
            </Marker>

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
              fillColor="#9BCF53"
              strokeColor="rgba(0, 0, 0, 0.5)"
              strokeWidth={1}
            />

            <Polygon
              coordinates={talhoesCoordendas}
              fillColor="#FFF67E"
              strokeColor="rgba(0, 0, 0, 0.5)"
              strokeWidth={1}
            />
          </MapView>
        </View>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.modalScrollViewContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da armadilha</Text>
            {selectedTrap && (
              <MapView
                style={styles.modalMap}
                initialRegion={{
                  latitude: selectedTrap.latitude,
                  longitude: selectedTrap.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: selectedTrap.latitude,
                    longitude: selectedTrap.longitude,
                  }}
                />

                <Polygon
                  coordinates={fazendaCoordenadas}
                  fillColor="#9BCF53"
                  strokeColor="rgba(0, 0, 0, 0.5)"
                  strokeWidth={1}
                />

                <Polygon
                  coordinates={talhoesCoordendas}
                  fillColor="#FFF67E"
                  strokeColor="rgba(0, 0, 0, 0.5)"
                  strokeWidth={1}
                />
              </MapView>
            )}
            <Text style={styles.textStyle}>Última captura: XX/XX/XXXX</Text>
            <Text style={styles.textStyle}>Número de pragas: X</Text>
            <TouchableOpacity style={styles.registerButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.registerButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      <View style={styles.legendContainer}>
        <LegendItem color="#9BCF53" text="Fazendas" icon={require('../../../assets/icon_location2.png')} />
        <LegendItem color="#FFF67E" text="Talhões" icon={require('../../../assets/icon_location2.png')} />
        <LegendItem color="red" text="Armadilhas" icon={require('../../../assets/icon_location2.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    maxHeight: '95%',
  },
  map: {
    flex: 1,
    width: '100%',
    maxHeight: '95%',
  },
  modalScrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#323335",
    color: "#fff",
  },
  modalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#323335',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMap: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  textStyle: {
    color: '#fff'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#fff",
  },
  registerButton: {
    backgroundColor: '#F45D16',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  legendContainer: {
    backgroundColor: '#323335',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    paddingBottom: 20,
  },
  legendText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default MapaComponent;
