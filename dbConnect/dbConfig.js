import mongoose from "mongoose";

const dbConnect = async (url) => {
    await mongoose.connect(url);
    console.log("datebase connected");
};

export default dbConnect;