import { StyleSheet, Text, View } from 'react-native';
import Test1 from './Apps/Screens/Test1';
import TabNav from './Apps/Navigations/TabNav';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  return (
    <View>
      <NavigationContainer>
        <TabNav />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
