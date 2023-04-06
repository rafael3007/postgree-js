import express from "express";
//importação de todas as rotas relacionados à Pessoa
import PessoaController from "../controllers/pessoaController.js";


const router = express.Router();

router
    .get('/getRow',PessoaController.listarPessoas)
    .get('getRow/:id',PessoaController.listarPessoaPorId)
    .post('/addRow',PessoaController.cadastrarPessoa)
    .put('/updateRow/:id',PessoaController.atualizarPessoa)
    .delete('/removeRow/:id',PessoaController.removerPessoa)


export default router;