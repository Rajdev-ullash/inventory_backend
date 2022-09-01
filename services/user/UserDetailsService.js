const UserDetailsService = async (Request, DataModel) => {
  try {
    let data = await DataModel.aggregate([
      { $match: { email: Request.headers["email"] } },
    ]);
    return { status: "Success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = UserDetailsService;
