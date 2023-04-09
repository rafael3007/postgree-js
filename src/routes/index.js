import express from 'express'
import messages from './messagesRoutes.js'
import authorization from './authorizationRoutes.js'
import bodyParser from 'body-parser'
import {authenticateToken} from '../middlewares/authenticateToken.js'


const routes = (app) =>{

    // rota para teste da aplicação
    app.route('/').get(authenticateToken,(req,res)=>{
        res.status(200).send({result: "API is running"})
    })
    //rotas e 'configs' adicionais 
    app.use(
        express.json(),
        messages,
        authorization,
        authenticateToken,
        bodyParser.json(),
        bodyParser.urlencoded({extended: false})
    )
    

    app.listen(3000)

    
}

export default routes





