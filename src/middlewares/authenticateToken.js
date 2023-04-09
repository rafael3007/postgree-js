import Authorization from "../models/authorization.js"

export async function authenticateToken(req, res, next) {

    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
  
    if (!token) {
        return res.sendStatus(401);
    }

    const user = await Authorization.findByToken(token);

    if (!user) {
        return res.sendStatus(401);
    }
    /*
    if (!user.permissions.includes(requiredPermission)) {
        return res.sendStatus(403);
    }
    */
    req.user = user;
    next();

}