import {getTodososposts, criarPost, atualizarPostagem} from "../models/postmodel.js";
import fs from "fs";

export async function listarposts (req, res) {
    const result = await getTodososposts();
    res.status(200).json(result);
}

export async function publicarPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.mensagem);
        res.status(500).json({"erro":"erro na requisição"});
    };
}

export async function uploadImg(req, res) {

    const imgUrl = req.file.originalname
    const uploadimagem = {
        descricao: "",
        imgUrl: imgUrl,
        alt:""
    };

    try{
        const imagemCriada = await criarPost(uploadimagem);
        const arquivoatt = `uploads/${imagemCriada.insertedId}.png`;
        fs.renameSync(req.file.path, arquivoatt);
        res.status(200).json(imagemCriada);
    } catch{
        console.error(erro.mensagem);
        res.status(500).json({"erro":"erro interno"});
    };
}

export async function atualizarPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`
    const postatt = {
        imgUrl:urlImg,
        descricao: req.body.descricao,
        alt: req.body.alt
    };

    try{
        const postCriado = await atualizarPostagem(id, postatt);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.mensagem);
        res.status(500).json({"erro":"erro na requisição"});
    };
}
