import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function LinhasTabela({ data, onPress }) {
  return (
    <View style={styles.row}>
      {/* Célula de imagem da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data.id, data.descricao, "Tipo")}>
        <Image
          source={{ uri: data.imagem }}
          style={styles.image}
          resizeMode="center"
        />
      </TouchableOpacity>

      {/* Nome da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data.id, data.descricao, "Produtor")}>
        <Text style={styles.text}>{String(data.nome).toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Código da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data.id, data.descricao, "Propriedade")}>
        <Text style={styles.text}>{String(data.codigo).toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 12,
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 85,
    borderRadius: 4,
    backgroundColor: "#eee", // fallback caso a imagem demore a carregar
  },
});
