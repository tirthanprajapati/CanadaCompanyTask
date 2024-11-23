import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import MainScreen from './src/screens/MainScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <MainScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}