import React, { useEffect, useState } from 'react';
import { View, Text,ScrollView,TextInput } from 'react-native';
import { router } from 'expo-router';
import Cabecalho from '../../components/Cabecalho';
import stylesGeral from '../../assets/styles/stylesGeral';
import HeaderTabela  from '../../components/HeaderTabela';
import LinhasTabela from '../../components/LinhasTabela';
import Botao from '../../components/Botao';
import {createDatabase,deleteDatabase, openDatabase, buscarCartas,calcularTotalGasto,calcularTotalVendido,calcularTotais} from '../DAO/database'
import scrapeCheerio from '../../components/scrapeCheerio';

export default function Home() {   
    
const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o que o usuário digita na pesquisa
const [filteredCartas, setFilteredCartas] = useState([]); // Estado para as Cartas filtradas
const [cartas, setCartas] = useState([]);
const [totalGasto,setTotalGasto] = useState(null);
const [totalVendido,setTotalVendido] = useState(null);
const [lucroTotal, setLucroTotal] = useState(null);
const [valoresAtuais, setValoresAtuais] = useState({});


useEffect(() => {
  (async () => {
    //await deleteDatabase();
    await openDatabase();
    //await createDatabase()
    //await calcularTotalGasto();
    //await calcularTotalVendido();
    //console.log(await calcularTotais());
    carregarCartas();
    carregarTotais();
    


  })();
  
}, []);


useEffect(() => {
   const busca = searchQuery.toUpperCase();
 
   if (busca) {
     setFilteredCartas(
       cartas.filter((carta) => {
         const id = String(carta.id).toUpperCase();
         const nome = carta.nome?.toUpperCase() || '';
         const codigo = carta.codigo?.toUpperCase() || '';
 
         return (
           id.includes(busca) ||
           nome.includes(busca) ||
           codigo.includes(busca)
         );
       })
     );
   } else {
     setFilteredCartas(cartas);
   }
 }, [searchQuery,cartas]);

const Cadastrar = () =>{

  router.push('(telas)/Cadastrar');
}

const carregarCartas = async () => {
  const resultado = await buscarCartas();
  setCartas(resultado);
  await carregarValoresAtuais(resultado); // ⬅ adiciona esta linha
  //console.log(resultado);
};

const carregarValoresAtuais = async (cartas) => {
  const resultados = await Promise.all(
    cartas.map(async (carta) => {
      if (!carta.link) {
        return { id: carta.id, valor: null };
      }

      try {
        const resultado = await scrapeCheerio(carta.link,carta.raridade);
        return {
          id: carta.id,
          valor: {
            precoNumber: resultado?.precoMinimoPorRaridade ?? null,
            precoFormatado: resultado?.precoMinimoPorRaridadeFormatado ?? 'R$ 0,00',
          }
        };
      } catch (error) {
        console.warn(`Erro ao buscar preço da carta ${carta.nome}:`, error.message);
        return { id: carta.id, valor: null };
      }
    })
  );

  // transforma em objeto { [id]: valor }
  const valoresObj = resultados.reduce((acc, item) => {
    acc[item.id] = item.valor;
    return acc;
  }, {});

  setValoresAtuais(valoresObj);
  console.log("VALOR ATUAL", item.id, valoresAtuais[item.id]);

};




const handleSelected = (data) => {
  router.push({
    pathname: '(telas)/Editar',
    params: { data: JSON.stringify(data) }, // <- aqui!
  });
  //console.log('Carta clicada:',data);
};

const carregarTotais = async () => {
  try {
    const { totalGasto, totalVendido, lucroTotal } = await calcularTotais();
    setTotalGasto(totalGasto);
    setTotalVendido(totalVendido);
    setLucroTotal(lucroTotal);
  } catch (error) {
    console.error("Erro ao carregar totais:", error);
  }
};


return (
   
   <View style={{ flex: 1 }}>
    
      <Cabecalho seta={true} title='Lista de Cartas'/>
      <View style={stylesGeral.rowContainer}>
          <TextInput
            style={{
              height: 50,
              width: "100%", 
              borderWidth: 1,          
              fontSize: 15,
              borderColor: '#ccc', // Cor da borda
              borderWidth: 1, // Largura da borda
              borderRadius: 5,
              paddingLeft: 10, // Adiciona preenchimento à esquerda
              marginBottom: 10, // Adiciona espaçamento na parte inferior
            }}
            placeholder="Buscar Carta..."
            value={searchQuery}
            onChangeText={setSearchQuery} // Atualiza o estado com o texto digitado
          />
        </View>
        <View style={stylesGeral.containerValores}>
          <Text style={stylesGeral.textoValor}>
            Total Gasto: R$ {totalGasto != null ? totalGasto.toFixed(2) : 'Carregando...'}
          </Text>
          <Text style={stylesGeral.textoValor}>
            Total Vendido: R$ {totalVendido != null ? totalVendido.toFixed(2) : 'Carregando...'}
          </Text>
          <Text
            style={[
              stylesGeral.textoValor,
              lucroTotal > 0
                ? stylesGeral.lucroPositivo
                : stylesGeral.lucroNegativo
            ]}
          >
            Lucro Vendas: R$ {totalVendido != null && totalGasto != null ? lucroTotal.toFixed(2) : 'Carregando...'}
          </Text>
        </View>

        <HeaderTabela/>
      <ScrollView>
      {filteredCartas.length > 0 ? (
          filteredCartas.map((item) => (
            <LinhasTabela key={item.id} 
            data={item}
            onPress={handleSelected}
            valorAtual={valoresAtuais[item.id]}
            />
          ))
        ) : (
          <Text>Carregando...</Text>
        )}


      </ScrollView>
      <Botao texto='Adicionar'
      onPress={Cadastrar}/>

    </View>
);
}