const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(10, "Username must be less than 10 characters"),
    email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(1, "Email is required")
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});

const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min(1, "Email is required")
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long"),
});

module.exports = { signupSchema, signinSchema };
