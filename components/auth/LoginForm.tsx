import React, { useState, useEffect } from "react";
import { z, ZodType } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

interface PasswordOptionsProps {
  selectedCriteria: boolean;
  setSelectedCriteria: (criteria: boolean) => void;
}

interface PasswordCriteria {
  id: string;
  label: string;
  regex: RegExp;
}

const initialPasswordSchema: ZodType<string> = z
  .string({
    invalid_type_error: "Invalid password",
    required_error: "Password is required",
  })
  .min(8, "Password should have at least 8 characters")
  .refine((value): value is string => /[A-Z]/.test(value), {
    message: "Password should contain at least 1 uppercase letter",
    path: [],
  })
  .refine((value): value is string => /[a-z]/.test(value), {
    message: "Password should contain at least 1 lowercase letter",
    path: [],
  })
  .refine((value): value is string => /[0-9]/.test(value), {
    message: "Password should contain at least 1 number",
    path: [],
  })
  .refine((value): value is string => /[!@#$%^&*()]/.test(value), {
    message: "Password should contain at least 1 special character",
    path: [],
  })
  .refine((value): value is string => /.{8,}/.test(value), {
    message: "Password should be at least 8 characters long",
    path: [],
  });

const criteria: PasswordCriteria[] = [
  {
    id: "uppercase",
    label: "Uppercase Letter",
    regex: /[A-Z]/,
  },
  {
    id: "lowercase",
    label: "Lowercase Letter",
    regex: /[a-z]/,
  },
  {
    id: "number",
    label: "Number",
    regex: /[0-9]/,
  },
  {
    id: "specialCharacter",
    label: "Special Character",
    regex: /[!@#$%^&*()]/,
  },
  {
    id: "length",
    label: "At least 8 characters long",
    regex: /.{8,}/,
  },
];

export const LoginForm: React.FC<PasswordOptionsProps> = ({
  selectedCriteria,
  setSelectedCriteria
}) => {
  const [localSelectedCriteria, setLocalSelectedCriteria] = useState<string[]>(
    []
  );
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    const updatedSchema = initialPasswordSchema;
    criteria.forEach((item) => {
      if (localSelectedCriteria.includes(item.id)) {
        updatedSchema.refine(
          (value): value is string => item.regex.test(value),
          {
            message: `Password should contain ${item.label}`,
            path: [],
          }
        );
      }
    });
    // form.setResolver(zodResolver(updatedSchema));
  }, [localSelectedCriteria]);

  useEffect(() => {
    const savedCriteria = localStorage.getItem("selectedCriteria");
    setLocalSelectedCriteria(savedCriteria ? JSON.parse(savedCriteria) : []);
  }, [selectedCriteria]);

  const form = useForm({
    resolver: zodResolver(initialPasswordSchema),
  });

  const { control } = form;

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const password = useWatch({ control, name: "password" });

  const isPasswordValid = () => {
    return localSelectedCriteria.every((id) => {
      const criterion = criteria.find((item) => item.id === id);
      return criterion ? criterion.regex.test(password) : true;
    });
  };

  return (
    <Form {...form}>
      <form className="grid gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="email"
          disabled={localSelectedCriteria.length === 0}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <Input
                autoFocus
                placeholder="Input your registered email"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Input your password"
                disabled={localSelectedCriteria.length === 0}
                className={`mt-4 p-2 border rounded ${
                  isPasswordValid() ? "border-green-500" : "border-red-500"
                }`}
                // Ends update
                endContent={
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-body" />
                    ) : (
                      <Eye className="w-4 h-4 text-body" />
                    )}
                  </Button>
                }
                {...field}
              />
              {!isPasswordValid() && (
                <span className="text-red-500">
                  Password does not meet criteria
                </span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!form.formState.isDirty}
          type="submit"
          size="lg"
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
