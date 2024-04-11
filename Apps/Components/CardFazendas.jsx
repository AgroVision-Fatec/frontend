import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Agro from '../Components/Agro.jpeg';
import Agro2 from '../Components/Agro2.jpeg';

export default function Fazendas({title, number, praga}){
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.BoxFazendaImagem}>
                <Image source={Agro} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.boxText}>{title}</Text>
                    <Text style={styles.boxText}>{number}</Text>
                    <Text style={styles.boxText}>{praga}</Text>
                </View>
            </View>
            <View style={styles.BoxFazendaImagem2}>
                <Image source={Agro2} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.boxText}>Titulo da Fazenda 2</Text>
                    <Text style={styles.boxText}>Numero Armadilhas 2</Text>
                    <Text style={styles.boxText}>Pragas localizadas 2</Text>
                </View>
            </View>
        </ScrollView>
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
    BoxFazendaImagem2: {
        width: 370,
        height: 200, 
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
        marginBottom: 60, 
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
});
