import React, { useEffect, useState } from 'react';
import { View, Text,ScrollView,TextInput } from 'react-native';
import { router } from 'expo-router';
import Cabecalho from '../components/Cabecalho';
import stylesGeral from '../assets/styles/stylesGeral';
import HeaderTabela  from '../components/HeaderTabela';
import LinhasTabela from '../components/LinhasTabela';
import Botao from '../components/Botao';
import {createDatabase,deleteDatabase, openDatabase, buscarCartas} from './DAO/database'

export default function Home() {   
    
const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar o que o usuário digita na pesquisa
const [filteredCartas, setFilteredCartas] = useState([]); // Estado para as Cartas filtradas
const [cartas, setCartas] = useState([]);


useEffect(() => {
  (async () => {
    //await deleteDatabase();
    await openDatabase();
   //await createDatabase()
   
   carregarCartas();

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

  router.push('(telas)/Cadastrar')
}

const carregarCartas = async () => {
  const resultado = await buscarCartas();
  setCartas(resultado);
  //console.log(resultado);
};

const handleSelected = (data) => {
  router.push({
    pathname: './(telas)/Editar',
    params: { data: JSON.stringify(data) }, // <- aqui!
  });
};


return (
   
   <View style={{ flex: 1 }}>
    
      <Cabecalho seta={true}/>
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
            onPress={handleSelected}
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