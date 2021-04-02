import { User } from './Types';
import { connect, connection, Schema, model, Document } from 'mongoose';

// ----- DB stuff for User ----- //

const userSchema = new Schema({
    firstName: String,
    password: String,
    phoneNbr: String,
    profilePic: String,
    lastName: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }]
}, { versionKey: false });

interface IUser {
    firstName: string;
    lastName: string;
    password: string;
    phoneNbr: string;
    profilePic: string;
    contacts: string[];
    callEntries: Array<Object>;
}

interface IUserDoc extends IUser, Document { }

const UserModel = model<IUserDoc>("User", userSchema, "User");

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
 * @param user The user to be added
 * @param psw The specified password
 * @param picSrc The path to the specified profile picture
 */
export const createUser = async (user: User, psw: string, picSrc: string) => {
    const newUser = new UserModel({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNbr: user.phoneNbr,
        password: psw,
        profilePic: picSrc
    });

    try {
        const savedUser = await newUser.save();
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

export const getUser = async () => {
    try {
        const users = await UserModel.findOne();
        return users;
    } catch (err) {
        return console.error(err);
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

/**
 * Tries to authenticate the user using the specified password.
 * 
 * @param phone The phone number of the user to be authenticated
 * @param psw The specified password of the user
 */
export const authenticate = async (phone: string, psw: string) => {
    try {
        const user = await UserModel.findOne({ phoneNbr: phone }).lean();

        if (user.password === psw)
            return user;
        else
            return null;
    } catch (err) {
        console.log("User with phone number " + phone + " and password " + psw + " was not found!");
        console.error(err);
        return null;
    }
};

// ----- DB stuff for Contact ----- //

const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    profilePic: String,
    phoneNbr: String
}, { versionKey: false })

const ContactModel = model("Contact", contactSchema, "Contact");

// Functions for handling Contacts //

/**
 * 
 * Creates a new contact
 *
 * @param firstName 
 * @param lastName 
 * @param profilePic 
 * @param phoneNbr 
 * @returns 
 */
export const createContact = async (firstName: string, lastName: string, profilePic: string, phoneNbr: string) => {
    const newContact = new ContactModel({
        firstName: firstName,
        lastName: lastName,
        profilePic: profilePic,
        phoneNbr: phoneNbr
    });

    try {
        var savedContact = await newContact.save();
        console.log("Added contact");

        return savedContact;
    } catch (err) {
        return console.error(err);
    }
}

export const getContacts = async (contactIds: string[]) => {
    try {
        let contacts = [];

        for (let i = 0; i < contactIds.length; i++) {
            const contact = await UserModel.findOne({ _id: contactIds[i] }).lean();

            contacts.push({
                id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNbr: contact.phoneNbr,
                profilePic: contact.profilePic
            });
        }

        return contacts;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const getContactFromNbr = async (nbr: string) => {
    try {
        let contact = await UserModel.findOne({ phoneNbr: nbr }).lean();
        return {
            id: contact._id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            phoneNbr: contact.phoneNbr,
            profilePic: contact.profilePic
        }
    } catch (err) {
        console.error(err)
        return null
    }
}