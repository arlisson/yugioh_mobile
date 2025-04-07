import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import { useLocalSearchParams } from 'expo-router';

export default function Adicionar() {
  const { placeholder = 'Adicionar', titulo = 'Adicionar' } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Cabecalho seta={true} title={titulo} />

      <View style={styles.content}>
        <TextInput style={styles.input} placeholder={placeholder} />
      </View>

      <View style={styles.footer}>
        <Botao texto="Adicionar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center', // centraliza verticalmente se quiser
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
