import clsx from "clsx";
import React from "react";

export default function Card({ className, children }) {
  return (
    <article className={clsx("card-wrapper", className)}>{children}</article>
  );
}
