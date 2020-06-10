const router = require("express").Router();
const UserController = require("../../controllers/api/user");

router.get("/", UserController.get);
router.get("/list", UserController.getAll);
router.route("/:id").delete(UserController.delete).put(UserController.update);

module.exports = router;
