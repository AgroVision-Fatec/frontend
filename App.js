import { StyleSheet, Text, View } from 'react-native';
import CameraComponent from './Apps/Components/Camera/CameraComonent';
export default function App() {
  return (
    <CameraComponent/>
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
