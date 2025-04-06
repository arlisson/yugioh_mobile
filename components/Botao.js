import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoNovaCarta({ onPress, texto = 'Novo Botão' }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="add-circle-outline" size={20} color="#fff" style={{ marginRight: 6 }} />
      <Text style={styles.text}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    elevation: 3,
    width: '100%', // Agora ocupa toda a largura
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
