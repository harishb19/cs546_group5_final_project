const {ObjectId} = require("mongodb");
const Users = require("../../models/Users");

const getUserData = async (id) => {
    const user = await Users.findOne({userId: ObjectId(id)});
    user._id = user._id.toString();
    user.userId = user.userId.toString();
    user.dateOfBirth = user.dateOfBirth.toString();


    return {userId: user.userId, firstName: user.firstName, lastName: user.lastName, gender: user.gender, dateOfBirth: user.dateOfBirth};
}

const updateUserData = async (userId, firstName, lastName, gender, dateOfBirth) => {
    const updatedInfo = await Users.updateOne(
        { userId: ObjectId(userId) },
        { $set: {
                firstName: firstName,
                lastname: lastName,
                gender: gender,
                dateOfBirth: dateOfBirth,
            }
        }
    );
    if (updatedInfo.modifiedCount === 0) throw 'Error: Could not update user';
    return userId;
}

module.exports = {
    updateUserData, getUserData
}