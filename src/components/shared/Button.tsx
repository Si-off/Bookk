import { styled, keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { getStyledColor } from 'utils';
import * as S from 'styles/AdminStyledTemp';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void;
  status?: 'idle' | 'loading' | 'success' | 'error';
  $color?: string;
}
interface CssProps {
  $status?: 'idle' | 'loading' | 'success' | 'error';
  $color?: string;
}
const Button = (props: Props) => {
  const { onClick, status = 'idle', ...rest } = props;

  const handleClick = () => {
    if (status === 'loading') return;
    onClick && onClick();
  };

  return (
    <StyledButton $variant="primary" onClick={handleClick} $status={status} {...rest}>
      {status === 'loading' && <Spinner />}
      {rest.children}
    </StyledButton>
  );
};

export default Button;

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled(S.Button)<CssProps>`
  ${({ $status }) =>
    $status === 'loading' &&
    css<CssProps>`
      background-color: ${({ $color }) => $color || getStyledColor('green', 800)};
      cursor: none;
      &:hover,
      &:active {
        background-color: ${({ $color }) => $color || getStyledColor('green', 800)};
      }
    `}

  &:disabled {
    cursor: not-allowed;
  }
`;

const Spinner = styled(FaSpinner)`
  animation: ${spinAnimation} 1s infinite linear;
`;
