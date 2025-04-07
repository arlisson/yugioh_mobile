import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import Body from '../../components/Body';
import { useLocalSearchParams } from 'expo-router';
import { excluirCarta } from '../DAO/database'; 
import { router } from 'expo-router';

export default function Editar() {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [colecao, setColecao] = useState('');
  const [precoCompra, setPrecoCompra] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [raridade, setRaridade] = useState('');
  const [qualidade, setQualidade] = useState('');
  const [imagem, setImagem] = useState('');
  const { data } = useLocalSearchParams();
  const [carta,setCarta] = useState(null);

useEffect(() => {
  if (data) {
    const carta = typeof data === 'string' ? JSON.parse(data) : data;
    setCarta(carta);
    setNome(carta.nome || '');
    setCodigo(carta.codigo || '');
    setColecao(carta.colecao || '');
    setPrecoCompra(String(carta.preco_compra || ''));
    setDataCompra(carta.data_compra || '');
    setQuantidade(carta.quantidade || 0);
    setRaridade(carta.raridade || '');
    setQualidade(carta.qualidade || '');
    setImagem(carta.imagem || '');
  }
  console.log('Carta selecionada', data)
  
}, [data]);

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  

const handleExcluir = () => {
  Alert.alert(
    'Confirmar exclusão',
    'Tem certeza que deseja excluir esta carta?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirCarta(carta.id); // `carta.id` deve ser o ID da carta atual
            Alert.alert('Sucesso', 'Carta excluída com sucesso!');
            router.back(); // ou navegar para outra tela se preferir
          } catch (error) {
            console.error('Erro ao excluir carta:', error);
            Alert.alert('Erro', 'Não foi possível excluir a carta.');
          }
        },
      },
    ]
  );
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

    console.log('Carta alterada: ',carta)
  };

  return (
    <View style={{ flex: 1 }}>
      <Cabecalho seta={true} title="Editar Carta" />
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
      <Botao texto="Deletar" onPress={handleExcluir} cor='red' foto='trash-outline'/>
    </View>
  );
}
