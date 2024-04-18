"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (formData: FieldValues) => {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: `${window.location.origin}/journal`,
        redirect: false, // Do not redirect to the callbackUrl on error
      });

      if (res && !res.ok) {
        throw new Error("Invalid email or password");
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      const errorMessage = String(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, handleLogin };
};

