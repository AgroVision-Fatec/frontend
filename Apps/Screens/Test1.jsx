import { View, Text ,ScrollView ,RefreshControl ,StyleSheet } from 'react-native'

export default function Test1() {
  return (
    <ScrollView>
      <Text styles = {styles.container}> PAGINA1 </Text>
    </ScrollView>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
