import { useEffect, useState } from 'react';
import { keyframes, styled } from 'styled-components';
import { BookInfoType } from 'types';
import { getStyledColor } from 'utils';
import pixelToRem from 'utils/pixelToRem';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

interface Props extends BookInfoType {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Book = ({ title, content, images, onClick }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const imageUrl = images[0]?.path;

  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <Container onClick={onClick}>
      <Inner>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Inner>
      {images && <Image src={`${BASE_URL}${imageUrl}`} />}
    </Container>
  );
};

export default Book;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Title = styled.p`
  font-size: ${pixelToRem(16)};
  font-weight: 500;
  transition: font-size 1s;

  &::after {
    content: '';
    display: block;
    width: 40%;
    border-bottom: 2px solid ${getStyledColor('indigo', 1000)};
    transition: border 1s ease;
    margin: 30px 0px;
  }
`;

const Content = styled.p`
  width: 60%;
  font-size: ${pixelToRem(14)};
  font-weight: 300;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Image = styled.img`
  width: 150px;
  border-radius: 4px;
  object-fit: cover;
  opacity: 0.5;
  filter: saturate(0.7);
  transition: opacity 1s, filter 1s, transform 1s;
  transform-origin: left center;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
`;

const Container = styled.div`
  position: relative;
  height: 500px;
  user-select: none;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  color: ${getStyledColor('gray', 900)};
  flex: 1;

  transition: flex 1s ease, color 1s ease;
  cursor: pointer;
  animation: ${fadeIn} 0.3s ease forwards;

  &:before {
    content: '';
    display: block;
    width: 80%;
    height: 95%;
    position: absolute;
    background: ${getStyledColor('cool_gray', 1100)};
    top: 0px;
    left: -50px;
    opacity: 0;
    transition: opacity 1s, transform 1s;
    border-radius: 4px;
  }
  &:hover {
    color: ${getStyledColor('gray', 400)};
    flex: 1.5;

    ${Image} {
      opacity: 1;
      filter: saturate(1);
      transform: scale(1.2);
    }

    ${Title} {
      font-size: ${pixelToRem(24)};
    }

    ${Title}::after {
      border-bottom: 2px solid ${getStyledColor('indigo', 600)};
    }

    &:before {
      transform: translate(50px, 0px);
      opacity: 0.7;
    }
  }
`;
