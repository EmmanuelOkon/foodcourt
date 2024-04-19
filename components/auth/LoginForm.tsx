import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z, ZodType } from "zod";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

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
  setSelectedCriteria,
}) => {
  const [localSelectedCriteria, setLocalSelectedCriteria] = useState<string[]>(
    []
  );
  const [showPassword, setShowPassword] = React.useState(false);

  const router = useRouter();

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
    toast.success("Login successful");
    router.push("/");
  };

  const password = useWatch({ control, name: "password" });

  const isPasswordValid = () => {
    return localSelectedCriteria.every((id) => {
      const criterion = criteria.find((item) => item.id === id);
      return criterion ? criterion.regex.test(password) : true;
    });
  };

  const getPasswordStrength = (): string => {
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    const containsSpecialChar = /[!@#$%^&*()]/.test(password);
    const isOverTenChars = password?.length > 10;

    if (
      containsUppercase &&
      containsLowercase &&
      containsNumber &&
      containsSpecialChar &&
      isOverTenChars
    ) {
      return "Hard";
    } else if (containsUppercase && containsLowercase && containsSpecialChar) {
      return "Medium";
    } else {
      return "Easy";
    }
  };

  return (
    <Form {...form}>
      
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
              className={`mt-4 w-full ${
                isPasswordValid() ? "border-green-500" : "border-red-500"
              }`}
              
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

      <span className="text-sm text-gray-500">
        Password Strength: {getPasswordStrength()}
      </span>

      {getPasswordStrength() === "Hard" && (
        <div className="bg-red-500 h-4 w-4 ">hard</div>
      )}

      <Button
        disabled={!isPasswordValid()}
        type="submit"
        size="lg"
        className="w-full"
        onClick={handleSubmit}
      >
        Login
      </Button>
      
    </Form>
  );
};
