import express from "express"; // Importa o framework Express para construir o servidor
import routes from "./src/routes/postRoutes.js"; // Importa as rotas definidas no arquivo "postRoutes.js"

const app = express(); // Cria uma instância do servidor Express

// Configura o middleware para servir arquivos estáticos na pasta 'uploads'
// Isso permite acessar arquivos armazenados na pasta 'uploads' diretamente pela URL
app.use(express.static('uploads'));

// Chama a função de rotas e passa a instância do servidor como argumento
// Define as rotas da aplicação com base nas funções exportadas no arquivo "postRoutes.js"
routes(app);

// Configura o servidor para escutar na porta 3000
// Quando o servidor está em execução, exibe uma mensagem de confirmação no console
app.listen(3000, () => {
    console.log('Servidor escutando...'); // Mensagem de log indicando que o servidor está rodando
});
