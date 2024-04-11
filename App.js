import { StyleSheet, Text, View } from 'react-native';
import TabNav from './Apps/Navigations/TabNav';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const MyTheme = {
 ...DefaultTheme,
 colors: {
    ...DefaultTheme.colors,
    background: '#323335', 
 },
};

export default function App() {
 return (
    <NavigationContainer theme={MyTheme}>
      <TabNav />
    </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 },
});
