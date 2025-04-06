import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function LinhasTabela({ data, onPress }) {
  return (
    <View style={styles.row}>
      {/* Célula de imagem da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data.id, data.foto, "Tipo")}>
        <Image
          source={{ uri: "https://a-static.mlcdn.com.br/1500x1500/cartao-yu-gi-oh-dragao-branco-de-olhos-azuis-ultra-raro/nocnoceua/aub01l9zv3d2/9179ae13046b5bf587fb5544bc5e4a90.jpeg" }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>

      {/* Nome da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data.id, data.nome, "Produtor")}>
        <Text style={styles.text}>{String(data.nome).toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Código da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data.id, data.codigo, "Propriedade")}>
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
    fontSize: 9,
    textAlign: "center",
  },
  image: {
    width: 40,
    height: 60,
    borderRadius: 4,
    backgroundColor: "#eee", // fallback caso a imagem demore a carregar
  },
});
