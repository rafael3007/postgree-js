import res from "express/lib/response";
import { db } from "../database/connection.js"

const formataData = () => {
    // cria um novo objeto Date
    const dataHora = new Date();

    // obtém a data atual
    const data = dataHora.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // obtém a hora atual
    const hora = dataHora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // une a data e hora formatadas
    const dataHoraFormatada = `${data}-${hora}`;

    // exibe a data e hora formatadas
    return dataHoraFormatada

}

export default class Profiles {
    constructor(nome,numero, stage = 0) {
        this.nome = nome
        this.numero = numero
        this.stage = stage
        this.lastMessage = formataData()
    }


    getAll(){
        var result = ""
        db.query("select * from profiles")
            .then(response => {
                console.log(response)
                result = response
            })
            .catch(error => {
                result = error
                console.log(error)
            })

        return result
    }
}