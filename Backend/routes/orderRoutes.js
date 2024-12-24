const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Autho");
const {
  newOrder,
  getSingleOrder,
  getAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/post/order/new").post(isAuthenticatedUser, newOrder);
router.route("/get/order/:id").get(isAuthenticatedUser, getSingleOrder);
router
  .route("/get/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

module.exports = router;
