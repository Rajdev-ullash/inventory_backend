const UpdateService = async (Request, DataModel) => {
  try {
    let PostBody = Request.body;
    let UserEmail = Request.headers["email"];
    let id = Request.params.id;
    let data = await DataModel.updateOne(
      { _id: id, UserEmail: UserEmail },
      PostBody,
      { new: true }
    );
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = UpdateService;
