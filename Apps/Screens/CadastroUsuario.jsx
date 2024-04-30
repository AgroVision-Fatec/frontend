import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../Services/Axios';

export default function CadastroUsuario() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    try {
      await api.post('/users', {
        "nome": nome,
        "telefone": numero,
        "email": email,
        "password": senha
      });

      navigation.navigate('Inicio');
    } catch (error) {
      Alert.alert('Erro', error.message);
    };
  };

  return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>Novo Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          textContentType='telephoneNumber'
          value={numero}
          onChangeText={setNumero}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          textContentType='emailAddress'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          textContentType='password'
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#323335',
    height: '100vh',
    gap: 10,
  },
  textTitle: {
    fontSize: 45,
    color: '#8DC63E',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#8DC63E',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
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