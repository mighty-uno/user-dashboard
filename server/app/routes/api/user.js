const router = require("express").Router();
const UserController = require("../../controllers/api/user");

router.get("/", UserController.get);
router.get("/list", UserController.getAll);
router.route("/:id").delete(UserController.delete).patch(UserController.update);

module.exports = router;
