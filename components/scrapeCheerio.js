import cheerio from 'cheerio-without-node-native';
import { Alert } from "react-native";
import { convertToObject } from 'typescript';

export default async function scrapeCheerio(url, raridadeAlvo = "Common", alerta=true) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Nome da carta
    const nome = $('li.active').first().text().trim() || 'Sem Nome';

    // Preço bruto geral da página
    const precoRaw = $('span.moeda').first().text().trim() || 'R$ 0,00';

    //buscar se a tabela de preços existe
    const vazio = $('div.empty').first().text().trim() || null;

    // Conversão para número
    const precoNumber = parseFloat(
      precoRaw.replace('R$', '').replace(/\s/g, '').replace(',', '.')
    );

    // Formatação bonita
    const precoFormatado = precoNumber.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const colecao = $('#produto-codigo [title]').attr('title')?.trim() || 'Sem código';
    // Código da carta via texto do label "Código"
    let codigoTexto = null;
    let codigoCarta = null;
    $('#produto-codigo label').each((_, label) => {
      const texto = $(label).text().trim();
      if (texto.includes("Código")) {
        const parent = $(label).parent();
        // Busca o texto relevante após o label (ex: em um <span> ou texto direto)
        const valor = parent.text().replace("Código", "").trim();
        if (valor) {
          codigoTexto = valor 
          codigoCarta = codigoTexto.split('_')[1]
        }
      }
    });

    

    // 🔍 Código limpo (ex: "ra03-en")
    let codigoLimpo = null;

    if (codigoTexto && codigoTexto.includes("_")) {
      const match = codigoTexto.match(/_([a-zA-Z0-9\-]+)/); // captura tudo após "_"

      if (match) {
        const base = match[1]; // ex: "phni-en038" ou "bpt-007"

        // Agora remove os dígitos finais, se houverem
        const cleanMatch = base.match(/^([a-zA-Z0-9]+-[a-zA-Z]+)|^([a-zA-Z0-9]+-)/);

        if (cleanMatch) {
          codigoLimpo = cleanMatch[1] || cleanMatch[2];
        }
      }
    }

    // Imagem da carta
    const imagem = $('#produto-img img').last().attr('src');

    // Data atual
    const dataAtual = new Date().toLocaleDateString('pt-BR');

    // 🧾 Captura a tabela de vendedores
    const tabela = $('table.table-striped.table-bordered').first();
    const resultado = [];

    tabela.find('tr').each((_, tr) => {
      const linha = [];

      $(tr).find('th, td').each((_, td) => {
        linha.push($(td).text().trim());
      });

      if (linha.length > 0) {
        resultado.push(linha);
      }
    });

    // 🎯 Filtra por raridade e extrai preços como float
    const precosFiltrados = resultado
      .filter(row => row[1] && row[1].includes(raridadeAlvo))
      .map(row => {
        const precoStr = row[4] || 'R$ 0,00';
        return parseFloat(precoStr.replace('R$', '').replace(/\s/g, '').replace(',', '.'));
      })
      .filter(preco => !isNaN(preco));

    const menorPreco = precosFiltrados.length > 0
      ? Math.min(...precosFiltrados)
      : null;

    const menorPrecoFormatado = menorPreco != null
      ? menorPreco.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      : 'Indisponível';

    // 📦 Logs
    console.log('📄 Nome da carta:', nome);
    console.log('💰 Preço geral da página:', precoNumber);
    console.log('🖼️ Imagem:', imagem);
    console.log('📆 Data:', dataAtual);
    console.log('📊 Linhas da tabela:', resultado.length);
    console.log(`🔍 Menor preço para raridade "${raridadeAlvo}":`, menorPreco, `(${menorPrecoFormatado})`);
    console.log('Coleção: ',colecao);
    console.log('Código da carta:',codigoCarta);
    console.log('Código da coleção: ',codigoLimpo);
    console.log('Está vazio: ',vazio);

    
    if (vazio !== null) {
      // Conteúdo vazio → Retorna valores padrões
      if(alerta) Alert.alert('Aviso',`Nenhum valor encontrado para ${nome}, seus preços serão sunstituídos por 0.00`);
      return {
        nome,
        imagem,
        data: dataAtual,
        precoNumber:0.00,
        precoFormatado:'R$ 0.00',
        precoMinimoPorRaridade: 0.00,
        precoMinimoPorRaridadeFormatado:'R$ 0.00',
        tabelaCompleta: resultado,
        colecao,
        codigoLimpo,
        codigoCarta
        
      };
    }
    
    // Caso contrário, segue com retorno normal
    return {
      nome,
      imagem,
      data: dataAtual,
      precoNumber,
      precoFormatado,
      precoMinimoPorRaridade: menorPreco ?? precoNumber,
      precoMinimoPorRaridadeFormatado: menorPrecoFormatado ?? precoFormatado,
      tabelaCompleta: resultado,
      colecao,
      codigoLimpo,
      codigoCarta
    };
    

  } catch (error) {
    console.error('❌ Erro ao fazer scraping:', error.message);
    Alert.alert('Erro', '❌ Erro ao Buscar Carta, escolha outro link');
    return null;
  }
}
