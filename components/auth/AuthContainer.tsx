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
  const [selectedCriteria, setSelectedCriteria] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center w-full max-h-screen">
      <div className="flex gap-4 relativ flex-grow flex-col items-center justify-center w-full md:max-w-md lg:max-w-xl max-w-full px-4 py-8 bg-white rounded-lg">
        <div>Please select your preferred password criteria here</div>
        <div className="flex items-center w-full justify-end">
          <Select>
            <SelectTrigger className="w- ">Password Settings</SelectTrigger>
            <SelectContent>
              <PasswordOptions setSelectedCriteria={setSelectedCriteria} />
            </SelectContent>
          </Select>
        </div>
        {children}
        <LoginForm
          setSelectedCriteria={setSelectedCriteria}
          selectedCriteria={selectedCriteria}
        />
      </div>

      <AuthFooter />
    </div>
  );
};
