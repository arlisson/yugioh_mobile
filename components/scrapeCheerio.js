import cheerio from 'cheerio-without-node-native';
import { Alert } from "react-native";
export default async function scrapeCheerio(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const nome = $('li.active').first().text().trim() || 'N/A';
    const precoRaw = $('span.moeda').first().text().trim() || 'R$ 0,00';

    const precoFloat = parseFloat(
      precoRaw.replace('R$', '').replace(/\s/g, '').replace(',', '.')
    );
    const imagem = $('#produto-img img').last().attr('src');




    const precoFormatado = precoFloat.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // console.log(`🃏 Nome da Carta: ${nome}`);
    // console.log(`💰 Valor atual: ${precoFormatado}`);
    // console.log(`📅 Data: ${dataAtual}`);
    // console.log('Imagem: ',imagem)

    return { nome, precoFormatado, data: dataAtual,imagem };
  } catch (error) {
    console.error('❌ Erro ao fazer scraping:', error.message);
    Alert.alert('Erro','❌ Erro ao Buscar Carta, escolha outro link')
    return null;
  }
}
