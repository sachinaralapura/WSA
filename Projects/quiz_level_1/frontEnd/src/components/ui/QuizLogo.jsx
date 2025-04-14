import React from "react";
import { Logo } from "../../assets";
const allSizes = {
  small: 168,
  large: 306,
};
function QuizLogo({ size = "small" }) {
  return <img src={Logo} alt="Logo" width={allSizes[size]} />;
}

export default QuizLogo;
