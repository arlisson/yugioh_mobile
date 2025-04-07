import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

let db = null;

export const openDatabase = () => {
  db = SQLite.openDatabaseSync("yugioh");
  return db;
};



export const deleteDatabase = async (dbName = "yugioh") => {
  try {
    db = SQLite.openDatabaseSync(dbName);
    if (db) await db.closeAsync();

    await SQLite.deleteDatabaseAsync(dbName);
    Alert.alert('Sucesso','🗑️ Banco de dados apagado com sucesso');
    console.log("🗑️ Banco de dados apagado com sucesso!");

    db = null; // marca como fechado
  } catch (error) {
    console.error("❌ Erro ao apagar banco de dados:", error);
  }
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
        imagem TEXT
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
        colecao TEXT NOT NULL
        );




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
          quantidade, raridade, qualidade, imagem
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

  export const inserirColecao = async (colecao) => {
    const db = await openDatabase();
  
    try {
      db.runAsync(
        `INSERT INTO colecoes (colecao) VALUES (?)`,
        [colecao]
      );
  
      console.log("✅ Coleção inserida com sucesso!");
      Alert.alert("Sucesso", "Coleção inserida com sucesso!");
    } catch (error) {
      console.error("❌ Erro ao inserir coleção:", error);
      Alert.alert("Erro", "Não foi possível inserir a coleção.");
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
             imagem = ?
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
  