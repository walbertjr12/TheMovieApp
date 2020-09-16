import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  console.log('Te Amo');
  return (
    <PaperProvider>
      <SafeAreaView>
        <Text>Hola</Text>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
