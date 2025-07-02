const express = require("express");
const { auth } = require("../middlewares/auth");
const {signupUser} = require("../controllers/signupController");
const {signinUser} = require("../controllers/signinController");
const {addTodo} = require("../controllers/addTodoController");
const {getAllTodos} = require("../controllers/getAllTodosController");
const {deleteTodo} = require("../controllers/deleteTodoController");
const {updateTodo} = require("../controllers/updateTodoController");
const {checkAuth} = require("../controllers/checkAuth");
const {getUserDetails} = require("../controllers/getUserDetails");
const {todoCompleted} = require("../controllers/todoCompleted")
const {getLatestUpdate} = require("../controllers/getLatestUpdate");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/add", auth, addTodo);
router.post("/check-auth", checkAuth);
router.post("/get-user-details", auth, getUserDetails);
router.post("/todo-completed", auth, todoCompleted);

router.get("/all/:completed", auth, getAllTodos);
router.get("/recent-updates", auth, getLatestUpdate);

router.delete("/delete", auth, deleteTodo);

router.patch("/edit", auth, updateTodo);

module.exports = router;