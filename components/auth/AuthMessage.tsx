import React from "react";
import { Card, CardDescription } from "@/components/ui/card";

type AppMessageProps = {
  type: "error" | "success" | "info" | "warning";
  message: string;
};

const messageVariants = {
  error: "bg-red-100 text-red-600",
  success: "bg-green-100 text-green-600",
  info: "bg-blue-100 text-blue-600",
  warning: "bg-yellow-100 text-yellow-600",
};

export const AuthMessage: React.FC<AppMessageProps> = ({ type, message }) => {
  return (
    <Card className="border-none">
      <CardDescription
        className={`text-sm p-4 transition-all rounded-lg ${messageVariants[type]}`}
      >
        {message}
      </CardDescription>
    </Card>
  );
};
