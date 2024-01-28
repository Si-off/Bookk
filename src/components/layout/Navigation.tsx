import styled from 'styled-components';
import NavigationItem from './NavigationItem';
import { useNavigate } from 'react-router-dom';
import { getStyledColor } from 'utils';

const Navigation = () => {
  const navigate = useNavigate();

  const logoClick = () => {
    navigate('/');
  };

  return (
    <NavigationWrapper>
      <Logo>
        <Title onClick={logoClick}>BOOKK</Title>
      </Logo>
      <NavigationItem />
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 0 16px;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('black', 1000)};
  }
`;
const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  img {
    height: 48px;
    object-fit: contain;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 32px;

  &:after {
    content: '';
    display: block;
    border-bottom: 1px solid;
    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 250ms ease-in-out;
    color: ${getStyledColor('primary', 200)};
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;
