import {StyleSheet} from 'react-native';

const stylesGeral = StyleSheet.create({

    rowContainer: {
        flexDirection: "column",  // 🔹 Agora os itens ficam um abaixo do outro
        alignItems: "flex-start",  // 🔹 Alinha o texto e o dropdown à esquerda (ou "center" para centralizar)
        justifyContent: "flex-start",  // 🔹 Mantém a organização da seção
        width: "100%",  // 🔹 Garante que ocupe toda a largura disponível
        paddingHorizontal: 20,  // 🔹 Espaçamento lateral
        gap: 5,  // 🔹 Pequeno espaço entre o texto e o dropdown
        paddingTop: 10,  // 🔹 Espaçamento superior
    },


}) ;

    
export default stylesGeral;