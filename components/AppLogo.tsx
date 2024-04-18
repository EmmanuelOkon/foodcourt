import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { IconLogo } from "./icons/IconLogo";


type AppLogoProps = {
  background?: "light" | "dark";
};
export const AppLogo: FC<AppLogoProps> = ({ background = "light" }) => {
  return (
    <div className="flex gap-3 items-center">
      <IconLogo />
      <span
        className={twMerge(
          `text-2xl font-bold`,
          background === "light" ? "text-body" : "text-white"
        )}
      >
        Journal
      </span>
    </div>
  );
};
