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
    return dataHoraFormatada;
}

export default class Profiles {
    constructor() {}

    static async createProfile(nome, number) {
        const result = await db.insert({ nome: nome, numero: number }).into('profiles');
        return result;
    }

    static async getProfileByNumber(number) {
        try {
            const result = await db.query(`select * from profiles where numero = '${number}'`);
            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }

    static async updateProfile(number, stage) {
        const result = await db.update('profiles', { stage: stage }).where({ numero: number });
        return result;
    }

    static async deleteProfile(number) {
        const result = await db.delete().from('profiles').where({ numero: number });
        return result;
    }

    static async getAllProfiles() {
        try {
            const result = await db.query("select * from profiles");
            return result;
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    }
}
