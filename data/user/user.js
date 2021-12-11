const {ObjectId} = require("mongodb");
const Users = require("../../models/Users");

const getUserData = async (userId) => {

    /*------------ Error Handling Start ------------*/

    if (!userId) throw "Error: No userId passed"
    if (!ObjectId.isValid(userId)) throw "Error: Invalid userId"

    /*------------ Error Handling End ------------*/

    const user = await Users.findOne({userId: ObjectId(userId)});

    if (!user) throw "Error: user not found";

    const returnUserObj = {
        userId: user.userId.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth
    }
    return returnUserObj;
}

const updateUserData = async (userId, firstName, lastName, gender, dateOfBirth) => {

    /*------------ Error Handling Start ------------*/

    if (!userId || !firstName || !lastName || !gender || !dateOfBirth) throw "Error: Request body empty || Error: less data passed"
    if (!ObjectId.isValid(userId)) throw "Error: Invalid userId";
    if (typeof firstName != 'string') throw "Error: firstName not of type string";
    if (typeof lastName != 'string') throw "Error: lastName not of type string";
    if (typeof gender != 'string') throw "Error: gender not of type string";
    if (!new Date(dateOfBirth)) throw "Error: dateOfBirth not of type date"

    /*------------ Error Handling End ------------*/

    const updatedInfo = await Users.updateOne(
        {userId: ObjectId(userId)},
        {
            $set: {
                firstName: firstName,
                lastname: lastName,
                gender: gender,
                dateOfBirth: dateOfBirth,
            }
        }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Error: Could not update user';
}

module.exports = {
    updateUserData, getUserData
}