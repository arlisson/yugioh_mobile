import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BarraStatus from './StatusBar.js';

const Cabecalho= ({ title = 'Minha Coleção Yu-Gi-Oh!' }) => {
  return (
    <View style={styles.header}>
        <BarraStatus/>
        <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
   
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cabecalho;
