const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post(
  "/create",
  authMiddleware.authuser,
  upload.single("image"),
  createTask
);
router.get("/all", authMiddleware.authuser, getTasks);
router.put("/:id", authMiddleware.authuser, updateTask);
router.delete("/:id", authMiddleware.authuser, deleteTask);

module.exports = router;
