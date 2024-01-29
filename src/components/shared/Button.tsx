import { styled, keyframes, css } from "styled-components";
import { FaSpinner } from "react-icons/fa";
import { getStyledColor } from "utils";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  $status?: "idle" | "loading";
  $color?: any;
}
interface CssProps {
  $status?: "idle" | "loading";
  $color?: any;
}
const Button = (props: any) => {
  const { children, onClick, status = "idle", color = "blue", ...rest } = props;

  const handleClick = () => {
    if (status === "loading") return;
    onClick();
  };

  return (
    <StyledButton
      onClick={handleClick}
      $status={status}
      $color={color}
      {...rest}
    >
      {status === "loading" && <Spinner />}
      {children}
    </StyledButton>
  );
};

export default Button;

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button<Props>`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  font-weight: 500;
  color: #fff;

  background-color: ${({ $color }) => $color && getStyledColor($color, 800)};
  &:hover {
    background-color: ${({ $color }) => $color && getStyledColor($color, 900)};
  }
  &:active {
    background-color: ${({ $color }) => $color && getStyledColor($color, 1000)};
  }

  ${({ $status }) =>
    $status === "loading" &&
    css<CssProps>`
      background-color: ${({ $color }) =>
        $color && getStyledColor("green", 800)};
      cursor: none;
      &:hover,
      &:active {
        background-color: ${({ $color }) =>
          $color && getStyledColor("green", 800)};
      }
    `}
`;

const Spinner = styled(FaSpinner)`
  animation: ${spinAnimation} 1s infinite linear;
`;
