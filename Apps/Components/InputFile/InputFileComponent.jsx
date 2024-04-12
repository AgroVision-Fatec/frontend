import React, { useState } from 'react';
import { View, Button, ScrollView, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

export default function InputFileComponent() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigation = useNavigation();

  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      const assets = docRes.assets;

      if (!assets) return;

      const file = assets[0];

      const newFile = {
        name: file.name.split(".")[0],
        uri: file.uri,
        type: file.mimeType,
        size: file.size
      };

      setSelectedFiles([...selectedFiles, newFile]);
    } catch (error) {
      console.log("Erro ao selecionar arquivos:", error);
    }
  };

  const sendFiles = async () => {
    // Lógica para enviar os arquivos para o servidor
    // os arquivos são sempre salvos  no state selectedFiles
    console.log('enviando arquivo');
  };

  const removeFile = async (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);

    const updatedFormData = new FormData();
    updatedFiles.forEach((file, index) => {
      updatedFormData.append(`completeFile${index}`, JSON.stringify(file));
    });

    console.log("Updated FormData:", updatedFormData);
  };

  console.log(selectedFiles)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
            <Ionicons name="arrow-back" size={45} color="#C21111" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Importar Arquivos</Text>
      </View>
      <View style={styles.importar}>
         <TouchableOpacity
            onPress={pickSomething}
            style={styles.buttonContainer}
         >
            <Ionicons name="add-circle-outline" size={45} color="#F45D16" />
            <Text style={styles.InboxText}>Importar arquivo .geojson</Text>
         </TouchableOpacity>
      </View>
      <Text style={styles.textSubTitle}>Arquivos Importados</Text>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.listContainer}>
          {selectedFiles.map((file, index) => (
            <View key={index} style={styles.Arquivos}>
              <View style={styles.secondBox}> 
                <Ionicons name="document" size={30} color="#8DC63E" style={styles.icon} />
                <Text style={styles.itemText}>{file.name}</Text>
              </View>
              <Ionicons 
                name="trash" 
                size={30} 
                color="#C21111" 
                style={styles.icon} 
                onPress={() => removeFile(index)}
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity 
            onPress={sendFiles}
            style={styles.sendButton}
        >
            <View>
                <Text style= {styles.cadButtonText}>Cadastrar</Text>
            </View>
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
    backgroundColor: '#fff',
    marginTop: 50,
    backgroundColor: '#323335',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    paddingBottom: 20,
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
    marginTop: 20,
    marginBottom: 20,
    width: 120,
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
    height: 10,
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
    justifyContent: 'space-between',
   },
   secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
   },
   importar :{
    gap: 100,
   }
});