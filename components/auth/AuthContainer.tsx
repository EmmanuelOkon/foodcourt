"use client";

import { FC, useState } from "react";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";

import { AuthFooter } from "./AuthFooter";

import { PasswordOptions } from "./PasswordOptions";
import { LoginForm } from "./LoginForm";

type AuthContainerProps = {
  children: React.ReactNode;
};

export const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const handleCheckboxChange = (criteriaId: string, checked: boolean) => {
    setSelectedCriteria((prevCriteria) =>
      checked
        ? [...prevCriteria, criteriaId]
        : prevCriteria.filter((id) => id !== criteriaId)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-hscreen">
      <div className="flex gap-4 relativ flexgrow flex-col items-center justify-center w-full md:max-w-md lg:max-w-xl max-w-full px-4 py-8 bg-white rounded-lg">
        <div className="flex items-center w-full justify-end absolut top14 right5 ">
          <Select>
            <SelectTrigger className="w- ">settings</SelectTrigger>
            <SelectContent>
              <PasswordOptions
                selectedCriteria={selectedCriteria}
                onCheckboxChange={handleCheckboxChange}
              />
            </SelectContent>
          </Select>
        </div>
        <LoginForm selectedCriteria={selectedCriteria} />
        {children}
      </div>

      <AuthFooter />
    </div>
  );
};
