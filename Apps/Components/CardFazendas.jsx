import { View, Text, ScrollView, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Agro from '../Components/Agro.jpeg';


export default function Fazendas({title, number, praga}){
    const navigation = useNavigation();

    return (
        <View style={styles.BoxFazendaImagem}>
        <Image source={Agro} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.boxText}>{title} </Text>
          <Text style={styles.boxText}>{number}</Text>
          <Text style={styles.boxText}>{praga}</Text>
        </View>
      </View>
    )

}
const styles = StyleSheet.create({
    BoxFazendaImagem: {
        width: 370,
        height: 200, 
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
     },
     image: {
        width: 170, 
        height: 150, 
        marginRight: 10, 
     },
     textContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        gap: 20,
     },

})