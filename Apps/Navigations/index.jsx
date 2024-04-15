import React from 'react';
import Inicio from '../Screens/Inicio';
import TabNav from './main.routes';
import CadastroFazenda from '../Screens/CadastroFazenda';
import { createStackNavigator } from '@react-navigation/stack';
import InputFileComponent from '../Components/InputFile/InputFileComponent';
import CameraComponent from '../Components/Camera/CameraComponent';

export default function AppNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroFazendas" component={InputFileComponent} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroArmadilhas" component={CameraComponent} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}