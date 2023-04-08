import Profiles from "../models/profiles.js";

class MessageController {

    static async listarnumeros(req, res) {
        try {
            const dados = await Profiles.getAllProfiles();
            res.status(400).send({message: JSON.stringify(dados)});
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal server error"});
        }
    }

    static async verificarProfiles(req, res) {
        try {
            const dados = await Profiles.getAllProfiles();
            const number = dados.find(profile => profile.numero === req.body.number);
            if (number) {
                res.status(200).send({message: number});
            } else {
                res.status(404).send({message: "This number does not exist"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({message: "Internal server error"});
        }
    }

}

export default MessageController;
