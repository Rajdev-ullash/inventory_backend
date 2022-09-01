const OTPSModel = require("../../models/Users/OTPSModel");
const bcrypt = require("bcrypt");
const UserResetPassService = async (Request, DataModel) => {
  let hashPass = await bcrypt.hash(Request.body.password, 10);
  let email = Request.body["email"];
  let OTPCode = Request.body["OTP"];
  let NewPass = hashPass;
  let statusUpdate = 1;

  try {
    // Database First Process
    let OTPUsedCount = await OTPSModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: statusUpdate } },
      { $count: "total" },
    ]);

    if (OTPUsedCount.length > 0) {
      // Database Second Process
      let PassUpdate = await DataModel.updateOne(
        { email: email },
        { password: NewPass },
        { new: true }
      );
      return { status: "success", data: PassUpdate };
    } else {
      return { status: "fail", data: "Invalid Request" };
    }
  } catch (e) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserResetPassService;
