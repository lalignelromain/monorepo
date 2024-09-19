const { Router } = require("express");
const bookController = require("../controllers/bookController");
const router = Router();
// const auth = require("../auth/auth"); // Middleware d'authentification

// router.get("/", bookController.allBook);
router.get("/univers/:universId", bookController.getBooksByUnivers);
// router.get("/detail/:id", bookController.oneBook);
// router.get("/randomBooks", bookController.randomBooks);

router.get("/", bookController.allBook);

router.get("/detail/:id", bookController.oneBook);
router.get("/randomBooks", bookController.randomBooks);


module.exports = router;
