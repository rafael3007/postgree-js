import express from "express";
//importação de todas as rotas relacionados à Pessoa
import AuthorizationController from "../controllers/authorizationController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";


const router = express.Router();

router
    .post('/auth',AuthorizationController.generateAuth)
    .get('/test', authenticateToken, (req, res) => {
        res.status(200).send({ message: 'Authenticated' });
    });
export default router;