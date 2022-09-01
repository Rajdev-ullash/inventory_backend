const CreateToken = require("../../utility/CreateToken");
const bcrypt = require("bcrypt");
const UserLoginService = async (Request, DataModel) => {
  try {
    let data = await DataModel.aggregate([
      { $match: { email: Request.body.email } },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);
    if (data.length > 0) {
      let pass = await DataModel.aggregate([
        { $match: { email: Request.body.email } },
        {
          $project: {
            password: 1,
          },
        },
      ]);

      const isValidPassword = await bcrypt.compare(
        Request.body.password,
        pass[0].password
      );
      if (isValidPassword) {
        // console.log("Password Matched");
        let token = await CreateToken(data[0]["email"]);
        return { status: "Success", token: token, data: data[0] };
      } else {
        return { status: "Invalid Credentials" };
      }
    } else {
      return { status: "Invalid Credentials" };
    }
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = UserLoginService;
