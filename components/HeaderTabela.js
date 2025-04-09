import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HeaderTabela() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Imagem</Text>
      <Text style={styles.headerText}>Nome</Text>
      <Text style={styles.headerText}>Código</Text> 
      <Text style={styles.headerText}>Valor Pago</Text>   
      <Text style={styles.headerText}>Valor Atual</Text>  
      <Text style={styles.headerText}>Lucro</Text>  
          
      
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // 🔹 Centraliza os textos verticalmente
  },
  headerText: {
    fontSize:12,
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    flexWrap: "wrap", // 🔹 Permite que os textos quebrem linha sem desalinhar os outros
    justifyContent: "center", // 🔹 Mantém alinhado verticalmente
    paddingHorizontal: 5, // 🔹 Evita quebras inesperadas
  },
});
