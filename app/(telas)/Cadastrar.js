import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,TextInput, Image } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import Body from '../../components/Body';

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
  
 
   const handleSalvar = () => {
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
     };
 
     console.log("Carta para salvar:", carta);
 
     // Aqui você pode chamar a função inserirCarta(carta)
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
 

