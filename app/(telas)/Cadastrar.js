import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity,ScrollView,TextInput, Image } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import Body from '../../components/Body';

export default function Cadastrar() {   
    

 
return (
   
   <View style={{ flex: 1 }}>
    
      <Cabecalho seta={true} title='Cadastrar Carta'/>
      
       
      <ScrollView>
      <Body/>

      </ScrollView>

      <Botao texto='Salvar'/>

    </View>
);
}

