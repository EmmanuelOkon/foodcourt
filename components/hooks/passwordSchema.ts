import { z, ZodType } from "zod";

// Define the criteria array
const criteria = [
  {
    id: "uppercase",
    label: "At least 1 uppercase",
    regex: /[A-Z]/,
  },
  {
    id: "lowercase",
    label: "At least 1 lowercase",
    regex: /[a-z]/,
  },
  {
    id: "figure",
    label: "At least 1 figure",
    regex: /[0-9]/,
  },
  {
    id: "character",
    label: "At least 1 special character",
    regex: /[!@#$%^&*()]/,
  },
  {
    id: "length",
    label: "At least 8 characters long",
    regex: /.{8,}/,
  },
] as const;

// Build initialPasswordSchema based on criteria
let initialPasswordSchema = z.string({
  invalid_type_error: "Invalid password",
  required_error: "Password is required",
}).min(8, "Password should have at least 8 characters");

criteria.forEach((item) => {
  switch (item.id) {
    case "uppercase":
      initialPasswordSchema = initialPasswordSchema.regex(
        item.regex,
        item.label
      );
      break;
    case "lowercase":
      initialPasswordSchema = initialPasswordSchema.regex(
        item.regex,
        item.label
      );
      break;
    case "figure":
      initialPasswordSchema = initialPasswordSchema.regex(
        item.regex,
        item.label
      );
      break;
    case "character":
      initialPasswordSchema = initialPasswordSchema.regex(
        item.regex,
        item.label
      );
      break;
    case "length":
      initialPasswordSchema = initialPasswordSchema.min(8, item.label);
      break;
    default:
      break;
  }
});

export const initialPasswordSchemaTyped: ZodType<string> = initialPasswordSchema;
