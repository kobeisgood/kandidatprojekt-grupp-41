import { User } from './Types';
import { connect, connection, Schema, model } from 'mongoose';

// ----- DB stuff for User ----- //

const userSchema = new Schema({
    firstName: String,
    password: String,
    phoneNbr: String,
    profilePic: String,
    lastName: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'ContactModel' }]
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

// ----- DB stuff for Contact ----- //

const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    profilePic: String,
    phoneNbr: String
}, { versionKey: false })

const ContactModel = model("Contact", contactSchema, "Contact");

// Functions for handling Contacts //

/*
app.post("/contacts", function(req, res) {
    var contact = new ContactModel({
        firstName: req.body.firstName,
        lastName: req.lastName.lastName,
        profilePic: req.body.profilePic, 
        phoneNbr: req.body.phoneNbr
    }).save(function(err, docs){
        if(err) throw err;
        res.send(docs)
    });

    // Trying with test user, TODO: getUserFromSession(), functionality to get the user that is logged in 
    var user = new UserModel({
        firstName: "Robin",
        password: "repo123",
        phoneNbr: "1111111111",
        profilePic: "robinsPic",
        lastName: "Repo",
        contacts: []
    }) 
    user.contacts.push(contact);
    user.save(callback);
});*/



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