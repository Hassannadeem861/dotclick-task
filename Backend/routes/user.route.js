const authController = require("../controllers/user-controller");
const {
  authMiddleware,
  adminMiddleWare,
} = require("../middle_ware/auth-middle-ware");
// const authValidation = require("../validation/auth-validation");
const router = require("express").Router();

// Create a new registers
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forget-password", authController.forgetPassword);
router.get("/get-all-users", authController.findAllUsers);
router.delete("/delete-single-user/:id", authController.deleteUserById);
router.get("/get-single-user/:id", authController.getSingleUser);
router.put("/update-single-user/:id", authController.updateSingleUser);
router.post('/user/suspend/:id', authController.suspendUser);
router.post('/user/unsuspend/:id', authController.unsuspendUser);


router.get(
  "/test",
  authMiddleware,
  adminMiddleWare,
  authController.protectController
);

// user dashboard
router.get("/user/dashboard", authMiddleware, (req, res) => {
  res.status(200).send({ ok: true })
});

// admin dashboard
router.get("/admin/dashboard", authMiddleware, adminMiddleWare, (req, res) => {
  res.status(200).send({ ok: true })
});

// router.get("/user", authMiddleware, authController.user);

module.exports = router;
