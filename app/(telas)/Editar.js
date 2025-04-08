import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, useColorScheme } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import Body from '../../components/Body';
import { useLocalSearchParams } from 'expo-router';
import { excluirCarta,
  atualizarCarta,
  inserirVenda,
  buscarVendas,
  atualizarQuantidadeCarta,
  excluirVenda} from '../DAO/database'; 
import { router } from 'expo-router';
import Dialog from 'react-native-dialog';

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
  const { data,venda } = useLocalSearchParams();
  const [carta,setCarta] = useState(null);
  const [mostrarDialogPreco, setMostrarDialogPreco] = useState(false);
  const [mostrarDialogQtd, setMostrarDialogQtd] = useState(false);
  const [precoVenda, setPrecoVenda] = useState('');
  const [quantidadeVendida, setQuantidadeVendida] = useState('');
  const [dataVenda,setDataVenda] = useState('');
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const textoCor = isDark ? 'black' : 'white';
  const placeholderCor = isDark ? '#ccc' : '#999';
  
useEffect(() => {
  console.log('Carta selecionada', data);

  if (data && !venda) {
    //console.log('teste');
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

  if (data && venda) {
   
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
    setPrecoVenda(String(carta.preco_venda||''));
    setDataVenda(carta.data_venda || '');

  }
 
  
  
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

const handleExcluirVenda = () => {
  Alert.alert(
    'Confirmar exclusão',
    'Tem certeza que deseja excluir esta Venda?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirVenda(carta.id); // `carta.id` deve ser o ID da carta atual
            Alert.alert('Sucesso', 'Venda excluída com sucesso!');
            router.back(); // ou navegar para outra tela se preferir
          } catch (error) {
            console.error('Erro ao excluir Visita:', error);
            Alert.alert('Erro', 'Não foi possível excluir a Venda.');
          }
        },
      },
    ]
  );
};


const handleSalvar = async () => {
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

  const cartas = {
    id: carta.id, // ← Certifique-se que está sendo definido corretamente
    nome,
    codigo,
    colecao,
    preco_compra: parseFloat(precoCompra) ||0,
    data_compra: dataCompra,
    quantidade,
    raridade,
    qualidade,
    imagem,
  };

  Alert.alert(
    'Confirmar atualização',
    'Tem certeza que deseja atualizar esta carta?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Atualizar',
        onPress: async () => {
          try {
            await atualizarCarta(cartas);
            //Alert.alert('Sucesso', 'Carta atualizada com sucesso!');
            // router.back(); // se quiser voltar após salvar
          } catch (error) {
            console.error('Erro ao atualizar carta:', error);
            //Alert.alert('Erro', 'Não foi possível atualizar a carta.');
          }
        },
      },
    ],
    { cancelable: false }
  );
};

const handleVender = () => {
  setMostrarDialogPreco(true);
};

const confirmarPreco = () => {
  const preco = parseFloat(precoVenda);
  if (!preco || preco <= 0) {
    Alert.alert('Erro', 'Preço inválido.');
    return;
  }
  setMostrarDialogPreco(false);
  setMostrarDialogQtd(true);
};

const confirmarQtd = () => {
  const qtd = parseInt(quantidadeVendida);

  if (!qtd || qtd <= 0) {
    return Alert.alert('Erro', 'Informe uma quantidade válida maior que zero.');
  }

  // Usar `quantidade` do estado, não `carta.quantidade`
  if (qtd > quantidade) {
    return Alert.alert(
      'Erro',
      `Você está tentando vender ${qtd}, mas só possui ${quantidade} unidades.`
    );
  }

  setMostrarDialogQtd(false);

  const novaQuantidade = quantidade - qtd;
  const preco = parseFloat(precoVenda);

  Alert.alert(
    'Confirmar Venda',
    `Deseja vender ${qtd}x ${carta.nome} por R$ ${preco.toFixed(2)}?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: async () => {
          try {
            const venda = {
              ...carta,
              quantidade: qtd, // quantidade vendida
              data_venda: new Date().toISOString().slice(0, 10),
              preco_venda: preco,
            };

            await inserirVenda(venda);
            await atualizarQuantidadeCarta(carta.id, novaQuantidade);

            // Atualiza os estados locais
            setQuantidade(novaQuantidade);
            setCarta({ ...carta, quantidade: novaQuantidade });

            Alert.alert('Sucesso', 'Venda registrada!');
          } catch (error) {
            console.error('Erro ao registrar venda:', error);
            Alert.alert('Erro', 'Não foi possível registrar a venda.');
          }
        },
      },
    ]
  );
};




  return (
    <View style={{ flex: 1 }}>
      <Cabecalho seta={true} title="Editar Carta" home={true} />
      <ScrollView>
        {venda?
          <Body
          venda={true}
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
          dataVenda={dataVenda}
          setDataVenda={setDataVenda}
          precoVenda={precoVenda}
          setPrecoVenda={setPrecoVenda}
          
        />
        :
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
        
        
        }
        
      </ScrollView>
      <Botao texto="Editar" onPress={handleSalvar} foto='create-outline'/>
      {!venda && (
          <Botao texto="Vender" onPress={handleVender} cor="green" foto="cash-outline" />
        )}


      {/* Diálogo de Preço */}
      <Dialog.Container visible={mostrarDialogPreco}>
        <Dialog.Title style={{ color: 'black' }}>Preço da Venda</Dialog.Title>
        <Dialog.Input
          placeholder="Ex: 5.90"
          keyboardType="decimal-pad"
          value={precoVenda}
          onChangeText={setPrecoVenda}
          style={{ color: 'black' }}
          placeholderTextColor="#999"
        />
        <Dialog.Button label="Cancelar" onPress={() => setMostrarDialogPreco(false)} />
        <Dialog.Button label="Próximo" onPress={confirmarPreco} />
      </Dialog.Container>




      {/* Diálogo de Quantidade */}
      {carta && (
      <Dialog.Container visible={mostrarDialogQtd}>
        <Dialog.Title style={{ color: 'black' }}>Quantidade a Vender</Dialog.Title>
        <Dialog.Description style={{ color: 'black' }}>
          Você tem {quantidade} disponível.
        </Dialog.Description>
        <Dialog.Input
          placeholder="Ex: 2"
          keyboardType="numeric"
          value={quantidadeVendida}
          onChangeText={setQuantidadeVendida}
          style={{ color: 'black' }}
          placeholderTextColor="#999"
        />
        <Dialog.Button label="Cancelar" onPress={() => setMostrarDialogQtd(false)} />
        <Dialog.Button label="Vender" onPress={confirmarQtd} />
      </Dialog.Container>
    
      
      
      )}

      {venda?
      <Botao texto="Deletar" onPress={handleExcluirVenda} cor='red' foto='trash-outline'/>
      :
      <Botao texto="Deletar" onPress={handleExcluir} cor='red' foto='trash-outline'/>
      }
      
    </View>
  );
}
