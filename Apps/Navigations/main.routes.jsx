// main.routes.jsx
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import Inicio from '../Screens/Inicio';
import Localizacao from '../Screens/Localizacao';
import Test4 from '../Screens/Test4';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CadastroFazenda from '../Screens/CadastroFazenda';
import CadastroArmadilha from '../Screens/CadastroArmadilha';
import Login from '../Screens/Login';

const Tab = createBottomTabNavigator();

export default function TabNav() {
 const [selectedTab, setSelectedTab] = useState('home1');
 const [borderTopWidth, setBorderTopWidth] = useState(1);

 const isTabVisible = (routeName) => {
  return routeName !== 'CadastroFazenda' && routeName !== 'CadastroArmadilha';
 };

 const handleTabPress = (tabName) => {
   setSelectedTab(tabName);
 };

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
          borderTopWidth: borderTopWidth, 
          borderTopColor: '#F45D16',
        },
      }}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          listeners={({ route }) => ({
            tabPress: () => handleTabPress(tab.name),
          })}
          options={{
            tabBarVisible: isTabVisible(tab.name),
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>{tab.label}</Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon iconName={tab.iconName} color={color} size={size} focused={focused} borderTopWidth={1} />
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
  {
    name: 'Localizacao',
    component: Localizacao,
    label: 'Localizacao',
    iconName: 'location-outline'
  },
  {
    name: 'Dash',
    component: Login,
    label: 'Dashboard',
    iconName: 'trending-up'
  },
  {
    name: 'Perfil',
    component: Test4,
    label: 'Perfil',
    iconName: 'person'
  }
];

const TabIcon = ({ iconName, color, size, borderTopWidth }) => (
  <View style={{ alignItems: 'center', paddingTop: borderTopWidth }}>
    <View style={{ display: (iconName === 'CadastroFazenda' || iconName === 'CadastroArmadilha') ? 'none' : 'flex' }}>
      {iconName === 'home' && <FontAwesome name={iconName} size={size} color={color} />}
      {iconName === 'location-outline' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'trending-up' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'person' && <Ionicons name={iconName} size={size} color={color} />}
    </View>
  </View>
);
