import React from "react";
import { useTheme } from "../context/themeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      Header
      <button onClick={toggleTheme}>Toggle</button>
    </header>
  );
}
