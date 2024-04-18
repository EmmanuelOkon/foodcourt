"use client";

import Link from "next/link";

export const AuthFooter = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer className="flex self-end flex-col items-center justify-center w-full h-24 mt4">
      <p className="text-sm text-grayscale-500 text-center">
        &copy; {thisYear} Journal. All Rights Reserved{" "} <br />
        <Link href="#" className="font-medium text-body block md:inline">
          Terms & Conditions
        </Link>{" "}
        <Link href="#" className="font-medium text-body block md:inline">
          Privacy Policy
        </Link>{" "}
      </p>
    </footer>
  );
};
