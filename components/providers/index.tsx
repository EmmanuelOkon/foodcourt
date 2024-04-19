"use client";

import NextTopLoader from "nextjs-toploader";
import React from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader height={2} color="#27A376" showSpinner />
      {children}
      <Toaster richColors className="text-center" position="bottom-center" />
    </>
  );
};
