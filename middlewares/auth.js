import jwt from "jsonwebtoken";
const secret = 'namanchauhan16'

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        password: user.password
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try{
    return jwt.verify(token, secret);

    }catch(err){
        return null;
    }
}

export { setUser, getUser };