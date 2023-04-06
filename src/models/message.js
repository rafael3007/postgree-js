import mongoose from "mongoose";

const profilesScheema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        stage: {type: Number, required: true, },
        lastMessage: {type: Date, required: true},
    }
);

const pessoas = mongoose.model('profiles',profilesScheema)

export default pessoas;