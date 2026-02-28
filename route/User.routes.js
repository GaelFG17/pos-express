const { UserController } = require("../controller/User.controller");

const router = require("express").Router();
const controller = new UserController();

router.post("/", controller.create.bind(controller));


//TODO: Implementar el middleware de auth en los endpoint siguientes
router.get("/", controller.read.bind(controller));
router.get("/:id", controller.findById.bind(controller));
router.get("/username/:usuario", controller.findByUsuario.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.patch("/:id/password", controller.updatePassword.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
router.get("/:id/activo", controller.verificarActivo.bind(controller));

module.exports = router;