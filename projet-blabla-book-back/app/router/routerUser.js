const { Router } = require("express");
const userController = require("../controllers/userController");
const router = Router();
const auth = require("../auth/auth"); // Middleware d'authentification
// const csrf = require("csurf");
// const csrfProtection = csrf({ cookie: true });

// Routes protégées par JWT
router.get("/", userController.allUser);
router.get("/:id", auth, userController.oneUser);
router.get("/:id/library", auth, userController.getAllBookOfUser);
router.get("/:id/wishlist", auth, userController.getUserWishlist);
router.post(
  "/wishlist/:userId/book/:bookId",
  auth,
  userController.addBookToWishlist
);
router.patch("/update/:id", auth, userController.updateUser);
router.patch(
  "/:userId/library/:bookId/status",
  auth,
  userController.updateBookState
);
// Routes publiques (pas besoin de JWT)
router.post("/signup", userController.signup);
// router.post("/signup", userController.createUser);
router.post("/login", userController.login);
// router.post("/login", userController.loginUser)
router.post("/logout/:userId", auth, userController.logoutUser);
router.delete(
  "/:userId/library/:bookId",
  auth,
  userController.deleteOneBookOfLibrary
);
router.delete(
  "/:userId/wishlist/:bookId",
  auth,
  userController.deleteBookFromWishlist
);
router.post(
  "/:id/library/:bookId",
  auth,
  userController.addBookToUser
);
router.delete(
  "/:id/library/:bookId",
  auth,
  userController.deleteOneBookOfLibrary
);
router.put(
  "/:id/library/:bookId/status",
  auth,
  userController.updateBookState
);
module.exports = router;
