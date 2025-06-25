const { UserModel } = require("../models/user");
const { signupSchema } = require("../resources/zod/validationSchema");
const bcrypt = require("bcrypt");

const saltRounds = 5;

async function signupUser(req, res) {
  const userData = signupSchema.safeParse(req.body);

  const errors = {};
  if (!userData.data) {
    userData.error.errors.forEach((e) => {
      errors[e.path[0]] = e.message;
    });

    return res.status(400).json({ errors });
    
  }

  const { username, email, password } = userData.data;


  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
      
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({ msg: `New user with the username ${newUser.username} created` });
    
  } catch (err) {
    return res.status(500).json({ error: "Error occured, cannot create account. Try again." });
  }
}

module.exports = { signupUser };
