import React, { useEffect } from 'react';
import { View,StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Cabecalho from '../components/Cabecalho';
import Botao from '../components/Botao';
import {createDatabase,deleteDatabase, openDatabase, buscarCartas} from './DAO/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Index() {   

  useEffect(() => {
    const limparAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('✅ AsyncStorage limpo com sucesso!');
      } catch (e) {
        console.error('❌ Erro ao limpar AsyncStorage:', e);
      }
    };
  
    limparAsyncStorage();
  }, []);

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