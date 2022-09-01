const bcrypt = require("bcrypt");
const UserCreateService = async (Request, DataModel) => {
  try {
    Request.body.password = await bcrypt.hash(Request.body.password, 10);
    let PostBody = Request.body;
    let data = await DataModel.create(PostBody);
    return { status: "Success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = UserCreateService;
