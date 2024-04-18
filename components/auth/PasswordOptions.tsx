import { useState, useEffect } from "react";
import { z, ZodType } from "zod";

interface PasswordOptionsProps {
  setSelectedCriteria: (criteria: boolean) => void;
}

interface PasswordCriteria {
  id: string;
  label: string;
  regex: RegExp;
}

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
  setSelectedCriteria
}) => {
  const [localSelectedCriteria, setLocalSelectedCriteria] = useState<string[]>(
    () => {
      const savedCriteria = localStorage.getItem("selectedCriteria");
      return savedCriteria ? JSON.parse(savedCriteria) : [];
    }
  );


  const handleCheckboxChange = (criterionId: string, checked: boolean) => {
    const updatedCriteria = checked
      ? [...localSelectedCriteria, criterionId]
      : localSelectedCriteria.filter((id) => id !== criterionId);

    console.log(updatedCriteria);

    setLocalSelectedCriteria(updatedCriteria);
    localStorage.setItem("selectedCriteria", JSON.stringify(updatedCriteria));
    setSelectedCriteria(checked);
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
    </div>
  );
};
