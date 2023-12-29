const { z } = require("zod");

const signUpSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must of Minimum 3 characters" })
    .max(20, { message: "Name must of Maximum 20 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must of Minimum 3 characters" })
    .max(50, { message: "Email must of Maximum 50 characters" }),
  phone: z
    .string({ required_error: "Phone Number is required" })
    .trim()
    .min(10, { message: "Phone Number must of Minimum 10 characters" })
    .max(20, { message: "Phone Number must of Maximum 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must of Minimum 8 characters" })
    .max(2000, { message: "Password must of Maximum 2000 characters" }),
});

const logInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must of Minimum 3 characters" })
    .max(50, { message: "Email must of Maximum 50 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must of Minimum 8 characters" })
    .max(2000, { message: "Password must of Maximum 2000 characters" }),
});

module.exports = {signUpSchema,logInSchema};