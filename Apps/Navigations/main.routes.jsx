import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inicio from '../Screens/Inicio';
import ControleUser from '../Screens/ControleUser';
import Localizacao from '../Screens/Localizacao';
import Dashboard from '../Screens/Dashboard';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Login from '../Screens/Login';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F45D16',
        tabBarInactiveTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#323335',
          position: 'absolute',
          bottom: 0,
          borderTopWidth: 1,
          borderTopColor: '#F45D16',
        },
      }}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>{tab.label}</Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <TabIcon iconName={tab.iconName} color={color} size={size} />
            )
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const tabs = [
  {
    name: 'Inicio',
    component: Inicio,
    label: 'Início',
    iconName: 'home'
  },
  // {
  //   name: 'Localizacao',
  //   component: Localizacao,
  //   label: 'Localizacao',
  //   iconName: 'location-outline'
  // },
  {
    name: 'Dash',
    component: Dashboard,
    label: 'Dashboard',
    iconName: 'trending-up'
  },
  // {
  //   name: 'Perfil',
  //   component: Test4,
  //   label: 'Perfil',
  //   iconName: 'person'
  // },
  {
    name: 'ControllerUser',
    component: ControleUser,
    label: 'Usuários',
    iconName: 'people'
  }
];

const TabIcon = ({ iconName, color, size, borderTopWidth }) => (
  <View style={{ alignItems: 'center', paddingTop: borderTopWidth }}>
    <View style={{ display: (iconName === 'CadastroFazenda' || iconName === 'CadastroArmadilha') ? 'none' : 'flex' }}>
      {iconName === 'home' && <FontAwesome name={iconName} size={size} color={color} />}
      {/* {iconName === 'location-outline' && <Ionicons name={iconName} size={size} color={color} />} */}
      {iconName === 'trending-up' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'person' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'people' && <Ionicons name={iconName} size={size} color={color} />}
    </View>
  </View>
);
