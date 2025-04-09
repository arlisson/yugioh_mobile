import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,TextInput,StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import {createDatabase,deleteDatabase, openDatabase, buscarCartas} from './DAO/database';
import scrapeCheerio from '../components/scrapeCheerio';


export default function Index() {   

  //scrapeCheerio('https://mypcards.com/yugioh/produto/249214/yubel');

return (
   
   <View style={{ flex: 1 }}>
    
      <Cabecalho/>
      
      <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Botao texto="Criar Banco" onPress={() => createDatabase()} />
        <Botao texto="Apagar Banco" cor="red" onPress={() => deleteDatabase()} foto={'trash-outline'}/>
        <Botao texto="Tela Inicial" onPress={() => router.push('./(telas)/Home')} foto={'home-outline'} />
        <Botao texto="Vendas" onPress={() => router.push('./(telas)/HomeVendas')} foto={'cash-outline'} cor='green' />
       
      </View>
    </View>

    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',     // centraliza horizontalmente
    backgroundColor: '#fff',
  },
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
    gap: 12, // espaçamento entre os botões (ou use marginBottom nos botões)
  },
});