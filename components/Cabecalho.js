import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import BarraStatus from './StatusBar.js';
import { router } from 'expo-router';
import stylesGeral from '@/assets/styles/stylesGeral.js';
import { Ionicons } from '@expo/vector-icons';

const Cabecalho= ({ title = 'Minha Coleção Yu-Gi-Oh!', seta=false }) => {
  return (
    <View style={styles.header}>
        <BarraStatus/>
        <View style={stylesGeral.headerContainer}>
        {/* Ícone de Voltar */}
        {seta!=false?
        
        <TouchableOpacity style={stylesGeral.arrowContainer} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} style={stylesGeral.arrow} />
        </TouchableOpacity>

        :
       ''
        }
        

        <Text style={styles.title}>{title}</Text>

      </View>
       
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
