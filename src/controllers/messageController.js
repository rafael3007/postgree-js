import pessoas from "../models/Pessoa.js";

class PessoaController {

    static listarPessoas =  (req,res) => {
        pessoas.find((err,pessoas) => {
            res.status(200).json(pessoas)
        })
    }

    static listarPessoaPorId = (req,res) => {
        const id = req.params.id

        pessoas.findById(id,(err,pessoas)=>{
            if(err){
                res.status(400).send({message: `${err} - ID não localizado!`})
            }else{
                res.status(200).send(pessoas)  
            }
        })
    }

    static cadastrarPessoa = (req,res) => {
        let pessoa = new pessoas(req.body);

        pessoa.save((err)=>{
            //if error
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            }else{
                res.status(201).send(pessoa.toJSON())
            }
        })
    }

    static atualizarPessoa = (req,res) =>{
        const id = req.params.id
        pessoas.findByIdAndUpdate(id,{$set: req.body}, (err) => {
            if(!err){
                res.status(200).send({message: 'Item atualizado com sucesso!'})
            }else{
                res.status(500).send({message: `${err.message} - Falha ao atualizar o item!`})
            }
        })

    }

    static removerPessoa = (req,res) =>{

        const id = req.params.id

        pessoas.findByIdAndDelete(id,(err) =>{
            if(!err){
                res.status(200).send({message: 'Item removido com sucesso!'})
            }else {
                res.status(500).send({message: `${err} - Falha ao remover item!`})
            }
        })
    }

}

export default PessoaController
