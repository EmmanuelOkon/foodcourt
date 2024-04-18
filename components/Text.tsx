import clsx from "clsx";
import React from "react";

type TextProps = {
  children: React.ReactNode;
  color?: string;
  size?: string;
  weight?:
    | "font-thin"
    | "font-light"
    | "font-normal"
    | "font-medium"
    | "font-semibold"
    | "font-bold"
    | "font-extrabold"
    | "font-black";
  className?: string;
};

const Text: React.FC<TextProps> = ({
  children,
  color = "text-black",
  size = "text-base",
  weight = "font-normal",
  className = "",
}) => {
  const classes = clsx(color, size, weight, className);

  return <p className={classes}>{children}</p>;
};

export default Text;
