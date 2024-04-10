import { View, Text ,ScrollView ,RefreshControl ,StyleSheet } from 'react-native'

export default function Inicio() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Inicio</Text>
      </View>
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
