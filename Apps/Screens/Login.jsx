import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import LogoAgro from '../../assets/Logo.png';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation(); // hook de navegação

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.18.117:3000/', { // URL da API de autenticação
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      // Guardar o token de autenticação em AsyncStorage ou em algum estado global
      console.log('Token de autenticação:', data.token);

      // Redirecione o usuário para a próxima tela após o login bem-sucedido
      navigation.navigate('Inicio');
    } catch (error) {
      Alert.alert('Erro', error.message);
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
    height: '100vh',
  },
  image: {
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 50,
    color: '#8DC63E',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
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
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textLogin: {
    color: '#8DC63E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noAcc: {
    flexDirection: 'column', 
    marginTop: 20,
    alignItems: 'center',
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
    textDecorationLine: 'underline',
  }
});
