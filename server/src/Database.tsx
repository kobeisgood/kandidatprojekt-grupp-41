import { Contact, PhoneNbr, User } from './Types';
import { connect, connection, Schema, model, Document } from 'mongoose';

// ----- DB stuff for User ----- //

const userSchema = new Schema({
    firstName: String,
    password: String,
    phoneNbr: String,
    profilePic: String,
    lastName: String,
    contacts: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }],
    callEntries: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }],
}, { versionKey: false });

interface IUser {
    firstName: string;
    lastName: string;
    password: string;
    phoneNbr: string;
    profilePic: string;
    contacts: string[];
    callEntries: string[];
}

interface IUserDoc extends IUser, Document { }
const UserModel = model<IUserDoc>("User", userSchema, "User");

/**
 * Initializes a connection with the database. Running this will allow ```mongoose.connection``` to perform further operations.
 */
export const connectToDb = () => {
    connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

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

/**
 * Updates a user's name in the database. 
 * 
 * @param phoneNbr 
 * @param firstName 
 * @param lastName 
 */
export const updateName = async (phoneNbr: string, firstName: string, lastName: string) => {
    try {
        await UserModel.findOneAndUpdate({ phoneNbr: phoneNbr },
            {
                firstName: firstName,
                lastName: lastName
            }
        )
    } catch (err) {
        console.error(err)
    }
};

/**
 * Updates a user's number in the database.
 * 
 * @param oldNbr 
 * @param newNbr 
 */
export const updateNbr = async (oldNbr: string, newNbr: string) => {
    try {
        await UserModel.findOneAndUpdate({ phoneNbr: oldNbr },
            {
                phoneNbr: newNbr
            }
        )
    } catch (err) {
        console.error(err)
    }
};

/**
 * Updates a user's password in the database. 
 * 
 * @param phoneNbr 
 * @param newPassword 
 */
export const updatePassword = async (phoneNbr: string, newPassword: string) => {
    try {
        await UserModel.findOneAndUpdate({ phoneNbr: phoneNbr },
            {
                password: newPassword
            }
        )
    } catch (err) {
        console.error(err)
    }
};

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

export const getCallEntries = async (contactIds: string[]) => {
    try {
        let callEntries = [];

        for (let i = contactIds.length - 1; i > -1; i--) {
            const contact = await UserModel.findOne({ _id: contactIds[i] }).lean();

            if (contact !== null)
                callEntries.push({
                    id: contact._id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNbr: contact.phoneNbr,
                    profilePic: contact.profilePic
                });
        }

        return callEntries;
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

/**
 * Adds a contact to a users contact list 
 * User is found using the number of the user that is logged in 
 * 
 * @param contact The contact to be added
 * @param loggedInUserNumber Used to find correct user
 * @returns The updated list
 */
export const addContactToList = async (contact: User, loggedInUserNumber: string) => {
    try {
        await UserModel.findOneAndUpdate(
            {
                phoneNbr: loggedInUserNumber
            },
            {
                $addToSet: { // $addToSet makes sure that same contact can't be added again
                    contacts: contact.id,
                },
            }
        )
        let updatedContactList = (await UserModel.findOne({ phoneNbr: loggedInUserNumber }).lean()).contacts

        let realUpdatedContactList = []
        for (let i = 0; i < updatedContactList.length; i++) {
            const contact = await UserModel.findOne({ _id: updatedContactList[i] }).lean();

            realUpdatedContactList.push({
                id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNbr: contact.phoneNbr,
                profilePic: contact.profilePic
            });
        }

        return realUpdatedContactList;
    } catch (err) {
        console.error(err)
        alert("Kontakten kunde inte läggas till!")
        return null
    }
}

/**
 * Removes a contact from a users contact list 
 * User is found using the number of the user that is logged in 
 * 
 * @param contact The contact to be added
 * @param loggedInUserNumber Used to find correct user
 * @returns The updated list
 */
export const removeContactFromList = async (contact: User, loggedInUserNumber: string) => {
    try {
        await UserModel.findOneAndUpdate(
            {
                phoneNbr: loggedInUserNumber
            },
            {
                $pull: {
                    contacts: contact.id,
                },
            }
        )

        let updatedContactList = (await UserModel.findOne({ phoneNbr: loggedInUserNumber }).lean()).contacts

        let realUpdatedContactList = []
        for (let i = 0; i < updatedContactList.length; i++) {
            const contact = await UserModel.findOne({ _id: updatedContactList[i] }).lean();

            realUpdatedContactList.push({
                id: contact._id,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNbr: contact.phoneNbr,
                profilePic: contact.profilePic
            });
        }

        return realUpdatedContactList
    } catch (err) {
        console.error(err)
        alert("Kontakten kunde inte tas bort!")
        return null
    }
}

export const addCallEntryToList = async (peerNbr: PhoneNbr, myNbr: PhoneNbr, callback: (newCallEntries: Contact[]) => void) => {
    try {
        // Lookup other person
        let contact = await UserModel.findOne({ phoneNbr: peerNbr }).lean();
        
        UserModel.exists({
            phoneNbr: myNbr,
            callEntries: { $in: [contact._id] }
        }, async (err) => {

            // If contact is already present in call entries, remove it first
            if (err !== null) {
                console.log("Contact already present in call entries");
                
                await UserModel.findOneAndUpdate({ phoneNbr: myNbr }, {
                    $pull: {
                        callEntries: contact._id
                    }
                });
            }

            // Push contact to call entries array
            await UserModel.findOneAndUpdate({ phoneNbr: myNbr }, {
                $addToSet: {
                    callEntries: contact._id,
                }
            });

            let updatedCallEntries = (await UserModel.findOne({ phoneNbr: myNbr }).lean()).callEntries;

            callback(await getCallEntries(updatedCallEntries));
        });
    } catch (err) {
        console.error(err);
    }
}