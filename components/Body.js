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
import { buscarColecoes,buscarQualidades,buscarRaridades, inserirColecao } from '../app/DAO/database';
import scrapeCheerio from '../components/scrapeCheerio';

import CampoCalendario from './Calendario';



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
  dataVenda, setDataVenda,
  precoVenda, setPrecoVenda,
  link, setLink,
  venda=false
 
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
  const [mostrarCalendarioCompra, setMostrarCalendarioCompra] = useState(false);
  const [mostrarCalendarioVenda, setMostrarCalendarioVenda] = useState(false);
  const [info, setInfo] = useState(null);

  const handleImagePress = () => {
    setNewImageUrl(imagem);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (newImageUrl && newImageUrl.trim() !== '') {
      try {
        const dados = await scrapeCheerio(newImageUrl);

        if (dados) {
          if (dados.nome) setNome(dados.nome);
          //if (dados.precoFormatado) setPrecoCompra(dados.precoFormatado.replace('R$', '').trim());
          if (dados.imagem) setImagem(dados.imagem);
          //if (dados.data) setDataCompra(dados.data);
          if (dados.colecao) await inserirColecao(dados.colecao,dados.codigoLimpo)
          fetchColecao();
          setColecao(dados.colecao);
          setCodigo(dados.codigoLimpo);
          setLink(newImageUrl);
        } else {
          alert('Não foi possível obter as informações da carta.');
        }
      } catch (error) {
        console.error("Erro ao buscar dados com scrapeCheerio:", error);
        alert("Erro ao buscar dados da carta.");
      }
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

  

  // Função que recebe uma label e retorna o value correspondente do array de dados
  const getValueByLabel = (label, dataArray) => {
    const found = dataArray.find((item) => item.label === label);
    return found ? found.value : null;
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
        resizeMode="cover"
      />


      </TouchableOpacity>
      {!venda ?
        <Text>Valor total: R$ {(parseFloat(precoCompra || 0) * (quantidade || 0)).toFixed(2)}</Text>
      :
        <Text>Valor total: R$ {(parseFloat(precoVenda || 0) * (quantidade || 0)).toFixed(2)}</Text>
      }

        <View style={styles.viewTitulos}>
          <Text style={styles.titulos}>Link da MYP:</Text>
        </View>

        <View style={styles.linkRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Link da MYP"
            value={link}
            onChangeText={(text) => {
              setNewImageUrl(text);
              setLink(text);
            }}
            
          />
          <TouchableOpacity style={styles.botaoBuscar} onPress={handleConfirm}>
            <Text style={styles.textoBotaoBuscar}>Buscar</Text>
          </TouchableOpacity>
        </View>

      
    
      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Nome:</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Nome da carta"
        value={nome}
        onChangeText={setNome}
      />

      {/*Coleção*/}
      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Coleção:</Text>
      </View>
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
        <DropDownComponent
          data={dataColecao}
          label="Coleção"
          value={getValueByLabel(colecao, dataColecao)} // <- transforma a label recebida em value
          onChange={(value, label,codigo) => {
            setColecao(label); // você mantém a label no estado externo
            setCodigo(codigo);
            console.log('Coleção selecionada:', label, 'Id - ', value, 'Codigo: ',codigo);
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

        {/* Botão Excluir Coleção*/}
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

        {/* Botão editar Coleção */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/EditarDropdowns',
              params: {                
                titulo: 'Editar Coleção',                
                colecao:true,
                label:'Editar Coleção',
                placeholder:'Nome da coleção',
                data: JSON.stringify(dataColecao) // << AQUI
                
               
              },
            })
          }
        >
          <Ionicons name="create-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Código:</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
      />

      

      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Preço Compra (unitário):</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Preço de compra unitário"
        keyboardType="numeric"
        value={precoCompra}
        onChangeText={setPrecoCompra}
      />

      {/*Calendário*/}

      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Data da Compra:</Text>
      </View>

      <View style={{ width: '100%' }}>
            {/* Área que parece um TextInput */}
            <TouchableOpacity
              onPress={() => setMostrarCalendarioCompra(!mostrarCalendarioCompra)}
              style={styles.fakeInput}
            >
              <Text style={dataCompra ? styles.inputText : styles.placeholder}>
                {dataCompra ? dataCompra : 'Data da Compra'}
              </Text>
            </TouchableOpacity>

            {mostrarCalendarioCompra && (
              <CampoCalendario
              titulo={'Data da Compra'}
                dataSelecionada={dataCompra}
                setDataSelecionada={(data) => {
                  setDataCompra(data);
                  setMostrarCalendarioCompra(false);
                }}
              />
            )}

          </View>
      
      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Quantidade:</Text>
      </View>
      <ContadorQuantidade
        value={quantidade || 0}
        onChange={setQuantidade}
      />
      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Raridade:</Text>
      </View>
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
        <DropDownComponent
          data={dataRaridade}
          label="Raridade"
          value={getValueByLabel(raridade, dataRaridade)}
          onChange={(value, label) => {
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

        {/* Botão Excluir Raridade*/}
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
        {/* Botão editar Raridade */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/EditarDropdowns',
              params: {                
                titulo: 'Editar Raridade',                
                raridade:true,
                label:'Raridade',
                placeholder:'Nome da Raridade',
                data: JSON.stringify(dataRaridade) // << AQUI
                
               
              },
            })
          }
        >
          <Ionicons name="create-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.viewTitulos}>
      <Text style={styles.titulos}>Qualidade:</Text>
      </View>
      <View style={styles.dropdownRow}>
        <View style={styles.dropdownWrapper}>
        <DropDownComponent
          data={dataQualidade}
          label="Qualidade"
          value={getValueByLabel(qualidade, dataQualidade)}
          onChange={(value, label) => {
            setQualidade(label);
            console.log('Qualidade selecionada:', label, 'Id - ', value);
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
        {/* Botão Excluir Qualidade*/}
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

        {/* Botão editar Qualidade */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: '(telas)/EditarDropdowns',
              params: {                
                titulo: 'Editar Qualidade',                
                qualidade:true,
                label:'Qualidade',
                placeholder:'Nome da Qualidade',
                data: JSON.stringify(dataQualidade) // << AQUI
                
               
              },
            })
          }
        >
          <Ionicons name="create-outline" size={24} color="green" />
        </TouchableOpacity>

          
          
      </View>
        {venda?
        <>
          <View style={styles.viewTitulos}>
          <Text style={styles.titulos}>Valor da Venda:</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="Preço da venda"
            value={precoVenda}
            onChangeText={setPrecoVenda}
          />
          {/*Calendário*/}

          <View style={styles.viewTitulos}>
          <Text style={styles.titulos}>Data da Venda:</Text>
          </View>

          <View style={{ width: '100%' }}>
                {/* Área que parece um TextInput */}
                <TouchableOpacity
                    onPress={() => setMostrarCalendarioVenda(!mostrarCalendarioVenda)}
                    style={styles.fakeInput}
                  >
                    <Text style={dataVenda ? styles.inputText : styles.placeholder}>
                      {dataVenda ? dataVenda : 'Data da Venda'}
                    </Text>
                  </TouchableOpacity>

                  {mostrarCalendarioVenda && (
                    <CampoCalendario
                      titulo={'Data da Venda'}
                      dataSelecionada={dataVenda}
                      setDataSelecionada={(data) => {
                        setDataVenda(data);
                        setMostrarCalendarioVenda(false);
                      }}
                    />
                  )}

              </View>
          </>
          :''      
      
      }
      

      {/* Modal para editar imagem */}
      {/* <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
              URL pagina da MYP
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
      </Modal> */}
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
  fakeInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  inputText: {
    fontSize: 14,
    color: '#000',
  },
  placeholder: {
    fontSize: 14,
    color: '#888',
  },
  titulos:{   
    fontSize:19
  },
  viewTitulos:{
    alignSelf:'flex-start'
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  
  botaoBuscar: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  
  textoBotaoBuscar: {
    color: 'white',
    fontWeight: 'bold',
  },
  
});
