import React, { useMemo } from "react";
import clsx from "clsx";
export default function Button({
  children,
  disabled,
  icon,
  iconPosition,
  loading,
  loadingText = "Loading...",
  onClick,
  size,
}) {
  const buttonClass = useMemo(() => {
    return clsx("btn", "hover", size, { loading });
  }, [size, loading]);
  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? loadingText : children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
