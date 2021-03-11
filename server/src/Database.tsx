import { User } from './Types';
import { connect, connection, Schema, model } from 'mongoose';


const userSchema = new Schema({
    first_name: String,
    password: String,
    phone_nbr: String,
    profile_pic: String,
    surname: String
});

const UserModel = model("User", userSchema, "User");

export const initDbConnection = () => {
    connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    connection.on('error', console.error.bind(console, 'Could not connect to database:'));

    connection.once('open', () => {
        console.log("Connected to database!");
    });

    return connection;
};

export const createUser = async (user: User, psw: string, picSrc: string, phone: number) => {
    const newUser = new UserModel({
        first_name: user.firstName,
        surname: user.lastName,
        password: psw,
        profile_pic: picSrc,
        phone_nbr: phone
    });

    try {
        const savedUser = await newUser.save();
        console.log("Added user");
        return savedUser;
    } catch (err) {
        return console.error(err);
    }
};

export const deleteUser = () => { };

export const getUsers = async () => {
    try {
        const users = await UserModel.find();
        return users;
    } catch (err) {
        return console.error(err);
    }
};

export const addCallEntry = () => { };

export const updateName = (firstName: string, lastName: string) => { };

export const updatePhone = (phone: string) => { };

export const setProfilePic = () => { };