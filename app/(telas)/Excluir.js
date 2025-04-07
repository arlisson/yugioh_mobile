import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import { useLocalSearchParams } from 'expo-router';
import { router } from 'expo-router';
import {
  excluirColecao,
  excluirQualidade,
  excluirRaridade
} from '../DAO/database';
import DropdownComponent from '../../components/DropDownComponent';

export default function Excluir() {
  const {
    label = 'Selecionar',
    titulo = 'Excluir',
    colecao = false,
    qualidade = false,
    raridade = false,
    data
  } = useLocalSearchParams();

  const [id, setId] = useState();
  const [selectedValue, setSelectedValue] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);

  // Faz o parse do JSON recebido
  useEffect(() => {
    try {
      if (typeof data === 'string') {
        const parsed = JSON.parse(data);
        setDropdownData(parsed);
      }
    } catch (e) {
      console.error('Erro ao parsear os dados recebidos:', e);
    }
  }, [data]);

  const handleExcluir = async (id) => {
    if (!id) {
      Alert.alert('Aviso', `Selecione um(a) ${label.toLowerCase()} para excluir.`);
      return;
    }

    try {
      if (colecao) {
        await excluirColecao(id);
        router.back();
      } else if (qualidade) {
        await excluirQualidade(id);
        router.back();
      } else if (raridade) {
        await excluirRaridade(id);
        router.back();
      }

      Alert.alert('Sucesso', `${label} removida com sucesso!`);
      setId(null);
      setSelectedValue(null);
    } catch (e) {
      Alert.alert('Erro', `Falha ao excluir ${label}.`);
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Cabecalho seta={true} title={titulo} />

      <View style={styles.content}>
        <DropdownComponent
          data={dropdownData}
          label={label}
          value={selectedValue}
          onChange={(value, label) => {
            setId(value);
            setSelectedValue(value);
            console.log(`${label} selecionado:`, value);
          }}
        />
      </View>

      <View style={styles.footer}>
        <Botao texto="Excluir" onPress={() => handleExcluir(id)} cor='red' />
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
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
