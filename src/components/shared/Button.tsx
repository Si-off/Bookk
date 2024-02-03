import { styled, keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { getStyledColor } from 'utils';
import * as S from 'styles/AdminStyledTemp';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void;
  status?: 'idle' | 'loading' | 'success' | 'error';
}
interface CssProps {
  $status?: 'idle' | 'loading' | 'success' | 'error';
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
  background-color: ${getStyledColor('primary', 900)};
  cursor: ${({ $status }) => ($status === 'loading' ? 'none' : 'pointer')};

  ${({ $status }) =>
    $status === 'loading' &&
    css<CssProps>`
      background-color: ${getStyledColor('green', 800)};
      cursor: none;
      &:hover,
      &:active {
        background-color: ${getStyledColor('green', 800)};
      }
    `}

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ $status }) =>
      $status === 'loading' ? getStyledColor('green', 800) : getStyledColor('gray', 900)};
  }
`;

const Spinner = styled(FaSpinner)`
  animation: ${spinAnimation} 1s infinite linear;
  margin-right: 12px;
`;
