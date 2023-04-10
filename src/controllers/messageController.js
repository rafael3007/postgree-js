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

        if (body[0] === "#" && /^\d+$/.test(body.substring(1))) {
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
                        message: "MENU"
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


        }else{
            res.status(500).send({
                message: "Mensagem Inválida!"
            })
        }
    }

}

export default MessageController;
