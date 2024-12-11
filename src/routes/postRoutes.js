import express from 'express'; // Importa o framework Express para criar e gerenciar rotas e servidores HTTP
import multer from 'multer'; // Biblioteca para lidar com upload de arquivos
import cors from 'cors'; // Middleware para habilitar o CORS (Cross-Origin Resource Sharing)
import { listarposts, publicarPost, uploadImg, atualizarPost } from '../cotrollers/postsController.js'; // Importa as funções do controlador de posts

// Configuração de CORS, permitindo requisições apenas da origem especificada
const corsOptions = {
    origin: 'http://localhost:8000', // Permite requisições apenas deste endereço
    optionsSuccessStatus: 200 // Força o status de sucesso para navegadores antigos que não lidam bem com requisições HTTP 204
};

// Configuração de armazenamento para uploads com multer
const storage = multer.diskStorage({
    // Define o diretório onde os arquivos serão salvos
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Diretório 'uploads' para salvar os arquivos
    },
    // Define o nome do arquivo salvo no servidor
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Salva o arquivo com o nome original
    }
});

// Inicializa o middleware de upload com as configurações definidas
const upload = multer({ dest: "uploads", storage: storage });

// Função para configurar as rotas da aplicação
const routes = (app) => {
    app.use(express.json()); // Middleware para processar requisições com JSON no corpo
    app.use(cors(corsOptions)); // Middleware para habilitar CORS com as opções configuradas

    // Define uma rota GET para listar todos os posts
    app.get('/posts', listarposts);

    // Define uma rota POST para criar um novo post
    app.post('/posts', publicarPost);

    // Define uma rota POST para fazer upload de uma imagem
    // Usa o middleware `upload.single` para lidar com arquivos enviados no campo 'imagem'
    app.post('/upload', upload.single('imagem'), uploadImg);

    // Define uma rota PUT para atualizar uma postagem existente
    app.put('/upload/:id', atualizarPost);
};

export default routes; // Exporta a função de configuração de rotas para ser usada no servidor
