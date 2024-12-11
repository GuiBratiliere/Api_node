import { MongoClient } from "mongodb"; // Importa a classe MongoClient para conectar ao MongoDB

// Função assíncrona para estabelecer uma conexão com o banco de dados MongoDB
export default async function ConectarAobco(conexao) {
    let mongoClient; // Declara uma variável para armazenar a instância do MongoClient

    try {
        // Cria uma nova instância do MongoClient com a string de conexão fornecida
        mongoClient = new MongoClient(conexao);

        console.log('conectando ao cluster do bco'); // Exibe mensagem de status indicando o início da conexão

        // Tenta conectar ao cluster MongoDB usando o método connect()
        await mongoClient.connect();

        console.log('conectado ao mongo'); // Exibe mensagem de sucesso na conexão

        // Retorna a instância conectada do MongoClient
        return mongoClient;
    } catch (erro) {
        // Captura e exibe erros que podem ocorrer durante a conexão
        console.error('falha na conexao', erro);

        // Encerra o processo com erro caso a conexão falhe
        process.exit();
    }
};
