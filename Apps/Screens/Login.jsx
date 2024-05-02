import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import LogoAgro from '../../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';
import api from '../Services/Axios';

export default function Login() {
  const navigation = useNavigation(); // hook de navegação

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { 
        email,
        senha
      });

      console.log(response.data);

      const { token } = response.data;

      if (!token) {
        throw new Error('Falha na autenticação');
      }

      console.log('Token de autenticação:', token);

      // Armazenar o token em AsyncStorage ou em algum estado global, se necessário

      navigation.navigate('Inicio');
    } catch (error) {
      Alert.alert('Erro', 'Usuário ou senha incorretos. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={LogoAgro} style={styles.image} />
      <Text style={styles.textTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      <View style={styles.noAcc}>
        <Text style={styles.textNoAcc}>Não tem uma conta?</Text>
        <TouchableOpacity>
          <Text style={styles.textNoAcc2}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#323335',
    padding: 20,
  },
  image: {
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 30,
    color: '#8DC63E',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#8DC63E',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  loginButton: {
    backgroundColor: '#F45D16',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noAcc: {
    flexDirection: 'column', 
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNoAcc: {
    color: '#A66B3A',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textNoAcc2: {
    color: '#A66B3A',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  }
});
