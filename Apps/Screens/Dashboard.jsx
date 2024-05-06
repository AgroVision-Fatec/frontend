import React, { useState, useEffect } from 'react';
import { View, Text ,ScrollView , StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CardTotal from '../Components/cardTotal';
import api from '../Services/Axios';
import { useAuth } from "../Context/authContext";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);
  const [fazendas, setFazendas] = useState([]);
  const { idUser } = useAuth();

  useEffect(() => {
    async function fetchFazendas() {
       try {
          const response = await api.get(`/fazendas/user/${idUser}`);
          console.log(response.data)
          setFazendas(response.data);
          setIsLoading(false);
       } catch (error) {
          console.error('Erro ao buscar fazendas:', error);
          setIsLoading(false);
       }
    }

    fetchFazendas();
 }, []);

  const handleSubmitFazenda = (value) => {
    console.log(value)
  };

  return (
    <ScrollView>
      <Text style={styles.textTitle}>Dashboard</Text>
      <RNPickerSelect
        placeholder={{ label: 'Selecione uma fazenda', value: null }}
        items={fazendas.map(fazenda => ({
          label: fazenda.nome_fazenda,
          value: fazenda.id_fazenda
        }))}
        onValueChange={(value) => handleSubmitFazenda(value)}
        style={pickerSelectStyles}
        value={selectedValue}
      />

      <View style={styles.boxContainer}>
        <CardTotal title='Total de Talhões' number='0' subTitle='campos cadastrados' type='talhoes' />
        <CardTotal title='Total de Armadilhas' number='0' subTitle='fotos cadastradas' type='armadilhaJson' />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textTitle: {
   fontSize: 40,
   color: '#fff',
   textAlign: 'center',
   marginTop: 50,
   marginBottom: 20,
   fontWeight: 'bold',
  },
  boxContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
 },
 });

 const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 300,
    fontSize: 16,
    borderRadius: 15,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F4F4F4',
    alignSelf: 'center',
    borderRadius: 15,
  },
  inputAndroid: {
    width: 300,
    fontSize: 16,
    borderRadius: 15,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#F4F4F4',
    alignSelf: 'center',
    borderRadius: 15,
  },
});