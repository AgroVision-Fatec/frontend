import React, { useState , useEffect} from 'react';
import { View, Button, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../Services/Axios';

export default function ControleUser() {
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    async function fetchUsers() {
       try {
          const response = await api.get(`/users`);
          setUsers(response.data);
          setIsLoading(false);
       } catch (error) {
          console.log('Erro ao buscar fazendas:', error);
          setIsLoading(false);
       }
    }
    fetchUsers();
 }, 
 []);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.log('Erro ao deletar usuário:', error);
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.textSubTitle}>Usuários</Text>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.listContainer}>
          {users.map((user, index) => (
          <View style={styles.Arquivos} key={index}>
            <View style={styles.secondBox}>
              <Ionicons name="person" size={30} color="#8DC63E" style={styles.icon} />
              <Text style={styles.itemText}>{user.nome}</Text>
            </View>
            <Ionicons
                name="trash"
                size={30}
                color="#C21111"
                style={styles.icon}
                onPress={() => handleDelete(user.id_usuario)}
              />
          </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => navigation.navigate("CadastroUsuario")}
        >
          <View>
            <Text style={styles.cadButtonText}>Novo Usuario</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 50,
    backgroundColor: '#323335',
  },
  mainTitle: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  scrollContainer: {
    height: 10,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerText: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sendButton: {
    marginTop: 10,
    marginBottom: 70,
    width: 150,
    height: 50,
    backgroundColor: '#F45D16',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  buttonContainer: {
    width: 350,
    height: 130,
    backgroundColor: '#E2C0B0',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F45D16',
    borderStyle: 'dashed',
    gap: 13,
  },
  cadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    height: 15,
    width: 350,
    paddingHorizontal: 20,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
  },
  InboxText: {
    fontSize: 20,
    color: '#F45D16',
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  textSubTitle: {
    fontSize: 25,
    color: '#fff',
    margin: 10,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  Arquivos: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

});