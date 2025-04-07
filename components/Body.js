import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Button,
} from 'react-native';
import { router } from 'expo-router';
import DropDownComponent from './DropDownComponent';
import { Ionicons } from '@expo/vector-icons';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export default function Body() {
  const [imageUrl, setImageUrl] = useState(
    'https://i.pinimg.com/736x/71/1e/da/711eda25308c65a7756751088866e181.jpg'
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleImagePress = () => {
    setNewImageUrl(imageUrl);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setImageUrl(newImageUrl);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Imagem clicável */}
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="center"
        />
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Nome da carta" />
      <TextInput style={styles.input} placeholder="Código" />

      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownComponent data={data} label="Coleção" />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Adicionar',
              params: {
                placeholder: 'Nome da coleção',
                titulo: 'Adicionar Coleção',
              },
            })
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Preço de compra unitário" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Data da Compra" />
      <TextInput style={styles.input} placeholder="Quantidade" keyboardType="numeric" />

      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownComponent data={data} label="Raridade" />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Adicionar',
              params: {
                placeholder: 'Digite a Raridade',
                titulo: 'Adicionar Raridade',
              },
            })
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownComponent data={data} label="Qualidade" />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Adicionar',
              params: {
                placeholder: 'Digite a Qualidade',
                titulo: 'Adicionar Qualidade',
              },
            })
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      {/* Modal para editar imagem */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              URL da nova imagem
            </Text>
            <TextInput
              style={styles.input}
              value={newImageUrl}
              onChangeText={setNewImageUrl}
              placeholder="Cole o link da imagem"
            />
            <Button title="Confirmar" onPress={handleConfirm} />
            <Button title="Cancelar" color="gray" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 175,
    height: 255,
    marginBottom: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  dropdownWrapper: {
    flex: 1,
  },
  addButton: {
    marginLeft: 8,
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
});
