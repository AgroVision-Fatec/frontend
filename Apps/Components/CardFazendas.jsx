import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import Agro from '../../assets/Agro.jpeg';
import Agro2 from '../../assets/Agro2.jpeg';

export default function Fazendas({title, numArmadilhas, numPragas}){
    const navigation = useNavigation();

    const dynamicStyle = {
        numberArmadilhas: {
            color: '#8DC63E',
            fontSize: 35,
            fontWeight: 'bold',
         },
         subTitleArmadilhas: {
            color: '#8DC63E',
            fontSize: 14,
            fontWeight: 'bold',
         },
         numberPragas: {
            color: '#C80000',
            fontSize: 35,
            fontWeight: 'bold',
         },
         subTitlePragas: {
            color: '#C80000',
            fontSize: 14,
            fontWeight: 'bold',
         },
    };
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.BoxFazenda}>
                <Image source={Agro} style={styles.image} />
                <View style={styles.primaryBox}>
                    <Text style={styles.boxText}>{title}</Text>
                    <View style={styles.textContainer}>
                        <Text style={dynamicStyle.numberArmadilhas}>{numArmadilhas}</Text>
                        <Text style={dynamicStyle.subTitleArmadilhas}>
                            armadilhas cadastradas
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={dynamicStyle.numberPragas}>{numPragas}</Text>
                        <Text style={dynamicStyle.subTitlePragas}>
                            pragas reconhecidas
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    BoxFazenda: {
        width: 370,
        height: 230, 
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10,
    },
    primaryBox: {
        margin: 0,
        padding: 0,
        gap: 0,
        width: 130,
        flexDirection: 'column',
        alignItems: 'flex-start',
     },
     secondaryBox: {
        flexDirection: 'column',
        alignItems: 'flex-start',
     },
    image: {
        width: 230, 
        height: 200, 
        borderRadius: 10,
        marginRight: 10, 
    },
    boxText: {
        color: '#323335', 
        fontSize: 18,
        fontWeight: 'bold', 
     },
    textContainer: {
        flex: 1, 
        alignItems: 'flex-start',
    },
});
