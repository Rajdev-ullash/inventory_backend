const UserUpdateService = async (Request, DataModel) => {
  try {
    let PostBody = Request.body;
    let data = await DataModel.updateOne(
      { email: Request.headers["email"] },
      PostBody,
      { new: true }
    );
    return { status: "Success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = UserUpdateService;
