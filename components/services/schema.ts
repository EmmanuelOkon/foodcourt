import { z } from "zod";

export const PASSWORD_CRITERIA = z.object({
  uppercase: z.boolean(),
  lowercase: z.boolean(),
  figure: z.boolean(),
  character: z.boolean(),
  length: z.boolean(),
});

export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;

export const loginFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Please provide a valid email address",
      required_error: "Email is required",
    })
    .email(),
  password: z
    .string({
      invalid_type_error: "Please provide a valid password",
      required_error: "Password is required",
    })
    .min(8, "Password should have at least 8 characters"),
  rememberMe: z
    .boolean({
      invalid_type_error: "Please provide a valid value",
    })
    .optional(),
});


export type LoginFormValues = z.infer<typeof loginFormSchema>;
