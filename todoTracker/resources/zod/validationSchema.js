const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username must be less than 20 characters"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

module.exports = { signupSchema, signinSchema };
