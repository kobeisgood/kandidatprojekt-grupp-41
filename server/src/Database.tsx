import { User } from './Types';
import { connect, connection, Schema, model } from 'mongoose';


const userSchema = new Schema({
    firstName: String,
    password: String,
    phoneNbr: String,
    profilePic: String,
    lastName: String
}, { versionKey: false });

const UserModel = model("User", userSchema, "User");

/**
 * Initializes a connection with the database. Running this will allow ```mongoose.connection``` to perform further operations.
 */
export const connectToDb = () => {
    connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    connection.on('error', console.error.bind(console, 'Could not connect to database:'));

    connection.once('open', () => {
        console.log("Connected to database!");
    });
};

/**
 * Creates a new user in the database.
 * 
 * @param user TODO
 * @param psw TODO
 * @param picSrc TODO
 * @param phone TODO
 */
export const createUser = async (user: User, psw: string, picSrc: string, phone: number) => {
    const newUser = new UserModel({
        firstName: user.firstName,
        lastName: user.lastName,
        password: psw,
        profilePic: picSrc,
        phoneNbr: phone
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

export const numberExists = async (nbr: string) => {
    try {
        const numberExists = await UserModel.exists({ phoneNbr: nbr });
        return numberExists;
    } catch (err) {
        return console.log(err);
    }
};

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