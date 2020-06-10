const { User } = require("../../models");

class UserController {
  get(req, res) {
    const {
      user: { email, name },
    } = req;
    res.send({ email, name });
  }

  async getAll(req, res) {
    try {
      const result = await User.find({ isActive: true })
        .select({
          password: 0,
          __v: 0,
          isActive: 0,
        })
        .lean();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  }

  async update(req, res) {
    const {
      body,
      params: { id },
    } = req;

    try {
      const result = await User.updateOne({ _id: id }, body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      await User.deleteOne({
        _id: id,
      });
      res.send({
        status: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error!");
    }
  }
}

module.exports = new UserController();
