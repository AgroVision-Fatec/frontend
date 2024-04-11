import { View, Text, ScrollView, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';


export default function CardTotal({title, number, subTitle, type}) {
    const navigation = useNavigation();
    
    const handlePress = () => {
        type == 'fazenda' 
        ? navigation.navigate('CadastroFazenda')
        : type == 'armadilha'
        ? navigation.navigate('CadastroArmadilha')
        : null
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.boxText}>{title}</Text>
                <View style={styles.primaryBox}>
                    <View style={styles.secondaryBox}>
                        <Text style={styles.numberText}>{number}</Text>
                        <Text style={styles.subTitleText}>{subTitle}</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={handlePress} 
                        style={styles.buttonContainer}
                    >
                        <View style={styles.button}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
 },
 secondaryBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
 },
 numberText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
 },
 subTitleText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
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
},
 button: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
 },

});
