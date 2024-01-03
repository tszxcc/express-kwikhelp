const mongoose = require("mongoose");

const paymentBill = mongoose.Schema(
    {
        billId: {
            type: String,
            required: [true, "Please add a text value to the billId"],
        },
        taskId: {
            type: String,
            required: [true, "Please add a text value to the taskId"],
        },
    },
    {
        timestamps: true,
    }
);

const PaymentBill = mongoose.model("paymentBill", paymentBill);
module.exports = PaymentBill;
