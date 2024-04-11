import React, { useState } from 'react';
import { View, Button, ScrollView, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function InputFileComponent() {
  const [selectedFiles, setSelectedFiles] = useState([]);

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

      setSelectedFiles([...selectedFiles, newFile]); // Adiciona o novo arquivo à lista de arquivos selecionados
    } catch (error) {
      console.log("Erro ao selecionar arquivos:", error);
    }
  };

  const formData = new FormData();

  selectedFiles.forEach((file, index) => {
    formData.append(`completeFile${index}`, JSON.stringify(file)); // Adiciona cada arquivo ao FormData com uma chave única
  });

  console.log("FormData:", formData);

  return (
    <View style={styles.container}>
      <View>
         <TouchableOpacity
            onPress={() => console.log("foiii")}
            style={styles.buttonContainer}
         >
            {/* <Image  /> */}
            <Text>Carregar arquivo .geojson</Text>
         </TouchableOpacity>
      </View>
      <ScrollView style={styles.listContainer}>
        {selectedFiles.map((file, index) => (
          <Text key={index} style={styles.itemText}>{file.name}</Text>
        ))}
      </ScrollView>
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
  },
  buttonContainer: {
    width: 350,
    height: 150,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
