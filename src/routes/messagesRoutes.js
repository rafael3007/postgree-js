import express from "express";
//importação de todas as rotas relacionados à Pessoa
import MessageController from "../controllers/messageController.js";


const router = express.Router();

router
    .get('/message',MessageController.verificarProfiles)
    
    


export default router;