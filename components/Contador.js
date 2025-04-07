import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ContadorQuantidade({ value = 0, onChange }) {
  const alterar = (delta) => {
    const novaQtd = Math.max(0, value + delta); // valor vem da prop
    if (onChange) onChange(novaQtd); // comunica ao pai
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => alterar(-1)}>
        <Text style={styles.botaoTexto}>-</Text>
      </TouchableOpacity>

      <Text style={styles.valor}>Quantidade: {value}</Text>

      <TouchableOpacity style={styles.botao} onPress={() => alterar(1)}>
        <Text style={styles.botaoTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  botao: {
    padding: 10,
  },
  botaoTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
