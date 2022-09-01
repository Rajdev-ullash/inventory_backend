const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdDate: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const OTPSModel = mongoose.model("otp", OTPSchema);
module.exports = OTPSModel;
