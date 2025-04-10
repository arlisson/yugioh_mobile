import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

let db = null;

export const openDatabase = () => {
  db = SQLite.openDatabaseSync("yugioh");
  return db;
};



export const deleteDatabase = async (dbName = "yugioh") => {
  Alert.alert(
    'Confirmação',
    'Tem certeza que deseja apagar o banco de dados?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          try {
            db = SQLite.openDatabaseSync(dbName);
            if (db) await db.closeAsync();

            await SQLite.deleteDatabaseAsync(dbName);
            Alert.alert('Sucesso', '🗑️ Banco de dados apagado com sucesso');
            console.log("🗑️ Banco de dados apagado com sucesso!");

            db = null;
          } catch (error) {
            console.error("❌ Erro ao apagar banco de dados:", error);
            Alert.alert('Erro', 'Não foi possível apagar o banco de dados.');
          }
        },
      },
    ],
    { cancelable: true }
  );
};
export const createDatabase = () => {
    const db = openDatabase();
    try {
      db.execAsync(`
       CREATE TABLE IF NOT EXISTS cartas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        codigo TEXT,
        colecao TEXT,
        preco_compra REAL,
        data_compra TEXT,
        quantidade INTEGER,
        raridade TEXT,
        qualidade TEXT,
        imagem TEXT,
        link TEXT
        );

        CREATE TABLE IF NOT EXISTS qualidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        qualidade TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS raridades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        raridade TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS colecoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        colecao TEXT NOT NULL UNIQUE,
        codigo TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS vendas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          codigo TEXT,
          colecao TEXT,
          preco_compra REAL,
          data_compra TEXT,
          quantidade INTEGER,
          raridade TEXT,
          qualidade TEXT,
          imagem TEXT,
          link TEXT,
          data_venda TEXT,
          preco_venda REAL
        );

        INSERT INTO raridades (raridade) VALUES 
        ('Common'),
        ('Rare'),
        ('Super Rare'),
        ('Ultra Rare'),
        ('Secret Rare'),
        ('Ghost Rare'),
        ('Quarter Century Secret Rare');

        INSERT INTO qualidades (qualidade) VALUES 
        ('Nova'),
        ('Quase Nova'),
        ('Pouco Jogada'),
        ('Muito Jogada'),
        ('Danificada');





      `);
  
      console.log("Banco de dados criado com sucesso!");
  
      Alert.alert("BD carregado", "Banco de dados criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar o banco de dados:", error);
      Alert.alert("Erro", "Erro ao criar o banco de dados");
    }
  
    return db;
  };


  export const inserirCarta = async(carta) => {
    const db = await openDatabase();
  
    try {
      db.runAsync(
        `INSERT INTO cartas (
          nome, codigo, colecao, preco_compra, data_compra,
          quantidade, raridade, qualidade, imagem, link
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          carta.nome,
          carta.codigo,
          carta.colecao,
          carta.preco_compra,
          carta.data_compra,
          carta.quantidade,
          carta.raridade,
          carta.qualidade,
          carta.imagem,
          carta.link,
        ]
      );
  
      console.log("✅ Carta inserida com sucesso!");
      Alert.alert("Sucesso", "Carta inserida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao inserir carta:", error);
      Alert.alert("Erro", "Não foi possível inserir a carta.");
    }
  };
  
  export const inserirQualidade = async (qualidade) => {
    const db = await openDatabase();
  
    try {
      db.runAsync(
        `INSERT INTO qualidades (qualidade) VALUES (?)`,
        [qualidade]
      );
  
      console.log("✅ Qualidade inserida com sucesso!");
      Alert.alert("Sucesso", "Qualidade inserida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao inserir qualidade:", error);
      Alert.alert("Erro", "Não foi possível inserir a qualidade.");
    }
  };

  export const editarQualidade = async (id,qualidade) => {
    const db = await openDatabase();
  
    try {
      await db.runAsync(
        `UPDATE qualidades SET qualidade = ? WHERE id = ?`,
        [qualidade, id]
      );
  
      console.log("✅ Qualidade atualizada com sucesso!");
      Alert.alert("Sucesso", "Qualidade atualizada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao atualizar qualidade:", error);
      Alert.alert("Erro", "Não foi possível atualizar a qualidade.");
    }
  };
  

  export const inserirRaridade = async (raridade) => {
    const db = await openDatabase();
  
    try {
      db.runAsync(
        `INSERT INTO raridades (raridade) VALUES (?)`,
        [raridade]
      );
  
      console.log("✅ Raridade inserida com sucesso!");
      Alert.alert("Sucesso", "Raridade inserida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao inserir raridade:", error);
      Alert.alert("Erro", "Não foi possível inserir a raridade.");
    }
  };


  export const editarRaridade = async (id, raridade) => {
    const db = await openDatabase();
  
    try {
      await db.runAsync(
        `UPDATE raridades SET raridade = ? WHERE id = ?`,
        [raridade, id]
      );
  
      console.log("✅ Raridade atualizada com sucesso!");
      Alert.alert("Sucesso", "Raridade atualizada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao atualizar raridade:", error);
      Alert.alert("Erro", "Não foi possível atualizar a raridade.");
    }
  };
  



  export const inserirColecao = async (colecao, codigo) => {
    const db = await openDatabase();
  
    try {
      const existente = await db.getFirstAsync(
        `SELECT * FROM colecoes WHERE colecao = ? AND codigo = ?`,
        [colecao, codigo]
      );
  
      if (existente) {
        console.log("⚠️ Coleção já existente.");
        return;
      }
  
      await db.runAsync(
        `INSERT INTO colecoes (colecao, codigo) VALUES (?, ?)`,
        [colecao, codigo]
      );
  
      console.log("✅ Coleção inserida com sucesso!");
      Alert.alert("Sucesso", "Coleção inserida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao inserir coleção:", error);
      Alert.alert("Erro", "Não foi possível inserir a coleção.");
    }
  };
  
  

  export const editarColecao = async (id, colecao, codigo) => {
    const db = await openDatabase();
  
    try {
      await db.runAsync(
        `UPDATE colecoes SET colecao = ?, codigo = ? WHERE id = ?`,
        [colecao, codigo, id]
      );
  
      console.log("✅ Coleção atualizada com sucesso!");
      Alert.alert("Sucesso", "Coleção atualizada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao atualizar coleção:", error);
      Alert.alert("Erro", "Não foi possível atualizar a coleção.");
    }
  };
  

  export const buscarQualidades = async () => {
    const db = await openDatabase();
  
    try {
      const result = await db.getAllAsync(`SELECT * FROM qualidades`);
      return result.map((row) => ({
        label: row.qualidade,
        value: row.id,
      }));
    } catch (error) {
      console.error("❌ Erro ao buscar qualidades:", error);
      return [];
    }
  };

  export const buscarRaridades = async () => {
    const db = await openDatabase();
  
    try {
      const result = await db.getAllAsync(`SELECT * FROM raridades`);
      return result.map((row) => ({
        label: row.raridade,
        value: row.id,
      }));
    } catch (error) {
      console.error("❌ Erro ao buscar raridades:", error);
      return [];
    }
  };

  export const buscarColecoes = async () => {
    const db = await openDatabase();
  
    try {
      const result = await db.getAllAsync(`SELECT * FROM colecoes`);
      return result.map((row) => ({
        label: row.colecao,
        value: row.id,
        codigo:row.codigo
      }));
    } catch (error) {
      console.error("❌ Erro ao buscar coleções:", error);
      return [];
    }
  };
  
  export const excluirColecao = async (id) => {
    const db = await openDatabase();
    try {
      await db.runAsync(
        `DELETE FROM colecoes WHERE id = ?`,
        [id]
      );
      console.log("🗑️ Coleção removida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao remover coleção:", error);
    }
  };

  export const excluirQualidade = async (id) => {
    const db = await openDatabase();
    try {
      await db.runAsync(
        `DELETE FROM qualidades WHERE id = ?`,
        [id]
      );
      console.log("🗑️ Qualidade removida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao remover qualidade:", error);
    }
  };

  export const excluirRaridade = async (id) => {
    const db = await openDatabase();
    try {
      await db.runAsync(
        `DELETE FROM raridades WHERE id= ?`,
        [id]
      );
      console.log("🗑️ Raridade removida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao remover raridade:", error);
    }
  };
  
  export const buscarCartas = async () => {
    const db = await openDatabase();
  
    try {
      const result = await db.getAllAsync(`SELECT * FROM cartas`);
      //console.log('Cartas no banco',result);
      return result;
    } catch (error) {
      console.error("❌ Erro ao buscar cartas:", error);
      return [];
    }
  };
  
  export const excluirCarta = async (id) => {
    const db = await openDatabase();
  
    try {
      await db.runAsync(`DELETE FROM cartas WHERE id = ?`, [id]);
      console.log(`🗑️ Carta com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao deletar carta com id ${id}:`, error);
    }
  };
  
  export const atualizarCarta = async (carta) => {
    const db =await openDatabase();
  
    try {
      await db.runAsync(
        `UPDATE cartas 
         SET nome = ?, 
             codigo = ?, 
             colecao = ?, 
             preco_compra = ?, 
             data_compra = ?, 
             quantidade = ?, 
             raridade = ?, 
             qualidade = ?, 
             imagem = ?,
             link = ?
         WHERE id = ?`,
        [
          carta.nome,
          carta.codigo,
          carta.colecao,
          carta.preco_compra,
          carta.data_compra,
          carta.quantidade,
          carta.raridade,
          carta.qualidade,
          carta.imagem,
          carta.link,
          carta.id, // ← ID da carta que está sendo editada
        ]
      );
  
      console.log("✅ Carta atualizada com sucesso!");
      Alert.alert("Sucesso", "Carta atualizada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao atualizar carta:", error);
      Alert.alert("Erro", "Não foi possível atualizar a carta.");
    }
  };
  
  export const inserirVenda = async (venda) => {
    const db = await openDatabase();
  
    try {
      db.runAsync(
        `INSERT INTO vendas (
          nome, codigo, colecao, preco_compra, data_compra,
          quantidade, raridade, qualidade, imagem, link,
          data_venda, preco_venda
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          venda.nome,
          venda.codigo,
          venda.colecao,
          venda.preco_compra,
          venda.data_compra,
          venda.quantidade,
          venda.raridade,
          venda.qualidade,
          venda.imagem,
          venda.link,
          venda.data_venda,
          venda.preco_venda,
        ]
      );
  
      console.log("✅ Venda inserida com sucesso!");
      Alert.alert("Sucesso", "Venda registrada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao inserir venda:", error);
      Alert.alert("Erro", "Não foi possível registrar a venda.");
    }
  };
  
  export const atualizarVenda = async (carta) => {
    const db =await openDatabase();
  
    try {
      await db.runAsync(
        `UPDATE vendas
         SET nome = ?, 
             codigo = ?, 
             colecao = ?, 
             preco_compra = ?, 
             data_compra = ?, 
             quantidade = ?, 
             raridade = ?, 
             qualidade = ?, 
             imagem = ?,
             link = ?,
             data_venda =?,
             preco_venda =?
         WHERE id = ?`,
        [
          carta.nome,
          carta.codigo,
          carta.colecao,
          carta.preco_compra,
          carta.data_compra,
          carta.quantidade,
          carta.raridade,
          carta.qualidade,
          carta.imagem,
          carta.link,
          carta.data_venda,
          carta.preco_venda,
          carta.id, // ← ID da carta que está sendo editada
        ]
      );
  
      console.log("✅ Venda atualizada com sucesso!");
      Alert.alert("Sucesso", "Venda atualizada com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao atualizar venda:", error);
      Alert.alert("Erro", "Não foi possível atualizar a venda.");
    }
  };

  export const buscarVendas = async () => {
    const db = await openDatabase();
  
    try {
      const resultado = await db.getAllAsync(`SELECT * FROM vendas ORDER BY data_venda DESC`);
      return resultado;
    } catch (error) {
      console.error("❌ Erro ao buscar vendas:", error);
      return [];
    }
  };
  
  export const atualizarQuantidadeCarta = async (id, novaQuantidade) => {
    const db = await openDatabase();
  
    try {
      await db.runAsync(
        `UPDATE cartas SET quantidade = ? WHERE id = ?`,
        [novaQuantidade, id]
      );
      console.log(`✅ Quantidade da carta ${id} atualizada para ${novaQuantidade}`);
    } catch (error) {
      console.error("❌ Erro ao atualizar quantidade da carta:", error);
      throw error;
    }
  };
  
  export const calcularTotalGasto = async () => {
    const db = await openDatabase();
  
    try {
      const result = await db.getFirstAsync(
        `SELECT SUM(preco_compra * quantidade) AS total_gasto FROM cartas`
      );
  
      const total = result?.total_gasto ?? 0;
      //console.log(`💰 Total gasto: R$ ${total.toFixed(2)}`);
      return total;
    } catch (error) {
      console.error("❌ Erro ao calcular total gasto:", error);
      throw error;
    }
  };

  export const calcularTotalVendido = async () => {
    const db = await openDatabase();
  
    try {
      const result = await db.getFirstAsync(
        `SELECT SUM(preco_venda * quantidade) AS total_vendido FROM vendas`
      );
  
      const total = result?.total_vendido ?? 0;
      //console.log(`💰 Total vendido: R$ ${total.toFixed(2)}`);
      return total;
    } catch (error) {
      console.error("❌ Erro ao calcular total vendido:", error);
      throw error;
    }
  };
  
  export const calcularTotais = async () => {
    const db = await openDatabase();
  
    try {
      const [gastoCartas, gastoVendas, vendaInfo] = await Promise.all([
        db.getFirstAsync(`SELECT SUM(preco_compra * quantidade) AS gasto_cartas FROM cartas`),
        db.getFirstAsync(`SELECT SUM(preco_compra * quantidade) AS gasto_vendas FROM vendas`),
        db.getFirstAsync(`SELECT SUM(preco_venda * quantidade) AS total_vendido FROM vendas`)
      ]);
  
      const totalGastoCartas = gastoCartas?.gasto_cartas ?? 0;
      const totalGastoVendas = gastoVendas?.gasto_vendas ?? 0;
      const totalVendido = vendaInfo?.total_vendido ?? 0;
  
      const totalGasto = totalGastoCartas + totalGastoVendas;
      const lucroTotal = totalVendido - totalGasto;
  
      return {
        totalGasto,
        totalVendido,
        lucroTotal
      };
    } catch (error) {
      console.error("❌ Erro ao calcular totais financeiros:", error);
      throw error;
    }
  };

  export const excluirVenda = async (id) => {
    const db = await openDatabase();
  
    try {
      await db.runAsync(`DELETE FROM vendas WHERE id = ?`, [id]);
      console.log(`🗑️ Venda com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.error(`❌ Erro ao deletar venda com id ${id}:`, error);
    }
  };
  
  
  
  