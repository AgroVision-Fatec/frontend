import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Test1 from '../Screens/Test1';
import Test2 from '../Screens/Test2';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7D32CE',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen name='home1' component={Test1}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Home1</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Text name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen name='home2' component={Test2}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Home2</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={24} color={color} />
          )
        }}
      />


    </Tab.Navigator>
  )
}