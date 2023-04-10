import express from "express";
//importação de todas as rotas relacionados à Pessoa
import MessageController from "../controllers/messageController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";


const router = express.Router();

router
    .get('/message',authenticateToken,MessageController.verificarProfiles)
    .post("/bot", authenticateToken,MessageController.receivedMessage)
    
    


export default router;