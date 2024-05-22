import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Agro from '../../assets/Agro.jpeg';
import Agro2 from '../../assets/Agro2.jpeg';
import Agro3 from '../../assets/Agro3.jpeg'
import Agro4 from '../../assets/Agro4.jpg'
import api from '../Services/Axios';
import MapaComponent from './Mapa/MapaComponent';

export default function Fazendas({ idFazenda, title, numArmadilhas, numPragas, setFazendas, fazenda }) {
    const navigation = useNavigation();

    const [editedName, setEditedName] = useState(title);
    const [editedType, setEditedType] = useState('');
    const [editedCoordinates, setEditedCoordinates] = useState('');
    const [fazendaInfo, setFazendaInfo] = useState([]);

    

    useEffect(() => {
        setFazendaInfo(fazenda);
     }, []);


    const abrirFazenda = async() => {
        navigation.navigate('FazendaUnica', { idFazenda, title, numArmadilhas, numPragas, setFazendas, fazenda });
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <TouchableOpacity onPress={() => abrirFazenda()}>
                <View style={styles.BoxFazenda}>
                    <MapaComponent idFazenda={idFazenda}/>

                    <View style={styles.primaryBox}>
                        <Text style={styles.boxText}>{title}</Text>
                        <View style={styles.infoContainer}>
                            <View style={styles.textContainer}>
                                <Text style={dynamicStyle.numberArmadilhas}>12</Text>
                                <Text style={dynamicStyle.subTitleArmadilhas}>armadilhas cadastradas</Text>
                            </View>
                            <View style={styles.textEditDeleteContainer}>
                                <View style={styles.textContainer}>
                                    <Text style={dynamicStyle.numberPragas}>542</Text>
                                    <Text style={dynamicStyle.subTitlePragas}>pragas reconhecidas</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonCancel: {
        backgroundColor: "#F45D16",
        color: "#fff"
    },
    BoxFazenda: {
        width: 390,
        height: 220, 
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
    },
    primaryBox: {
        margin: 0,
        padding: 0,
        gap: 0,
        width: 130,
        flexDirection: 'column',
        alignItems: 'flex-start',
     },
     secondaryBox: {
        flexDirection: 'column',
        alignItems: 'flex-start',
     },
    image: {
        width: 230, 
        height: 200, 
        borderRadius: 10,
        marginRight: 10, 
    },
    boxText: {
        color: '#323335', 
        fontSize: 18,
        fontWeight: 'bold', 
     },
    textContainer: {
        flex: 1, 
        alignItems: 'flex-start',
    },
    textEditDeleteContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323335',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        width: '80%',
        backgroundColor: "#fff"
    },
    containerButton: {
        padding: 0,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        maxHeight: 75,
    },  
    editDeleteButton: {
        flex: 1, 
        // alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 10,
    },
    editDeleteContainer: {
        flex: 1, 
        flexDirection: 'row',
        gap: 10,
        maxWidth: 62,
    },
    newContainer: {
        flex: 1, 
        flexDirection: 'row',
        gap: 10,
        maxWidth: 62,
        minHeight: 22,
    },
    infoContainer: {
        width: 127,
        maxHeight: 170,
        margin: 0,
        padding: 0,
        flex: 1,
        flexDirection: 'column',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#fff",
    },
    modalInfo: {
        fontSize: 18,
        marginBottom: 10,
        color: "#fff",
    },
    editButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
    }, 
    deleteButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalScrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#323335",
        color: "#fff",
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: "#fff",
    },
    textStyle: {
        color: '#fff'
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
});

const dynamicStyle = {
    numberArmadilhas: {
        color: '#8DC63E',
        fontSize: 35,
        fontWeight: 'bold',
     },
     subTitleArmadilhas: {
        color: '#8DC63E',
        fontSize: 14,
        fontWeight: 'bold',
     },
     numberPragas: {
        color: '#C80000',
        fontSize: 35,
        fontWeight: 'bold',
     },
     subTitlePragas: {
        color: '#C80000',
        fontSize: 14,
        fontWeight: 'bold',
     },
};
