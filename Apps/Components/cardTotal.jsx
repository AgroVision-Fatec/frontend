import { View, Text, ScrollView, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


export default function CardTotal({title, number, subTitle, type}) {
    const navigation = useNavigation();
    const cor = type == 'fazenda' ? '#8DC63E' : '#A66B3A';
    const handlePress = () => {
        type == 'fazenda' 
        ? navigation.navigate('CadastroFazenda') 
        : type == 'armadilha'
        ? navigation.navigate('CadastroArmadilha')
        : null
    };
    const dynamicStyle = {
        numberText: {
            color: cor,
            fontSize: 20,
            fontWeight: 'bold',
         },
         subTitleText: {
            color: cor,
            fontSize: 12,
            fontWeight: 'bold',
         },
         button: {
            backgroundColor: cor,
            borderRadius: 50,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
         },
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.boxText}>{title}</Text>
                <View style={styles.primaryBox}>
                    <View style={styles.secondaryBox}>
                        <Text style={dynamicStyle.numberText}>{number}</Text>
                        <Text style={dynamicStyle.subTitleText}>{subTitle}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={handlePress} 
                        style={styles.buttonContainer}
                    >
                        <View style={dynamicStyle.button}>
                            <Ionicons name="add" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
 container: {
    width: 185,
    height: 185,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 10, 
 },
 primaryBox: {
    flex: 1, 
    flexDirection: 'row'
    // justifyContent: 'space-between',
    // alignItems: 'center',
 },
 secondaryBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
 },

 boxText: {
    color: 'black', 
    fontSize: 16,
    fontWeight: 'bold', 
 },
buttonContainer: {
    alignSelf: 'flex-end', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 50,
},


});