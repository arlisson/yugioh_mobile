import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function LinhasTabela({ data, onPress, valorAtual }) {
  const precoAtual = valorAtual?.precoNumber ?? null;
  const precoFormatado = valorAtual?.precoFormatado ?? '...';
  const precoPago = data.preco_compra ?? 0;

  const lucro = precoAtual != null ? precoAtual - precoPago : null;

  return (
    <View style={styles.row}>
      {/* Célula de imagem da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data, "Id")}>
        <Image
          source={{ uri: data.imagem }}
          style={styles.image}
          resizeMode="center"
        />
      </TouchableOpacity>

      {/* Nome da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data, "Nome")}>
        <Text style={styles.textTexto}>{String(data.nome).toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Código da carta */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data, "Código")}>
        <Text style={styles.text}>{String(data.codigo).toUpperCase()}</Text>
      </TouchableOpacity>

      {/* Valor pago */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data, "Valor Pago")}>
        <Text style={styles.text}>R$ {precoPago.toFixed(2)}</Text>
      </TouchableOpacity>

      {/* Valor atual */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data, "Valor Atual")}>
        <Text style={[styles.text, { color: '#4A90E2', fontWeight: 'bold' }]}>
          {precoFormatado}
        </Text>
      </TouchableOpacity>

      {/* Lucro */}
      <TouchableOpacity style={styles.cell} onPress={() => onPress(data, "Lucro")}>
        <Text
          style={[
            styles.text,
            lucro != null
              ? lucro >= 0
                ? { color: "green" }
                : { color: "red" }
              : {}
          ]}
        >
          {lucro != null ? `R$ ${lucro.toFixed(2)}` : "--"}
        </Text>
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
    fontSize: 10,
    textAlign: "center",
  },
  textTexto: {
    fontSize: 8,
    textAlign: "center",
  },
  image: {
    width: 60,
    height: 85,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
});
