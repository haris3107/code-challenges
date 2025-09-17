import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import CourtListScreen from './src/screens/CourtListScreen';
import CourtDetailScreen from './src/screens/CourtDetailScreen';
import { TennisCourt } from './src/data/mockData';

export type RootStackParamList = {
  CourtList: undefined;
  CourtDetail: { court: TennisCourt };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CourtList" component={CourtListScreen} />
        <Stack.Screen name="CourtDetail" component={CourtDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
