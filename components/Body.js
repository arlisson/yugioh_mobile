import React, { useState, useEffect } from 'react';
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
import ContadorQuantidade from './Contador';
import { buscarColecoes,buscarQualidades,buscarRaridades } from '../app/DAO/database';

export default function Body({
  nome, setNome,
  codigo, setCodigo,
  colecao, setColecao,
  precoCompra, setPrecoCompra,
  dataCompra, setDataCompra,
  quantidade, setQuantidade,
  raridade, setRaridade,
  qualidade, setQualidade,
  imagem, setImagem,
 
}) {

  useEffect(() => {
   fetchColecao();
   fetchRaridade();
   fetchQualidade();
  }, []);               
  

  const [dataColecao,setDataColecao] = useState([]);
  const [dataQualidade,setDataQualidade] = useState([]);
  const [dataRaridade,setDataRaridade] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleImagePress = () => {
    setNewImageUrl(imagem);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (newImageUrl && newImageUrl.trim() !== '') {
      setImagem(newImageUrl);
    }
    setModalVisible(false);
  };
  
  const fetchColecao= async () => {
    try {
      const data = await buscarColecoes();
       // 🔹 Armazena todas as modalidades no estado     
      setDataColecao(data);
      //console.log(data);
      
    } catch (error) {
      console.error("Erro ao buscar Coleções:", error);
    }
  };
  const fetchRaridade= async () => {
    try {
      const data = await buscarRaridades();
       // 🔹 Armazena todas as modalidades no estado     
      setDataRaridade(data);
      //console.log(data);
      
    } catch (error) {
      console.error("Erro ao buscar Raridades:", error);
    }
  };
  const fetchQualidade= async () => {
    try {
      const data = await buscarQualidades();
       // 🔹 Armazena todas as modalidades no estado     
      setDataQualidade(data);
      //console.log(data);
      
    } catch (error) {
      console.error("Erro ao buscar Qualidades:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem clicável */}
      <TouchableOpacity onPress={handleImagePress}>
      <Image
        source={
          imagem && imagem.trim() !== ''
            ? { uri: imagem }
            : require('../assets/images/verso.jpg') // ou qualquer imagem local
        }
        style={styles.image}
        resizeMode="center"
      />

      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome da carta"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
      />
      {/*Coleção*/}
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownComponent
            data={dataColecao}
            label="Coleção"
            value={colecao}
            onChange={(value,label) => {
              setColecao(label);
              console.log('Coleção selecionada:', label, 'Id - ',value);
            }}
            
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Adicionar',
              params: {
                placeholder: 'Nome da coleção',
                titulo: 'Adicionar Coleção',
                colecao:true,
                
              },
            })
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        {/* Botão Excluir */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Excluir',
              params: {                
                titulo: 'Excluir Coleção',                
                colecao:true,
                label:'Coleção',
                data: JSON.stringify(dataColecao) // << AQUI
                
               
              },
            })
          }
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Preço de compra unitário"
        keyboardType="numeric"
        value={String(precoCompra)}
        onChangeText={(text) => setPrecoCompra(parseFloat(text) || 0)}
      />

      <TextInput
        style={styles.input}
        placeholder="Data da Compra"
        value={dataCompra}
        onChangeText={setDataCompra}
      />

      <ContadorQuantidade
        value={quantidade || 1}
        onChange={setQuantidade}
      />

      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownComponent
            data={dataRaridade}
            label="Raridade"
            value={raridade}
            onChange={(value,label ) => {
              setRaridade(label);
              console.log('Raridade selecionada:', label, 'Id - ', value);
            }}
            
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Adicionar',
              params: {
                placeholder: 'Digite a Raridade',
                titulo: 'Adicionar Raridade',
                raridade:true
              },
            })
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>

        {/* Botão Excluir */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Excluir',
              params: {                
                titulo: 'Excluir Raridade',                
                raridade:true,
                label:'Raridade',
                data: JSON.stringify(dataRaridade) // << AQUI
                
               
              },
            })
          }
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>

      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
          <DropDownComponent
            data={dataQualidade}
            label="Qualidade"
            value={qualidade}
            onChange={(value, label) => {
              setQualidade(label);
              console.log('Qualidade selecionada:', label, 'Id - ',value);
            }}
            
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Adicionar',
              params: {
                placeholder: 'Digite a Qualidade',
                titulo: 'Adicionar Qualidade',
                qualidade: true
              },
            })
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4A90E2" />
        </TouchableOpacity>
        {/* Botão Excluir */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/Excluir',
              params: {                
                titulo: 'Excluir Qualidade',                
                qualidade:true,
                label:'Qualidade',
                data: JSON.stringify(dataQualidade) // << AQUI
                
               
              },
            })
          }
        >
          <Ionicons name="trash-outline" size={24} color="red" />
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
