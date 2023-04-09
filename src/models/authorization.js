import { db } from "../database/connection.js"
import jwt from 'jsonwebtoken'


export default class Authorization {
    constructor() { }

    static async authenticate(username, password) {
        try {
            const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

            if (user) {
                const token = jwt.sign({ sub: user.id }, 'your_secret_key', { expiresIn: '1h' });

                await db.none('UPDATE users SET token = $1 WHERE id = $2', [token, user.id]);

                console.log('ok')

                return {
                    status: 200,
                    success: token
                }
            } else {
                return {
                    status: 404,
                    error: 'Invalid credentials'
                }

            }
        } catch (error) {
            console.error(error);
            return {
                status: 501,
                error: 'Internal server error'
            }
        }
    }

    static async findByToken(token) {

        const result = await db.query(`SELECT * FROM users WHERE token = '${token}'`);
        console.log(result)
        if (result.length === 0) {
            return null;
        }
        return result[0];
    }

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
