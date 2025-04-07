import React, { useEffect,useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import { router, useLocalSearchParams } from 'expo-router';
import {inserirColecao,inserirQualidade,inserirRaridade} from '../DAO/database';


export default function Adicionar() {
  const { placeholder = 'Adicionar', titulo = 'Adicionar',colecao=false,qualidade=false,raridade=false,} = useLocalSearchParams();
  const [texto,setTexto] = useState();

  const handleSalvar = (texto) => {
    if(colecao){
     inserirColecao(texto);
     router.back();
    }else if(qualidade){
      inserirQualidade(texto);
      router.back();
    }else if(raridade){
      inserirRaridade (texto);
      router.back();
    }
  };
  
 
  return (
    <View style={styles.container}>
      <Cabecalho seta={true} title={titulo} />

      <View style={styles.content}>
        <TextInput style={styles.input} placeholder={placeholder} onChangeText={setTexto} />
      </View>

      <View style={styles.footer}>
      <Botao texto="Adicionar" onPress={() => handleSalvar(texto)} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center', // centraliza verticalmente se quiser
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
