const CreateService = async (Request, DataModel) => {
  try {
    let PostBody = Request.body;
    PostBody.email = Request.headers["email"];
    let data = await DataModel.create(PostBody);
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};
module.exports = CreateService;
