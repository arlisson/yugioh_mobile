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
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center", // O texto fica centralizado
        position: "relative", // Permite que a seta fique fixa na esquerda
    },

    // Posiciona a seta fixamente à esquerda
    arrowContainer: {
        position: "absolute", // Posiciona a seta fora do fluxo normal
        left: 10, // Mantém um pequeno espaço da borda esquerda
    },
    arrow:{
        justifyContent:"flex-start",       
        color:"#fff",
         
    },
    containerValores: {
        flexDirection: 'row',
        justifyContent: 'space-between', // ou 'space-around' se quiser mais espaço
        flexWrap: 'wrap', // permite quebrar linha em telas menores
        padding: 10,
        gap: 8, // se estiver usando React Native 0.71+
      },
      textoValor: {
        fontSize: 16,
        fontWeight: '500',
        marginRight: 8,
      },
      lucroPositivo: {
        color: 'green',
      },
      lucroNegativo: {
        color: 'red',
      },
      

}) ;

    
export default stylesGeral;