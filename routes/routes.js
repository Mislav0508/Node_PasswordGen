const { Router } = require("express")
const router = Router()
const authController = require("../controllers/authController")
const {requireAuth,checkUser} = require("../middleware/authMiddleware")

router.get("/", authController.home_get)
router.get("*", checkUser)
router.get("/avatar", requireAuth, authController.avatar_get)
router.get("/signup", authController.signup_get)
router.post("/signup", authController.signup_post)
router.get("/login", authController.login_get)
router.post("/login", authController.login_post)
router.get("/logout", authController.logout_get)
router.get("/passwords", requireAuth, authController.passwords_get)

module.exports = router