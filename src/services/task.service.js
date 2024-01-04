const axios = require("axios");

const taskModel = require("../models/task.model.js");
const taskRequestModel = require("../models/taskRequest.model.js");
const paymentBillModel = require("../models/paymentBill.model.js");

const createTask = async (body, username) => {
    try {
        const task = await taskModel.create({
            ...body.taskData,
            username: username,
        });
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getAllTasks = async () => {
    try {
        const tasks = await taskModel.find();
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getUserTasks = async (username) => {
    try {
        const tasks = await taskModel.find({ username: username });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getHelperTasks = async (username) => {
    try {
        const tasks = await taskModel.find({ helper: username });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getUserRequests = async (username) => {
    try {
        const tasks = await taskRequestModel.find({
            username: username,
            requestStatus: "Pending",
        });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getHelperRequests = async (username) => {
    try {
        const tasks = await taskRequestModel.find({ helper: username });
        return tasks;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const getTaskById = async (id) => {
    try {
        const task = await taskModel.findById({ _id: id });
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const requestTask = async (id, username, helper) => {
    try {
        const taskRequest = await taskRequestModel.create({
            taskID: id,
            username: username,
            helper: helper,
        });
        return taskRequest;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const acceptTask = async (taskId, username, helper) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, username: username, taskStatus: "Open" },
            { helper: helper, taskStatus: "Accepted" }
        );

        const taskRequest = await taskRequestModel.findOneAndUpdate(
            { taskID: taskId, username: username, helper: helper },
            { requestStatus: "Accepted" }
        );

        // remove else
        const taskRequestRemoved = await taskRequestModel.deleteMany({
            taskID: taskId,
            username: username,
            requestStatus: "Pending",
        });

        return { task, taskRequest, taskRequestRemoved };
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const completeTask = async (id, helper) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, helper: helper },
            { taskStatus: "Completed" }
        );
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const confirmTask = async (id, username) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, username: username },
            { taskStatus: "Confirmed" }
        );
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const createBill = async (taskId, username, amount) => {
    const billPlzUrl = "https://www.billplz-sandbox.com/api/v3/bills";
    const auth = {
        username: process.env.BILLPLZ_API_KEY,
        password: "x",
    };
    const params = {
        collection_id: "fvrj_sjj",
        description: "Payment for task " + taskId,
        name: username,
        email: username + "@test.com",
        amount: amount * 100,
        callback_url: "https://kwikhelp.bryanc12.net/api/task/callback",
        redirect_url: "https://kwikhelp.bryanc12.net/taskhistory",
    };

    try {
        const billResponse = await axios.post(billPlzUrl, null, {
            auth: auth,
            params: params,
        });

        if (billResponse.status !== 200) {
            return { error: true, message: "Billplz error" };
        }

        try {
            const paymentBill = await paymentBillModel.create({
                billId: billResponse.data.id,
                taskId: taskId,
            });
        } catch (error) {
            return { error: true, message: error.message };
        }

        return billResponse.data.id;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const attemptPayTask = async (taskId, username, amount) => {
    try {
        const billId = await createBill(taskId, username, amount);
        return billId;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const callback = async (billId) => {
    try {
        const paymentBill = await paymentBillModel.findOne({
            billId: billId,
        });

        const task = await taskModel.findOneAndUpdate(
            { _id: paymentBill.taskId },
            { taskStatus: "Paid" }
        );

        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const reviewTask = async (id, username, rate) => {
    try {
        const task = await taskModel.findOneAndUpdate(
            { _id: id, username: username, taskStatus: "Paid" },
            { taskStatus: "Reviewed", review: rate }
        );
        return task;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

const deleteTaskById = async (id, username) => {
    try {
        const task = await taskModel.findOneAndDelete({
            _id: id,
            username: username,
            taskStatus: "Open",
        });

        const taskRequest = await taskRequestModel.deleteMany({
            taskID: id,
            username: username,
        });
        return { task, taskRequest };
    } catch (error) {
        return { error: true, message: error.message };
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getUserTasks,
    getHelperTasks,
    getUserRequests,
    getHelperRequests,
    getTaskById,
    requestTask,
    acceptTask,
    completeTask,
    confirmTask,
    attemptPayTask,
    callback,
    reviewTask,
    deleteTaskById,
};
