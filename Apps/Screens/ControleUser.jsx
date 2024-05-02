import React, { useState } from 'react';
import { View, Button, ScrollView, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export default function ControleUser() {
  return (
    <View style={styles.container}>
      <Text style={styles.textSubTitle}>Usuários</Text>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.listContainer}>
          <View style={styles.Arquivos}>
            <View style={styles.secondBox}>
              <Ionicons name="person" size={30} color="#8DC63E" style={styles.icon} />
              <Text style={styles.itemText}>Usuario</Text>
              <Ionicons
                name="trash"
                size={30}
                color="#C21111"
                style={styles.icon}
              />
            </View>
            <View style={styles.secondBox}>
              <Ionicons name="person" size={30} color="#8DC63E" style={styles.icon} />
              <Text style={styles.itemText}>Usuario</Text>
              <Ionicons
                name="trash"
                size={30}
                color="#C21111"
                style={styles.icon}
              />
            </View>
            <View style={styles.secondBox}>
              <Ionicons name="person" size={30} color="#8DC63E" style={styles.icon} />
              <Text style={styles.itemText}>Usuario</Text>
              <Ionicons
                name="trash"
                size={30}
                color="#C21111"
                style={styles.icon}
              />
            </View>
            <View style={styles.secondBox}>
              <Ionicons name="person" size={30} color="#8DC63E" style={styles.icon} />
              <Text style={styles.itemText}>Usuario</Text>
              <Ionicons
                name="trash"
                size={30}
                color="#C21111"
                style={styles.icon}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.sendButton}
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
    flexDirection: 'column',
    gap: 10,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  secondBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    gap: 10,
  },

});