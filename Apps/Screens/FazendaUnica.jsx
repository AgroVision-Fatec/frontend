import MapaComponent from "../Components/Mapa/MapaComponent";
import { useRoute } from '@react-navigation/native';
import { Text, View, TouchableOpacity, Modal, ScrollView, TextInput} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { StyleSheet } from "react-native";
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';


export default function FazendaUnica() {
    const navigation = useNavigation();

    const route = useRoute()
    const { idFazenda, title, numArmadilhas, numPragas, setFazendas, fazenda } = route.params;

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [editedName, setEditedName] = useState(title);
    const [editedType, setEditedType] = useState('');
    const [editedCoordinates, setEditedCoordinates] = useState('');
    const [fazendaInfo, setFazendaInfo] = useState([]);

    

    useEffect(() => {
        setFazendaInfo(fazenda);
     }, []);

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

            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        } catch (error) {
            console.error('Erro ao salvar edições da fazenda:', error);
        }
    };

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <Ionicons name="arrow-back" size={45} color="#F45D16" style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.mainTitle}>{title}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.textStyle}>Número de armadilhas: {numArmadilhas}</Text>
                <Text style={styles.textStyle}>Número de pragas: {numPragas}</Text>
            </View>
            <View style={styles.editDeleteButton}>
                <View style={styles.newContainer}>
                    <TouchableOpacity style={styles.addButton} onPress={toggleDeleteModal}>
                        <Ionicons name="add" size={34} color="#323335" />
                        <Text>Talhão</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} onPress={toggleDeleteModal}>
                        <Ionicons name="add" size={34} color="#323335" />
                        <Text>Armadilha</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.editDeleteContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={toggleEditModal}>
                        <Ionicons name="create" size={24} color="#323335" />
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={toggleDeleteModal}>
                        <Ionicons name="trash" size={24} color="#C21111" />
                        <Text>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal para confirmar exclusão */}
            <Modal visible={isDeleteModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Excluir</Text>
                    <Text style={styles.textStyle}>Deseja realmente excluir esta fazenda?</Text>
                    <View style={styles.containerButton}>
                        <TouchableOpacity style={styles.registerButton} onPress={toggleDeleteModal}>
                                <Text style={styles.registerButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={handleDelete}>
                            <Text style={styles.registerButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal para edição */}
            <Modal visible={isEditModalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Editar</Text>
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
                        <TouchableOpacity style={styles.registerButton} onPress={toggleEditModal}>
                            <Text style={styles.registerButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={handleSaveEdit}>
                            <Text style={styles.registerButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#323335',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 40,
    },
    mainTitle: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    editDeleteButton: {
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
    editDeleteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    newContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderRadius: 5,
        gap: 10,
        padding: 10,
        width: '45%',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderRadius: 5,
        gap: 10,
        padding: 10,
        width: '45%',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        gap: 5,
        width: '45%',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#F45D16',
        borderRadius: 5,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323335',
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        width: '80%',
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    registerButton: {
        backgroundColor: '#F45D16',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalScrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#323335",
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 30,
    },
});