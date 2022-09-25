import React, { useState } from "react";
import styled from "styled-components";

interface BasicButtonProps {
  label: string;
  color: string;
  length?: string;
  textColor?: string;
  onClick?: (label: string) => void;
  currentOperation: string;
}
interface ButtonStyledProps {
  color: string;
  selected: boolean;
  length?: string;
  textColor?: string;
}

const Button = styled.button<ButtonStyledProps>`
  all: unset;
  margin: 5px;
  font-size: 20px;
  text-align: ${(props) => (props.length === "medium" ? "left" : "center")};
  padding-left: ${(props) => props.length === "medium" && "20px"};
  height: var(--button-size);
  border-radius: var(--button-size);
  cursor: pointer;
  color: ${(props) =>
    props.selected ? "var(--highlight-color)" : props.textColor || "white"};
  width: ${(props) =>
    props.length === "medium" ? "90px" : "var(--button-size)"};
  background-color: ${(props) => {
    if (props.selected) return "white";
    switch (props.color) {
      case "dark":
        return "var(--dark-color)";
      case "light":
        return "var(--light-color)";
      case "highlight":
        return "var(--highlight-color)";
      case "white":
        return "white";
      default:
        return "var(--dark-color)";
    }
  }};
  transition: background-color 0.35s;
`;

const BasicButton: React.FC<BasicButtonProps> = ({
  currentOperation,
  label,
  color,
  length,
  textColor,
  onClick,
}) => {
  const [passedColor, setPassedColor] = useState(color);
  const handleClick = () => {
    onClick && onClick(label);
    if (label === currentOperation) return;
    if (label === "+/-" || label === "%" || label === "AC" || label === "C") {
      setPassedColor("white");
      setTimeout(() => {
        setPassedColor(color);
      }, 150);
      return;
    }
    setPassedColor("light");
    setTimeout(() => {
      setPassedColor(color);
    }, 150);
  };
  return (
    <Button
      color={passedColor}
      length={length}
      textColor={textColor}
      onClick={handleClick}
      selected={label === currentOperation}
    >
      {label}
    </Button>
  );
};

export default BasicButton;
