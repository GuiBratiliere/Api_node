import { MongoClient } from "mongodb";

export default async function ConectarAobco(conexao){
    let mongoClient;

    try{
        mongoClient = new MongoClient(conexao);
        console.log('conectando ao cluster do bco');
        await mongoClient.connect();
        console.log('conectado ao mongo');

        return mongoClient;
    } catch(erro){
        console.error('falha na conexao', erro);
        process.exit();
    }
};
