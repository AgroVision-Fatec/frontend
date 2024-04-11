import { StyleSheet, Text, View } from 'react-native';
import CameraComponent from './Apps/Components/Camera/CameraComonent';
import InputFileComponent from './Apps/Components/InputFile/InputFileComponent';
export default function App() {
  return (

        <InputFileComponent/>


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
