const profileModel = require("../models/credential.model.js");
const taskModel = require("../models/task.model.js");

const getUserCount = async () => {
    try {
        const count = await profileModel.countDocuments({ role: "user" });
        return count;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getHelperCount = async () => {
    try {
        const count = await profileModel.countDocuments({ role: "helper" });
        return count;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getTaskCount = async () => {
    try {
        const count = await taskModel.countDocuments();
        return count;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getTransactionCount = async () => {
    try {
        var count;
        count =
            count + (await taskModel.countDocuments({ taskStatus: "Paid" }));

        count =
            count +
            (await taskModel.countDocuments({ taskStatus: "Reviewed" }));
        return count;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getUserCount,
    getHelperCount,
    getTaskCount,
    getTransactionCount,
};
