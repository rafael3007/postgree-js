import Authorization from "../models/authorization.js";


class AuthorizationController {

    static async generateAuth(req, res) {

        const [username, password] = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString().split(':');

        const authorization = await Authorization.authenticate(username, password)

        switch (authorization.status) {
            case 200:
                //sucesso
                res.status(200).send({
                    token: authorization.token
                })
                break;
            case 404:
                //invalido
                res.status(404).send({
                    message: "Credênciais inválidas!"
                })
                break;
            case 501:
                //erro interno
                res.status(501).send({
                    message: "Erro interno!"
                })
                break;
            default:
                res.status(666).send({
                    message: "Erro interno!"
                })
                break;
        }

    }

    static async verifyToken(req, res, next) {
        // obtém o token enviado no header da requisição
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).send({
                message: "Token não fornecido"
            });
        }

        try {

            // verifica se o token é válido
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // obtém as informações do usuário a partir do token
            const { username, permissions } = decodedToken;

            // verifica se o usuário tem permissão para acessar o endpoint em questão
            if (permissions.includes(req.method + ":" + req.originalUrl)) {
                // se tiver permissão, passa para o próximo middleware
                return next();
            } else {
                // se não tiver permissão, retorna erro 403 (forbidden)
                return res.status(403).send({
                    message: "Usuário não tem permissão para acessar este endpoint"
                });
            }
        } catch (err) {
            // se houver algum erro na verificação do token, retorna erro 401 (unauthorized)
            return res.status(401).send({
                message: "Token inválido"
            });
        }
    }


}

export default AuthorizationController