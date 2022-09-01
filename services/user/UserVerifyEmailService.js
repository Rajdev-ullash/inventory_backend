const OTPSModel = require("../../models/Users/OTPSModel");
const SendEmailUtility = require("../../utility/SendEmailUtility");

const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    //file: UserVerifyEmailService.js ~ line 8 ~ UserVerifyEmailService ~ query,Email account query;
    let email = Request.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let UserCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    if (UserCount.length > 0) {
      //OTP Insert
      await OTPSModel.create({ email: email, otp: OTPCode });
      let sendEmail = await SendEmailUtility(
        email,
        "your pin code is: " + OTPCode,
        "Inventory Management"
      );
      return { status: "Success", data: "OTP sent to your email" };
    } else {
      return { status: "fail", data: "User not found" };
    }
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = UserVerifyEmailService;
