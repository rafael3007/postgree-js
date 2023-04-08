import express from 'express'
import messages from './messagesRoutes.js'
import bodyParser from 'body-parser';


const routes = (app) =>{

    // rota para teste da aplicação
    app.route('/').get((req,res)=>{
        res.status(200).send({result: "API is running"})
    })
    //rotas e 'configs' adicionais 
    app.use(
        express.json(),
        messages,
        bodyParser.json(),
        bodyParser.urlencoded({extended: false})
    )
    

    app.listen(3000)

    
}

export default routes





