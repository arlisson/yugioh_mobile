import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoNovaCarta({ onPress, texto = 'Novo Botão', icone = true, cor = '#4A90E2', foto='add-circle-outline' }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: cor }]} onPress={onPress}>
      {icone !== false && (
        <Ionicons name={foto} size={20} color="#fff" style={{ marginRight: 6 }} />
      )}
      <Text style={styles.text}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    elevation: 3,
    width: '80%',
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
