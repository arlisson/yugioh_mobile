import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import Body from '../../components/Body';
import { inserirCarta } from '../DAO/database';

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

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSalvar = () => {
    // 🔎 Verificações
    if (!nome.trim()) return Alert.alert('Erro', 'Preencha o nome da carta.');
    if (!codigo.trim()) return Alert.alert('Erro', 'Preencha o código.');
    if (!colecao) return Alert.alert('Erro', 'Selecione uma coleção.');
    if (!precoCompra || isNaN(precoCompra) || parseFloat(precoCompra) <= 0)
      return Alert.alert('Erro', 'Informe um preço válido (maior que 0).');
    if (!dataCompra.trim()) return Alert.alert('Erro', 'Informe a data da compra.');
    if (!quantidade || quantidade <= 0) return Alert.alert('Erro', 'A quantidade deve ser maior que 0.');
    if (!raridade) return Alert.alert('Erro', 'Selecione uma raridade.');
    if (!qualidade) return Alert.alert('Erro', 'Selecione uma qualidade.');
    if (!imagem.trim() || !isValidURL(imagem)) return Alert.alert('Erro', 'Informe uma URL de imagem válida.');

    const carta = {
      nome,
      codigo,
      colecao,
      preco_compra: parseFloat(precoCompra),
      data_compra: dataCompra,
      quantidade,
      raridade,
      qualidade,
      imagem,
    };

    try {
      inserirCarta(carta);
      Alert.alert('Sucesso', 'Carta inserida com sucesso!');
      // Se quiser limpar os campos após salvar:
      // setNome(''); setCodigo(''); ... etc
    } catch (error) {
      console.error('Erro ao inserir Carta:', error);
      Alert.alert('Erro', 'Não foi possível salvar a carta.');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Cabecalho seta={true} title="Cadastrar Carta" />
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
        />
      </ScrollView>
      <Botao texto="Salvar" onPress={handleSalvar} />
    </View>
  );
}
