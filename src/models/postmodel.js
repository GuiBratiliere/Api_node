import 'dotenv/config'; // Importa as variáveis de ambiente do arquivo .env para o projeto
import { ObjectId } from "mongodb"; // Importa a classe ObjectId para manipular IDs no MongoDB
import ConectarAobco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados

// Conexão com o banco de dados, utilizando a string de conexão definida no arquivo .env
const con = await ConectarAobco(process.env.CONEXAO);

// Função para buscar todos os posts da coleção 'posts'
export async function getTodososposts() {
    const db = con.db('imersao_instabytes'); // Seleciona o banco de dados 'imersao_instabytes'
    const colecao = db.collection('posts'); // Seleciona a coleção 'posts'

    return colecao.find().toArray(); // Retorna todos os documentos da coleção em formato de array
}

// Função para criar um novo post na coleção 'posts'
export async function criarPost(novoPost) {
    const db = con.db('imersao_instabytes'); // Seleciona o banco de dados 'imersao_instabytes'
    const colecao = db.collection('posts'); // Seleciona a coleção 'posts'

    return colecao.insertOne(novoPost); // Insere o objeto `novoPost` na coleção e retorna o resultado
}

// Função para atualizar uma postagem existente na coleção 'posts'
export async function atualizarPostagem(id, novoPost) {
    const db = con.db('imersao_instabytes'); // Seleciona o banco de dados 'imersao_instabytes'
    const colecao = db.collection('posts'); // Seleciona a coleção 'posts'
    const objID = ObjectId.createFromHexString(id); // Converte o ID fornecido para o formato ObjectId do MongoDB

    // Atualiza o documento com o ID correspondente, aplicando as alterações contidas em `novoPost`
    return colecao.updateOne(
        { _id: new ObjectId(objID) }, // Filtro: documento cujo `_id` seja igual ao ID fornecido
        { $set: novoPost } // Atualização: substitui os campos especificados por `novoPost`
    );
}
