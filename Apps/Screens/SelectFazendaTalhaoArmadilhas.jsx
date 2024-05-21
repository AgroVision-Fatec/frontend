import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { useAuth } from "../Context/authContext";
import api from '../Services/Axios';

export default function SelectFazendaTalhaoArmadilhas() {
  const [fazendas, setFazendas] = useState([]);
  const [selectedFazendas, setSelectedFazenda] = useState('')

  const [talhoes, setTalhoes] = useState([])
  const [selectedTalhoes, setSelectedTalhao] = useState()

  const [armadilhas, setArmadilhas] = useState([])
  const [selectedArmadilhas, setSelectedArmadilhas] = useState()

  const [fazendaLoading, setFazendaLoading] = useState(true);
  const [talhoesLoading, setTalhoesLoading] = useState(true)
  const [armadilhasLoading, setArmadilhasLoading] = useState(true)
  const { idUser } = useAuth();

  useEffect(() => {
    const fetchFazendas = async () => {
      try {
        const response = await api.get(`/fazendas/user/${idUser}`);
        setFazendas(response.data);
        setFazendaLoading(false);
      } catch (error) {
        console.error('Erro ao obter fazendas:', error);
        setFazendaLoading(false); 
      }
    };

    fetchFazendas();
  }, []);



  useEffect(() => {
    if (selectedFazendas) {
      const fetchTalhoes = async () => {
        try {
          const response = await api.get(`/talhoes/findByIdFazenda/${selectedFazendas}`);
          console.log('buscando talhao pelo id' + selectedFazendas)
          console.log(response.data)
          if(response.data==""){
            console.log('esse nao tem nada em')
            setTalhoesLoading(true)
            Alert.alert('Aviso', 'Esta Fazenda não possui talhões cadastrados. Selecione uma Fazenda válida!');
          } else {
            setTalhoes(response.data)
            setTalhoesLoading(false)
          }
        } catch (error) {
          console.error('Erro ao obter talhões:', error);
          setTalhoesLoading(false);
        }
      };
      fetchTalhoes();
    }
  }, [selectedFazendas]);



  useEffect(() => {
    if (selectedTalhoes) {
      const fetchArmadilhas = async () => {
        try {
          const response = await api.get(`/armadilhas/findByIdTalhao/${selectedTalhoes}`);
          console.log('buscando armadilha pelo id' + selectedTalhoes)
          console.log(response.data)
          if(response.data==""){
            console.log('esse nao tem nada em')
            setArmadilhasLoading(true)
            Alert.alert('Aviso', 'Este Talhão não possui armadilhas cadastradas. Selecione um Talhão válido!');
          } else {
            setArmadilhas(response.data)
            setArmadilhasLoading(false)
          }
        } catch (error) {
          console.error('Erro ao obter armadilhas:', error);
          setArmadilhasLoading(false);
        }
      };
      fetchArmadilhas();
    }
  }, [selectedTalhoes]);

  return (
    <View style={styles.modalContainer}>
         <ScrollView>
            <Text style={styles.title}>Cadastro de Imagem</Text>
            {fazendaLoading ? (
            <Text style={styles.title}>Carregando</Text>
            ) : (
            <>
                <Text style={styles.title}>Selecione uma fazenda</Text>
                <Picker
                selectedValue={selectedFazendas}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedFazenda(itemValue)
                }>
                <Picker.Item key={0} label="" value="" />
                {fazendas.map(option => (
                    <Picker.Item key={option.id_fazenda} label={option.nome_fazenda} value={option.id_fazenda} />
                ))}
                </Picker>


                {talhoesLoading ? (
                    <></>
                ) : (
                    <>
                    <Text style={styles.title}>Selecione um Talhão</Text>
                        <Picker
                        selectedValue={selectedTalhoes}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedTalhao(itemValue)
                        }>
                        <Picker.Item key={0} label="" value="" />
                        {talhoes.map(option => (
                            <Picker.Item key={option.id_talhao} label={option.nome_talhao} value={option.id_talhao} />
                        ))}
                        </Picker>



                        {armadilhasLoading ? (
                            <></>
                        ): (
                            <>
                            <Text style={styles.title}>Selecione uma Armadilha</Text>
                                <Picker
                                selectedValue={selectedArmadilhas}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedArmadilhas(itemValue)
                                }>
                                <Picker.Item key={0} label="" value="" />
                                {armadilhas.map(option => (
                                    <Picker.Item key={option.id_armadilha} label={option.id_armadilha} value={option.id_armadilha} />
                                ))}
                                </Picker>
                            </>
                        )}
                    </>
                )}
            </>
            )}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323335',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  select: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    backgroundColor: "#fff",
    color: '#000', // Cor do texto selecionado
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    maxHeight: 75,
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
