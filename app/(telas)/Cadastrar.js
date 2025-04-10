import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import Body from '../../components/Body';
import { inserirCarta } from '../DAO/database';
import { useLocalSearchParams } from 'expo-router';

export default function Cadastrar() {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [colecao, setColecao] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [raridade, setRaridade] = useState('');
  const [qualidade, setQualidade] = useState('');
  const [imagem, setImagem] = useState('');
  const [link, setLink] = useState('');
  const {apagar} = useLocalSearchParams();

  const campos = {
    nome: [nome, setNome],
    codigo: [codigo, setCodigo],
    colecao: [colecao, setColecao],
    precoCompra: [precoCompra, setPrecoCompra],
    dataCompra: [dataCompra, setDataCompra],
    quantidade: [quantidade, setQuantidade],
    raridade: [raridade, setRaridade],
    qualidade: [qualidade, setQualidade],
    imagem: [imagem, setImagem],
    link: [link,setLink],
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // 🔄 Carrega os dados persistidos no AsyncStorage
  useEffect(() => {
    (async () => {
      for (const campo in campos) {
        const valor = await AsyncStorage.getItem(`@cadastro_${campo}`);
        if (valor !== null) {
          if (campo === 'quantidade') campos[campo][1](parseInt(valor));
          else campos[campo][1](valor);
        }
      }
    })();

    if(apagar) apagaCampos();


  }, []);

  // 💾 Atualiza AsyncStorage sempre que algum valor muda
  useEffect(() => {    
  
    const persistirCampos = async () => {
      try {
        await AsyncStorage.setItem('@cadastro_nome', nome ?? '');
        await AsyncStorage.setItem('@cadastro_codigo', codigo ?? '');
        await AsyncStorage.setItem('@cadastro_colecao', colecao ?? '');
        await AsyncStorage.setItem('@cadastro_precoCompra', precoCompra?.toString() ?? '');
        await AsyncStorage.setItem('@cadastro_dataCompra', dataCompra ?? '');
        await AsyncStorage.setItem('@cadastro_quantidade', quantidade?.toString() ?? '0');
        await AsyncStorage.setItem('@cadastro_raridade', raridade ?? '');
        await AsyncStorage.setItem('@cadastro_qualidade', qualidade ?? '');
        await AsyncStorage.setItem('@cadastro_imagem', imagem ?? '');
        await AsyncStorage.setItem('@cadastro_link', link ?? '');
      } catch (e) {
        console.error('❌ Erro ao salvar campos no AsyncStorage:', e);
      }
    };
  
    persistirCampos();
  }, [nome, codigo, colecao, precoCompra, dataCompra, quantidade, raridade, qualidade, imagem, link]);
  
const apagaCampos = async()=>{
  for (const campo in campos) {
    campos[campo][1](campo === 'quantidade' ? 0 : '');
    await AsyncStorage.removeItem(`@cadastro_${campo}`);
  }
}
  

  const handleSalvar = () => {
    if (!nome.trim()) return Alert.alert('Erro', 'Preencha o nome da carta.');
    if (!codigo.trim()) return Alert.alert('Erro', 'Preencha o código.');
    if (!colecao) return Alert.alert('Erro', 'Selecione uma coleção.');
    if (!precoCompra || isNaN(precoCompra) || parseFloat(precoCompra) <= 0)
      return Alert.alert('Erro', 'Informe um preço válido (maior que 0).');
    if (!dataCompra.trim()) return Alert.alert('Erro', 'Informe a data da compra.');
    if (!quantidade || quantidade <= 0) return Alert.alert('Erro', 'A quantidade deve ser maior que 0.');
    if (!raridade) return Alert.alert('Erro', 'Selecione uma raridade.');
    if (!qualidade) return Alert.alert('Erro', 'Selecione uma qualidade.');
    //if (!imagem.trim() || !isValidURL(imagem)) return Alert.alert('Erro', 'Informe uma URL de imagem válida.');

    const carta = {
      nome,
      codigo,
      colecao,
      preco_compra: parseFloat(precoCompra) || 0,
      data_compra: dataCompra,
      quantidade,
      raridade,
      qualidade,
      imagem,
      link,
    };
    console.log(carta);

    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja adicionar esta carta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Adicionar',
          onPress: async () => {
            try {
              inserirCarta(carta);
              //Alert.alert('Sucesso', 'Carta inserida com sucesso!');
              // Limpa campos e cache
              apagaCampos();
            } catch (error) {
              console.error('Erro ao inserir Carta:', error);
              Alert.alert('Erro', 'Não foi possível salvar a carta.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Cabecalho seta={true} title="Cadastrar Carta" home={true} />
      <ScrollView>
        <Body
          nome={nome}
          setNome={setNome}
          codigo={codigo}
          setCodigo={setCodigo}
          colecao={colecao}
          setColecao={setColecao}
          precoCompra={precoCompra}
          setPrecoCompra={setPrecoCompra}
          dataCompra={dataCompra}
          setDataCompra={setDataCompra}
          quantidade={quantidade}
          setQuantidade={setQuantidade}
          raridade={raridade}
          setRaridade={setRaridade}
          qualidade={qualidade}
          setQualidade={setQualidade}
          imagem={imagem}
          setImagem={setImagem}
          setLink={setLink}
          link={link}
        />
      </ScrollView>
      <Botao texto="Salvar" onPress={handleSalvar} />
    </View>
  );
}
