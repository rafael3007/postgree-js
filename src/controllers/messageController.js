import Profiles from "../models/profiles.js";

class MessageController {

    static async listarnumeros(req, res) {
        try {
            const dados = await Profiles.getAllProfiles();
            res.status(400).send({ message: JSON.stringify(dados) });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }

    static async verificarProfiles(req, res) {
        try {
            const dados = await Profiles.getAllProfiles();
            const number = dados.find(profile => profile.numero === req.body.number);
            if (number) {
                res.status(200).send({ message: number });
            } else {
                res.status(404).send({ message: "This number does not exist" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }

    static async receivedMessage(req, res) {
        const { body, from } = req.body

        if (body[0] === "#") {
            //mensagem gatilho

            //verifica se o usuario existe
            const profile = await Profiles.getProfileByNumber(from)


            if (profile == []) {
                //se não encontrado insere no banco de dados
                await Profiles.createProfile("Sem nome", from)

            }

            //retorna o estágio do usuario
            const { stage } = await Profiles.getProfileByNumber(from)

            //verifica se o comando só possui núnmeros
            if (/^\d+$/.test(body.substring(1))) {
                //função para buscar obras
            } else {
                //verifica se o stage > 0
                if (stage > 0) {

                    //ajustar para ao invés de enviar as mensagens enviar também um código
                    //para saber se a mensagem é uma lista, ou umna mensagem simples
                    //ou uma localização
                    switch (stage) {
                        case 1:
                            //verifica a opção selecionada
                            switch (body) {
                                case '1':
                                    res.status(201).send({
                                        message: "funcionalidades de obras"
                                    })
                                    break;
                                case '2':
                                    res.status(201).send({
                                        message: [
                                            "1- Programação das Turmas por data",
                                            "2- Programação das Turmas Hoje",
                                            "3- Programação por Supervisor",
                                            "4- Enviar programação para Supervisores",
                                            "5- Sair"
                                        ]
                                    })
                                    break;
                                case '3':
                                    res.status(201).send({
                                        message: [
                                            "1- Folgas das turmas",
                                            "2- Sair"
                                        ]
                                    })
                                    break;
                                default:
                                    res.status(404).send({
                                        message: "Desculpe, digite uma opção válida!"
                                    })
                                    break;
                            }
                            break;
                        case 2:
                    }

                } else {
                    //stage == 0 -> envia o Menu de opções
                    res.status(201).send({
                        message: {
                            "Menu": [
                                '1- Obras',
                                '2- Programação',
                                '3- Folgas',
                            ]
                        }
                    })
                }

            }


        }

        if (body[0] === "#" && !(/^\d+$/.test(body.substring(1)))) {
            const profile = await Profiles.getProfileByNumber(from)

            if (profile == []) {
                console.log("perfil não existe")
                //se não encontrado insere no banco de dados
                await Profiles.createProfile("Sem nome", from)

            }

            const { stage } = await Profiles.getProfileByNumber(from)
            switch (stage) {
                case 0:
                    //menu
                    await Profiles.updateProfile(from, 1)

                    res.status(201).send({
                        message: {
                            "Menu": [
                                '1- Obras',
                                '2- Programação',
                                '3- Folgas',

                            ]
                        }
                    })
                    break;
                case 1:



                    //atualização para o próximo estágio
                    await Profiles.updateProfile(from, 2)
                    //outra função
                    res.status(201).send({
                        message: "Função 1"
                    })
                    break;
                case 2:
                    //atualização para zerar o estágio
                    await Profiles.updateProfile(from, 0)
                    //outra função
                    res.status(201).send({
                        message: "Função 2"
                    })
                    break;

                default:
                    res.send({
                        message: "case Default"
                    })
            }


        } else {
            res.status(500).send({
                message: "informações das obras"
            })
        }
    }

}

export default MessageController;
