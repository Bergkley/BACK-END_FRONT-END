const router = require("express").Router();

// Services router
const servicesRouter = require("./services");

router.use("/",servicesRouter);

// Parties router
const partiesRouter = require("./parties");

router.use("/",partiesRouter);

module.exports = router;