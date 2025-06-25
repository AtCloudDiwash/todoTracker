const express = require("express");
const { auth } = require("../middlewares/auth");
const {signupUser} = require("../controllers/signupController");
const {signinUser} = require("../controllers/signinController");
const {addTodo} = require("../controllers/addTodoController");
const {getAllTodos} = require("../controllers/getAllTodosController");
const {deleteTodo} = require("../controllers/deleteTodoController");
const {updateTodo} = require("../controllers/updateTodoController");
const {checkAuth} = require("../controllers/checkAuth");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/add", auth, addTodo);
router.post("/check-auth", checkAuth);

router.get("/all", auth, getAllTodos);


router.delete("/delete", auth, deleteTodo);

router.patch("/edit", auth, updateTodo);

module.exports = router;