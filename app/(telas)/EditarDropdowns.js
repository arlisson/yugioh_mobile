import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TextInput } from 'react-native';
import Cabecalho from '../../components/Cabecalho';
import Botao from '../../components/Botao';
import { useLocalSearchParams, router } from 'expo-router';

import {
  editarColecao,
  editarQualidade,
  editarRaridade
} from '../DAO/database';
import DropdownComponent from '../../components/DropDownComponent';

export default function EditarDropdowns() {
  const {
    label = 'Selecionar',
    titulo = 'Editar',
    colecao = false,
    qualidade = false,
    raridade = false,
    data,
    placeholder = 'editar'
  } = useLocalSearchParams();

  const [id, setId] = useState();
  const [selectedValue, setSelectedValue] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);
  const [texto, setTexto] = useState('');
  const [codigoColecao, setCodigoColecao] = useState('');

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

  const handleEditar = async () => {
    if (!id || !texto) {
      Alert.alert('Aviso', `Selecione e edite um(a) ${label.toLowerCase()} antes de salvar.`);
      return;
    }

    Alert.alert(
      'Confirmar edição',
      `Deseja realmente editar esta ${label.toLowerCase()}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Editar',
          onPress: async () => {
            try {
              if (colecao) {
                await editarColecao(id, texto, codigoColecao);
              } else if (qualidade) {
                await editarQualidade(id, texto);
              } else if (raridade) {
                await editarRaridade(id, texto);
              }

              Alert.alert('Sucesso', `${label} atualizada com sucesso!`);
              router.back();
            } catch (error) {
              console.error('Erro ao editar:', error);
              Alert.alert('Erro', `Falha ao editar ${label.toLowerCase()}.`);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Cabecalho seta={true} title={titulo} />

      <View style={styles.content}>
      <DropdownComponent
          data={dropdownData}
          label={label}
          value={selectedValue}
          onChange={(value, label, codigo) => {
            setId(value);
            setSelectedValue(value);
            setTexto(label);
            if (colecao) setCodigoColecao(codigo || '');
            console.log(`${label} selecionado. ID: ${value}, Código: ${codigo}`);
          }}
        />
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={texto}
          onChangeText={setTexto}
        />
        {colecao && (
          <TextInput
            style={styles.input}
            placeholder="Código da Coleção"
            value={codigoColecao}
            onChangeText={setCodigoColecao}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Botao texto="Editar" onPress={handleEditar} />
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
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
