import 'dotenv/config';
import { ObjectId } from "mongodb";
import ConectarAobco from "../config/dbConfig.js";

const con = await ConectarAobco(process.env.CONEXAO)

export async function getTodososposts() {
    const db = con.db('imersao_instabytes');
    const colecao = db.collection('posts');

    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = con.db('imersao_instabytes');
    const colecao = db.collection('posts');

    return colecao.insertOne(novoPost);
}

export async function atualizarPostagem(id, novoPost) {
    const db = con.db('imersao_instabytes');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id);

    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
