import { useState, useEffect } from "react";
import { z, ZodType } from "zod";

interface PasswordOptionsProps {
  selectedCriteria: string[];
  onCheckboxChange: (criterionId: string, checked: boolean) => void;
}

interface PasswordCriteria {
  id: string;
  label: string;
  regex: RegExp;
}

const initialPasswordSchema = z
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

export const PasswordOptions: React.FC<PasswordOptionsProps> = ({
  selectedCriteria,
  onCheckboxChange,
}) => {
  const [localSelectedCriteria, setSelectedCriteria] = useState<string[]>(
    () => {
      const savedCriteria = localStorage.getItem("selectedCriteria");
      return savedCriteria ? JSON.parse(savedCriteria) : [];
    }
  );
  const [passwordSchema, setPasswordSchema] = useState<ZodType<string>>(
    initialPasswordSchema.refine(
      (value) => {
        return localSelectedCriteria.every((id) => {
          const criterion = criteria.find((item) => item.id === id);
          return criterion ? criterion.regex.test(value) : true;
        });
      },
      {
        message: "Password does not meet criteria",
        path: [],
      }
    )
  );

  const [password, setPassword] = useState<string>("");

  const handleCheckboxChange = (criterionId: string, checked: boolean) => {
    const updatedCriteria = checked
      ? [...localSelectedCriteria, criterionId]
      : localSelectedCriteria.filter((id) => id !== criterionId);

    console.log(updatedCriteria);

    setSelectedCriteria(updatedCriteria);
    localStorage.setItem("selectedCriteria", JSON.stringify(updatedCriteria));
    onCheckboxChange(criterionId, checked);
  };

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
    setPasswordSchema(updatedSchema);
  }, [localSelectedCriteria]);

  const isPasswordValid = () => {
   return localSelectedCriteria.every((id) => {
     const criterion = criteria.find((item) => item.id === id);
     return criterion ? criterion.regex.test(password) : true;
   });
  };

  return (
    <div className="space-y-8">
      <div className="w-fit">
        {criteria.map((item) => (
          <div
            key={item.id}
            className="flex flex-row items-start space-x-3 space-y-0"
          >
            <input
              type="checkbox"
              checked={localSelectedCriteria.includes(item.id)}
              onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
            />
            <label className="text-sm font-normal">{item.label}</label>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="mt-4 p-2 border rounded"
          style={{ borderColor: isPasswordValid() ? "green" : "red" }}
          disabled={localSelectedCriteria.length === 0}
        />
        {!isPasswordValid() && (
          <span className="text-red-500">Password does not meet criteria</span>
        )}
      </div>
    </div>
  );
};
