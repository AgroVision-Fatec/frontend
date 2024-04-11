import { View, Text, ScrollView, StyleSheet , Image } from 'react-native';
import CardTotal from '../Components/cardTotal';
import Agro from '../Components/Agro.jpeg';
export default function Inicio() {
 return (
    <ScrollView>
      <Text style={styles.textTitle}>Agro Vision</Text>
      <View style={styles.boxContainer}>
         <CardTotal title='Total de Fazendas' number='5' subTitle='campos cadastrados' type='fazenda' />
         <CardTotal title='Total de Armadilhas' number='17' subTitle='fotos cadastradas' type='armadilha' />
      </View>

      <Text style={styles.textSubTitle}>Fazendas Cadastradas</Text>
      <View style={styles.BoxFazendaImagem}>
        <Image source={Agro} style={styles.image} />
        <Text style={styles.boxText}>Descrição da Fazenda</Text>
      </View>
    </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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

 boxContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
 },
 BoxFazenda: {
    width: 185,
    height: 185,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
 },
 BoxArmadilha: {
    width: 185,
    height: 185,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
 },
 boxText: {
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
 },
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
});