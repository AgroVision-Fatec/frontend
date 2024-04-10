import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Inicio from '../Screens/Inicio';
import Test2 from '../Screens/Test2';
import Test3 from '../Screens/Test3';
import Test4 from '../Screens/Test4';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


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
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0
        },
      }}>
      <Tab.Screen name='home1' component={Inicio}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Início</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name='home2' component={Test2}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Cadastros</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name='home3' component={Test3}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Dashboards</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen name='home4' component={Test4}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Contato</Text>
          ),
          tabBarIcon: ({ color , size }) => (
            <Ionicons name="person" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
    
 );
}