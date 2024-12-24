const express = require("express");
const {
  register,
  login,
  logout,
  getAllUsers,
  getUserDetails,
  getUser,
  updateUserRole,
  deleteUser,
  
  
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Autho");

const router = express.Router();

router.route("/post/userregister").post(register);
router.route("/post/login").post(login);
router.route('/get/allusers').get(isAuthenticatedUser,authorizeRoles('admin') ,getAllUsers);


router.route("/get/logout").get(logout);
router.route("/get/userdetails").get(isAuthenticatedUser, getUserDetails);


router
  .route("/get/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/get/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUser);
router
  .route("/put/admin/updaterole/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
router
  .route("/delete/admin/deleteuser/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
