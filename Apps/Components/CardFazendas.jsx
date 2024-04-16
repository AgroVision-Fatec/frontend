import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Agro from '../../assets/Agro.jpeg';
import Agro2 from '../../assets/Agro2.jpeg';
import api from '../Services/Axios';

export default function Fazendas({ idFazenda, title, numArmadilhas, numPragas, setFazendas, fazenda }) {
    const navigation = useNavigation();

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editedName, setEditedName] = useState(title);
    const [editedType, setEditedType] = useState('');
    const [editedCoordinates, setEditedCoordinates] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [fazendaInfo, setFazendaInfo] = useState([]);

    useEffect(() => {
        setFazendaInfo(fazenda);
     }, []);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const toggleDeleteModal = () => {
        setDeleteModalVisible(!isDeleteModalVisible);
    };

    const toggleEditModal = () => {
        setEditModalVisible(!isEditModalVisible);
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/fazendas/${idFazenda}`);
            setFazendas(prevFazendas => prevFazendas.filter(fazenda => fazenda.id_fazenda !== idFazenda));

            toggleDeleteModal();
        } catch (error) {
            console.error('Erro ao deletar fazenda:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await api.put(`/fazendas/${idFazenda}`, {
                "nome": editedName,
                "tipoCoordenada": editedType,
                "coordenadas": editedCoordinates
            });
            setFazendas(prevFazendas => {
                return prevFazendas.map(fazenda => {
                    if (fazenda.id_fazenda === idFazenda) {
                        return {
                            ...fazenda,
                            nome: editedName,
                        };
                    }
                    return fazenda;
                });
            });
    
            toggleEditModal();
        } catch (error) {
            console.error('Erro ao salvar edições da fazenda:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.BoxFazenda}>
                <Image source={Agro} style={styles.image} />
                <View style={styles.primaryBox}>
                    <Text style={styles.boxText}>{title}</Text>
                    <View style={styles.infoContainer}>
                        {/* <View style={styles.textContainer}>
                            <Text style={dynamicStyle.numberArmadilhas}>{numArmadilhas}</Text>
                            <Text style={dynamicStyle.subTitleArmadilhas}>armadilhas cadastradas</Text>
                        </View> */}
                        <View style={styles.editDeleteButton}>
                            <TouchableOpacity style={styles.editButton} onPress={toggleEditModal}>
                                <Ionicons name="create" size={24} color="#323335" />
                                <Text>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={toggleDeleteModal}>
                                <Ionicons name="trash" size={24} color="#C21111" />
                                <Text>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.closeButton} >Ver mais</Text>
                        </TouchableOpacity>
                        {/* <View style={styles.textEditDeleteContainer}> */}
                            {/* <View style={styles.textContainer}>
                                <Text style={dynamicStyle.numberPragas}>{numPragas}</Text>
                                <Text style={dynamicStyle.subTitlePragas}>pragas reconhecidas</Text>
                            </View> */}
                        {/* </View> */}
                    </View>
                </View>
            </View>

            {/* Modal */}
            <Modal visible={modalVisible} animationType="slide">
                <ScrollView contentContainerStyle={styles.modalScrollViewContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <Text>Número de armadilhas: {numArmadilhas}</Text>
                        <Text>Número de pragas: {numPragas}</Text>
                        <Text>Tipo: {fazendaInfo ? fazendaInfo.tipoCoordenada : 'Carregando...'}</Text>
                        <Text>Coordenadas: {fazendaInfo ? fazendaInfo.coordenadas : 'Carregando...'}</Text>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={styles.closeButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>

            {/* Modal para confirmar exclusão */}
            <Modal visible={isDeleteModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text>Deseja realmente excluir esta fazenda?</Text>
                    <View style={styles.containerButton}>
                        <Button title="Cancelar" onPress={toggleDeleteModal} />
                        <Button title="Excluir" onPress={handleDelete} />
                    </View>
                </View>
            </Modal>

            {/* Modal para edição */}
            <Modal visible={isEditModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <TextInput
                        placeholder="Nome"
                        value={editedName}
                        onChangeText={setEditedName}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Tipo"
                        value={editedType}
                        onChangeText={setEditedType}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Coordenadas"
                        value={editedCoordinates}
                        onChangeText={setEditedCoordinates}
                        style={styles.input}
                    />
                    <View style={styles.containerButton}>
                        <Button title="Cancelar" onPress={toggleEditModal} style={styles.buttonCancel} />
                        <Button title="Salvar" onPress={handleSaveEdit} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        width: '80%',
    },
    containerButton: {
        padding: 0,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        maxHeight: 55,
    },  
    editDeleteButton: {
        flex: 1, 
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: 10,
    },
    infoContainer: {
        width: 130,
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
    },
    modalInfo: {
        fontSize: 18,
        marginBottom: 10,
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
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
