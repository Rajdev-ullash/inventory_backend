const DropDownService = async (Request, DataModel, Projection) => {
  try {
    let UserEmail = Request.headers["email"];
    let data = await DataModel.aggregate([
      { $match: { UserEmail: UserEmail } },
      { $project: Projection },
    ]);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = DropDownService;
