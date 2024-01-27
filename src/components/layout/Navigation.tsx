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
        <h3 onClick={logoClick}>BOOKK</h3>
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
  background-color: ${getStyledColor('cool_gray', 1200)};
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
