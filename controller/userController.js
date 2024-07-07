import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from 'uuid';
import USER from "../model/userModel.js";
import { setUser } from "../middlewares/auth.js";

const userSignUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await USER.create({
        name: name,
        email: email,
        password: password
    });
    return res.send(user)
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await USER.findOne({ email, password });
    if (!user) {
        res.send("email id or password does not match");
    }
    const token = setUser(user);
    res.cookie('uid', token);
    return res.send(user);
});

export { userSignUp, userLogin };