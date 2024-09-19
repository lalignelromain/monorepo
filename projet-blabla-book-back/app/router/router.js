const { Router } = require("express");
const routerBook = require("./routerBook");

const routerUser = require("./routerUser");

const router = Router();

router.use("/book", routerBook);
router.use("/user", routerUser);

module.exports = router;
