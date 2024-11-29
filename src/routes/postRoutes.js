import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {listarposts, publicarPost, uploadImg, atualizarPost} from '../cotrollers/postsController.js';

const corsOptions = {
    origin:'http://localhost:8000',
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({dest: "uploads", storage: storage})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get('/posts', listarposts);
    app.post('/posts', publicarPost);
    app.post('/upload', upload.single('imagem'), uploadImg);
    app.put('/upload/:id', atualizarPost);
}

export default routes;