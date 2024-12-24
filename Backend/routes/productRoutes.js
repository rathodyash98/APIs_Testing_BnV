const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Autho");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router
  .route("/post/newproduct")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/get/getAllProducts").get(getAllProducts);
router
  .route("/put/updateProduct/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/get/getProductById/:id").get(getProductById);
router
  .route("/delete/deleteProduct/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);



module.exports = router;
