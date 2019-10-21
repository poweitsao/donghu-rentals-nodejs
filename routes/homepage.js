const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //using the pug template engine
  //pug allows you to use js to dictate what is shown in html
  res.render("index", {
    title: "donghu-rentals",
    message: "Welcome to donghu-rentals!"
  });
});

module.exports = router;
