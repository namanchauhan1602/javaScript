import { getUser } from "./auth.js";

async function restrictUser(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) return res.send('user not authorized');
    const user = getUser(userUid);
    if (!user) return res.send('user not found');
    res.user = user;
    next();
}

export {restrictUser};