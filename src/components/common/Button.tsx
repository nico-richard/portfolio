import React, { ReactNode, useState } from "react";
import styled, { keyframes } from "styled-components";

interface NRButtonProps {
  label: string;
  onClick?: () => void;
  as?: "link" | "button";
  href?: string;
  download?: boolean;
  icon?: ReactNode;
}

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.2);
  }
  66% {
    transform: scale(0.8);
  }
  810% {
    transform: scale(1);
  }
`;

const NRButtonContainer = styled.section`
  button,
  a {
    padding: 15px 20px;
    margin: 0.5rem;
    display: inline-block;
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.headerBackground};
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.headerBackgroundHover};
    }
    &.clicked {
      animation: ${pulseAnimation} 0.4s ease-in-out;
    }
  }
`;

const NRButton = ({
  label,
  onClick,
  as = "button",
  href,
  download,
  icon,
}: NRButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick && onClick();

    // Supprime la classe après une courte période pour que l'animation se déroule
    setTimeout(() => {
      setIsClicked(false);
    }, 500);
  };

  return (
    <NRButtonContainer>
      {as === "link" ? (
        <a
          href={href}
          onClick={handleClick}
          className={isClicked ? "clicked" : ""}
          download={download && href}
        >
          {label} {icon}
        </a>
      ) : (
        <button onClick={handleClick} className={isClicked ? "clicked" : ""}>
          {label} {icon}
        </button>
      )}
    </NRButtonContainer>
  );
};

export default NRButton;
