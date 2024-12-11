import { getTodososposts, criarPost, atualizarPostagem } from "../models/postmodel.js"; // Importa funções do modelo relacionadas às postagens
import fs from "fs"; // Importa o módulo de manipulação de arquivos

// Função para listar todos os posts
export async function listarposts(req, res) {
    const result = await getTodososposts(); // Busca todos os posts do banco de dados
    res.status(200).json(result); // Retorna os posts como resposta em formato JSON
}

// Função para criar um novo post
export async function publicarPost(req, res) {
    const novoPost = req.body; // Obtém os dados do post do corpo da requisição
    try {
        const postCriado = await criarPost(novoPost); // Chama a função para criar o post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado como resposta
    } catch (erro) {
        console.error(erro.mensagem); // Exibe o erro no console
        res.status(500).json({ "erro": "erro na requisição" }); // Retorna uma resposta de erro
    }
}

// Função para fazer o upload de uma imagem associada a um post
export async function uploadImg(req, res) {
    const imgUrl = req.file.originalname; // Obtém o nome original do arquivo enviado
    const uploadimagem = {
        descricao: "", // Descrição padrão (vazia) para a imagem
        imgUrl: imgUrl, // URL da imagem será o nome original do arquivo
        alt: "" // Texto alternativo padrão (vazio)
    };

    try {
        const imagemCriada = await criarPost(uploadimagem); // Salva os dados da imagem no banco de dados
        const arquivoatt = `uploads/${imagemCriada.insertedId}.png`; // Define o caminho final do arquivo baseado no ID gerado
        fs.renameSync(req.file.path, arquivoatt); // Renomeia/move o arquivo enviado para o caminho final
        res.status(200).json(imagemCriada); // Retorna os dados da imagem criada
    } catch (erro) {
        console.error(erro.mensagem); // Exibe o erro no console
        res.status(500).json({ "erro": "erro interno" }); // Retorna uma resposta de erro
    }
}

// Função para atualizar um post existente
export async function atualizarPost(req, res) {
    const id = req.params.id; // Obtém o ID do post a ser atualizado dos parâmetros da URL
    const urlImg = `http://localhost:3000/${id}.png`; // Define a URL da imagem com base no ID do post
    const postatt = {
        imgUrl: urlImg, // Atualiza a URL da imagem
        descricao: req.body.descricao, // Atualiza a descrição
        alt: req.body.alt // Atualiza o texto alternativo
    };

    try {
        const postCriado = await atualizarPostagem(id, postatt); // Atualiza o post no banco de dados
        res.status(200).json(postCriado); // Retorna os dados atualizados do post
    } catch (erro) {
        console.error(erro.mensagem); // Exibe o erro no console
        res.status(500).json({ "erro": "erro na requisição" }); // Retorna uma resposta de erro
    }
}
