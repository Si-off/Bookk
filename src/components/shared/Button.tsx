import { styled, keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { getStyledColor } from 'utils';
import * as S from 'styles/AdminStyledTemp';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  $status?: 'idle' | 'loading';
  $color?: any;
}
interface CssProps {
  $status?: 'idle' | 'loading';
  $color?: any;
}
const Button = (props: any) => {
  const { children, onClick, status = 'idle', ...rest } = props;

  const handleClick = () => {
    if (status === 'loading') return;
    onClick();
  };

  return (
    <StyledButton variant='primary' onClick={handleClick} $status={status} {...rest}>
      {status === 'loading' && <Spinner />}
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

const StyledButton = styled(S.Button)<Props>`
  ${({ $status }) =>
    $status === 'loading' &&
    css<CssProps>`
      background-color: ${({ $color }) => $color && getStyledColor('green', 800)};
      cursor: none;
      &:hover,
      &:active {
        background-color: ${({ $color }) => $color && getStyledColor('green', 800)};
      }
    `}
`;

const Spinner = styled(FaSpinner)`
  animation: ${spinAnimation} 1s infinite linear;
`;
