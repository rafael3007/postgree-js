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
        console.log(body.split('')[0])

        try {
            if (body.split('')[0] == "#") {
                //mensagem gatilho

                //verifica se o usuario existe
                const profile = await Profiles.getProfileByNumber(from)


                if (profile == [] || profile == undefined) {
                    //se não encontrado insere no banco de dados
                    console.log(`${from} não possui cadastro no banco de dados`)
                    await Profiles.createProfile(from, from)

                }
                //retorna o estágio do usuario
                const { stage } = await Profiles.getProfileByNumber(from)

                //verifica se o comando só possui núnmeros
                if (/^\d+$/.test(body.substring(1))) {
                    //função para buscar obras
                    res.status(200).send({
                        type: "informações obras",
                        message: "infos"
                    })
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
                                            type: "",
                                            message: "funcionalidades de obras"
                                        })
                                        break;
                                    case '2':
                                        res.status(201).send({
                                            type: "",
                                            message: [
                                                "1- Programação das Turmas por data",
                                                "Programação das Turmas Hoje",
                                                "3- Programação por Supervisor",
                                                "4- Enviar programação para Supervisores",
                                                "5- Sair"
                                            ]
                                        })
                                        break;
                                    case '3':
                                        res.status(201).send({
                                            type: "",
                                            message: [
                                                "1- Folgas das turmas",
                                                "2- Sair"
                                            ]
                                        })
                                        break;
                                    default:
                                        res.status(404).send({
                                            type: "",
                                            message: "Desculpe, digite uma opção válida!"
                                        })
                                        break;
                                }
                                break;
                            case 2:
                                res.status(201).send({
                                    type: "",
                                    message: "funcionalidades de programação"
                                })
                                break;
                            default:
                                res.status(301).send({
                                    type: "erro",
                                    message: "testando default"
                                })
                        }

                    } else {
                        //stage == 0 -> envia o Menu de opções
                        await Profiles.deleteProfile(from)
                        await Profiles.createProfile(from, from)
                        //await Profiles.updateProfile(from, 0)

                        res.status(201).send({
                            type: "list",
                            sections: [
                                {
                                    title: "Obras",
                                    rows: [
                                        {
                                            rowId: "1",
                                            title: "Informações gerais",
                                            description: "veja as principais informações de uma obra."
                                        },
                                        {
                                            rowId: "2",
                                            title: "Informações detalhadas",
                                            description: "veja as informações detalhadas de uma obra."
                                        }
                                    ]
                                },
                                {
                                    title: "Programação",
                                    rows: [
                                        {
                                            rowId: "1",
                                            title: "Programação das Turmas por data",
                                            description: "Veja a programação das turmas por uma data."
                                        },
                                        {
                                            rowId: "2",
                                            title: "Programação das Turmas Hoje",
                                            description: "Veja a programação das turmas para hoje."
                                        },
                                        {
                                            rowId: "3",
                                            title: "Programação por Supervisor",
                                            description: "veja as obras programadas por supervisor."
                                        },
                                        {
                                            rowId: "4",
                                            title: "Enviar programação para Supervisores",
                                            description: "Envia as obras programadas para os respectivos supervisores."
                                        }
                                    ]
                                },
                                {
                                    title: "Folgas",
                                    rows: [
                                        {
                                            rowId: "1",
                                            title: "Turmas que estão folgando",
                                            description: "Veja a turmas que estão em folga no momento."
                                        },
                                        {
                                            rowId: "2",
                                            title: "Folgas programadas paras as turmas",
                                            description: "Veja a programação das folgas para as turmas."
                                        }
                                    ]
                                },
                                {
                                    title: "Cancelar",
                                    rows: [
                                        {
                                            rowId: "1",
                                            title: "Sair",
                                            description: ""
                                        }
                                    ]
                                }

                            ]
                        })
                    }

                }


            } else {
                //
                const profile = await Profiles.getProfileByNumber(from)


                if (!(profile == undefined)) {
                    //caso o usuario exista

                    //retorna o estágio do usuario
                    const { stage } = await Profiles.getProfileByNumber(from)

                    switch (stage) {
                        case 1:
                            //verifica a opção selecionada
                            switch (body) {
                                case 'Informações gerais':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "funcionalidades Gerais de obras"
                                    })
                                    break;
                                case 'Informações detalhadas':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Informações detalhadas de uma obra"
                                    })
                                    break;
                                case 'Programação das Turmas por data':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Programação por data"
                                    })
                                    break;
                                case 'Programação das Turmas Hoje':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Programação hoje"
                                    })
                                    break;
                                case 'Programação por Supervisor':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Programação por supervisor"
                                    })
                                    break;

                                case 'Enviar programação para Supervisores':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Enviando mensagem para os supervisores"
                                    })
                                    break;
                                case 'Turmas que estão folgando':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Folgas Atualmente"
                                    })
                                    break;
                                case 'Folgas programadas paras as turmas':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Folgas Futuras "
                                    })
                                    break;
                                case 'Sair':

                                    //stage == 0 -> zera
                                    await Profiles.updateProfile(from, 0)

                                    res.status(201).send({
                                        type: "",
                                        message: "Tchau, espero vê-lo em breve."
                                    })
                                    break;

                                default:

                                    res.status(404).send({
                                        type: "",
                                        message: "Desculpe, digite uma opção válida!"
                                    })
                                    break;
                            }
                            break;
                        case 2:
                            res.status(201).send({
                                type: "",
                                message: "funcionalidades de programação"
                            })
                            break;
                        default:
                            res.status(301).send({
                                type: "erro",
                                message: "testando default"
                            })
                    }

                }


            }
        } catch (error) {
            console.error("erro parte 1")
            res.status(500).send({
                type: "error",
                message: "erro interno"
            })
        }


    }


    static async processMessage(req, res) {
        const { body, from } = req.body

        if (String(body).split('')[0] == "#") {
            const command = body.substring(1);

            if (/^\d+$/.test(command)) {
                res.status(201).send({
                    type: "infos",
                    message: "Informações obras"
                })
            } else {

                if (String(command).toLocaleUpperCase() == "MENU") {

                    //cria o usuario com stage = 0

                    //verifica se ja existe
                    let profileTemp = await Profiles.getProfileByNumber(from)

                    if (!profileTemp) {
                        await Profiles.createProfile(from, from)
                    }


                    res.status(201).send({
                        type: "common",
                        title: "Escolha a opção desejada",
                        type: "list",
                        sections: [
                            {
                                title: "Obras",
                                rows: [
                                    {
                                        rowId: "1",
                                        title: "1)Informações gerais",

                                    },
                                    {
                                        rowId: "2",
                                        title: "2)Informações detalhadas",

                                    }
                                ]
                            },
                            {
                                title: "Programação",
                                rows: [
                                    {
                                        rowId: "1",
                                        title: "3)Programação das Turmas por data",

                                    },
                                    {
                                        rowId: "2",
                                        title: "4)Programação das Turmas Hoje",

                                    },
                                    {
                                        rowId: "3",
                                        title: "5)Programação por Supervisor",

                                    },
                                    {
                                        rowId: "4",
                                        title: "6)Enviar programação para Supervisores",

                                    }
                                ]
                            },
                            {
                                title: "Folgas",
                                rows: [
                                    {
                                        rowId: "1",
                                        title: "7)Turmas que estão folgando",

                                    },
                                    {
                                        rowId: "2",
                                        title: "8)Folgas programadas paras as turmas",

                                    }
                                ]
                            },
                            {
                                title: "Cancelar",
                                rows: [
                                    {
                                        rowId: "1",
                                        title: "9)Sair",

                                    }
                                ]
                            }

                        ]
                    })
                } else {
                    res.status(204).send({
                        type: "common",
                        message: `Desculpe, *${command}* não é um comando válido, verifique e envie uma mensagem novamente!`
                    })
                }
            }
        } else {
            const resposta = body
            //verificar o stage e de acordo com o stage verificar qual o comando == à resposta e executar

            const profile = await Profiles.getProfileByNumber(from)

            if (profile) {
                //tem profile

                switch (profile.stage) {
                    case 0:
                        switch (resposta) {
                            //opções do menu 1 - 9
                            case '1':

                                //redireciona para a proxima etapa
                                await Profiles.updateProfile(from, 1)
                                res.send({
                                    type: "common",
                                    message: "Digite o número da obra que deseja as informações"
                                })
                                break;
                            case '2':
                                //redireciona para a proxima etapa
                                await Profiles.updateProfile(from, 2)
                                res.send({
                                    type: "common",
                                    message: "Digite o número da obra que deseja as informações"
                                })
                                break;
                            case '3':
                                //redireciona para a proxima etapa
                                await Profiles.updateProfile(from, 3)
                                res.send({
                                    type: "common",
                                    message: "Digite a data que deseja buscar as programações "
                                })
                                break;
                            case '4':
                                //função
                                //ir para a função que verifica se quer mais alguma coisa
                                //await Profiles.updateProfile(from, 0)
                                res.send({
                                    type: "common",
                                    message: "mensagem com a programação das turmas de hoje"
                                })
                                break;
                            case '5':

                                //redireciona para a proxima etapa
                                await Profiles.updateProfile(from, 5)
                                res.send({
                                    type: "common",
                                    message: "Escolha qual o Supervisor você quer a programação"
                                })
                                break;
                            case '6':

                                //ir para a função que verifica se quer mais alguma coisa
                                //await Profiles.updateProfile(from, 0)
                                res.send({
                                    type: "common",
                                    message: "Envia as turmas que estão folgando"
                                })
                                break;
                            case '7':

                                //ir para a função que verifica se quer mais alguma coisa
                                //await Profiles.updateProfile(from, 0)
                                res.send({
                                    type: "common",
                                    message: "Envia as turmas que estão folgando"
                                })
                                break;
                            case '8':

                                //redireciona para a proxima etapa
                                await Profiles.updateProfile(from, 5)
                                res.send({
                                    type: "common",
                                    message: "Envia a programação das folgas"
                                })
                                break;
                            case '9':

                                //redireciona para a proxima etapa
                                await Profiles.deleteProfile(from)
                                res.send({
                                    type: "common",
                                    message: "Tchau! Precisando de mais alguma coisa só chamar 😁"
                                })
                                break;
                            default:
                                //inválido
                                //função
                                res.send({
                                    type: "error",
                                    message: "Desculpe não entendi sua resposta, escolha uma das opções válidas"
                                })
                                break;
                        }
                        break;
                    case 1:
                        switch (resposta) {
                            case '1':
                                //função
                                break;
                            case '2':
                                //função
                                break;
                            default:
                                //inválido
                                break;
                        }
                        break;
                    case 2:
                        switch (resposta) {
                            case '1':
                                //função
                                break;
                            case '2':
                                //função
                                break;
                            default:
                                //inválido
                                break;
                        }
                        break;
                    case 3:
                        switch (resposta) {
                            case '1':
                                //função
                                break;
                            case '2':
                                //função
                                break;
                            default:
                                //inválido
                                break;
                        }
                        break;
                    default:
                        //inválido
                        break;
                }

            } else {
                //não tem stage 
                //mensagem comum?

            }



        }
    }
}

export default MessageController;
