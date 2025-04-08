import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BarraStatus from './StatusBar.js';
import { router } from 'expo-router';
import stylesGeral from '@/assets/styles/stylesGeral.js';
import { Ionicons } from '@expo/vector-icons';

const Cabecalho = ({ title = 'Minha Coleção Yu-Gi-Oh!', seta = false, home = false }) => {
  return (
    <View style={styles.header}>
      <BarraStatus />
      <View style={styles.row}>
        {/* Ícone de Voltar */}
        <View style={styles.sideIcon}>
          {seta && (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Título centralizado */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Ícone de Home */}
        <View style={styles.sideIcon}>
          {home && (
            <TouchableOpacity onPress={() => router.push('/')}>
              <Ionicons name="home-outline" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideIcon: {
    width: 40,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Cabecalho;
