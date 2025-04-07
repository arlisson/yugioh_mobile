import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,TextInput } from 'react-native';
import { router } from 'expo-router';
import Cabecalho from '../components/Cabecalho';
import stylesGeral from '../assets/styles/stylesGeral';
import HeaderTabela  from '../components/HeaderTabela';
import LinhasTabela from '../components/LinhasTabela';
import Botao from '../components/Botao';
import {createDatabase,deleteDatabase, openDatabase, buscarCartas} from './DAO/database'

const cartas = [
   {
     id: 1,
     foto: 'dragao_chamas_azuis.jpg',
     nome: 'Dragão das Chamas Azuis',
     codigo: 'DCB-001',
   },
   {
     id: 2,
     foto: 'feiticeira_crepuscular.jpg',
     nome: 'Feiticeira do Crepúsculo',
     codigo: 'FCZ-102',
   },
   {
     id: 3,
     foto: 'golem_gema_eterna.jpg',
     nome: 'Golem da Gema Eterna',
     codigo: 'GGE-205',
   },
   {
     id: 4,
     foto: 'samurai_das_sombras.jpg',
     nome: 'Samurai das Sombras',
     codigo: 'SDS-076',
   },
   {
     id: 5,
     foto: 'rei_tempestade.jpg',
     nome: 'Rei da Tempestade',
     codigo: 'RTM-403',
   },
   {
     id: 6,
     foto: 'arcanjo_juizo_final.jpg',
     nome: 'Arcanjo do Juízo Final',
     codigo: 'AJF-999',
   },
   {
     id: 7,
     foto: 'elemental_raio.jpg',
     nome: 'Elemental do Raio',
     codigo: 'ELR-312',
   },
   {
     id: 8,
     foto: 'mecanodraco_x9.jpg',
     nome: 'Mecanodraco X9',
     codigo: 'MDX-854',
   },
   {
     id: 9,
     foto: 'serpente_abissal.jpg',
     nome: 'Serpente Abissal',
     codigo: 'SAB-623',
   },
   {
     id: 10,
     foto: 'guardiao_oraculo.jpg',
     nome: 'Guardião do Oráculo',
     codigo: 'GOC-777',
   },
 ];
export default function Home() {   
    
const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o que o usuário digita na pesquisa
const [filteredCartas, setFilteredCartas] = useState([]); // Estado para as Cartas filtradas
const [cartas, setCartas] = useState([]);
const db = openDatabase();

useEffect(() => {
  (async () => {
   //await createDatabase()
   

  })();

  
}, []);

useEffect(() => {
  const carregarCartas = async () => {
    const resultado = await buscarCartas();
    setCartas(resultado);
  };

  carregarCartas();
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
 }, [searchQuery]);

const Cadastrar = () =>{

  router.push('(telas)/Cadastrar')
}
 
return (
   
   <View style={{ flex: 1 }}>
    
      <Cabecalho/>
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
        <HeaderTabela/>
      <ScrollView>
      {filteredCartas.length > 0 ? (
          filteredCartas.map((item) => (
            <LinhasTabela key={item.id} 
            data={item} 
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