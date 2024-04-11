import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import Inicio from '../Screens/Inicio';
import Test3 from '../Screens/Test3';
import Test4 from '../Screens/Test4';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CadastroFazenda from '../Screens/CadastroFazenda';
import CadastroArmadilha from '../Screens/CadastroArmadilha';

const Tab = createBottomTabNavigator();

export default function TabNav() {
 const [selectedTab, setSelectedTab] = useState('home1'); // Estado para controlar a aba selecionada
 const [borderTopWidth, setBorderTopWidth] = useState(1); // Estado para controlar a largura da borda superior

 // Efeito para atualizar a largura da borda superior com base na aba selecionada


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
      <Tab.Screen name='home1' component={Inicio}
        listeners={({ route }) => ({
          tabPress: () => handleTabPress('home1'),
        })}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Início</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon iconName="home" color={color} size={size} focused={focused} borderTopWidth={1} />
          )
        }}
      />
      <Tab.Screen name='home3' component={Test3}
        listeners={({ route }) => ({
          tabPress: () => handleTabPress('home3'),
        })}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Dashboards</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon iconName="trending-up" color={color} size={size} focused={focused} borderTopWidth={1} />
          )
        }}
      />

      <Tab.Screen name='CadastroFazenda' component={CadastroFazenda}
        listeners={({ route }) => ({
          tabPress: () => handleTabPress('CadastroFazenda'),
        })}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen name='CadastroArmadilha' component={CadastroArmadilha}
        listeners={({ route }) => ({
          tabPress: () => handleTabPress('CadastroArmadilha'),
        })}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen name='home4' component={Test4}
        listeners={({ route }) => ({
          tabPress: () => handleTabPress('home4'),
        })}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>Contato</Text>
          ),
          tabBarIcon: ({ color , size, focused }) => (
            <TabIcon iconName="person" color={color} size={size} focused={focused} borderTopWidth={1} />
          )
        }}
      />
    </Tab.Navigator>
 );
}

const TabIcon = ({ iconName, color, size, borderTopWidth }) => (
  <View style={{ alignItems: 'center', paddingTop: borderTopWidth }}>
    <View style={{ display: (iconName === 'CadastroFazenda' || iconName === 'CadastroArmadilha') ? 'none' : 'flex' }}>
      {iconName === 'home' && <FontAwesome name={iconName} size={size} color={color} />}
      {iconName === 'trending-up' && <Ionicons name={iconName} size={size} color={color} />}
      {iconName === 'person' && <Ionicons name={iconName} size={size} color={color} />}
    </View>
  </View>
);

