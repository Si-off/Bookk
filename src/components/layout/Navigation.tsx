import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';
import { useNavigate } from 'react-router-dom';
import { getStyledColor } from 'utils';

const HEIGHT = 56;

const Navigation = () => {
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < HEIGHT * 2);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const logoClick = () => {
    navigate('/');
  };

  return (
    <NavigationWrapper $isVisible={isVisible} $height={HEIGHT}>
      <Logo>
        <Title onClick={logoClick}>BOOKK</Title>
      </Logo>
      <NavigationItem />
    </NavigationWrapper>
  );
};

export default Navigation;

const NavigationWrapper = styled.div<{ $isVisible: boolean; $height: number }>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${({ $height }) => $height && `${$height}px`};
  padding-left: 30px;
  padding-right: 10%;
  transition: top 0.2s ease-in-out, opacity 0.2s ease-in-out;
  top: ${({ $isVisible, $height }) => ($isVisible ? '0' : `-${$height}px`)};
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  background-color: ${getStyledColor('black', 1000)};
  z-index: 2;
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
