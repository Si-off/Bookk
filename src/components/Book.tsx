import { styled } from 'styled-components';
import { BookInfoType } from 'types';
import { getStyledColor } from 'utils';
import pixelToRem from 'utils/pixelToRem';

const BASE_URL = process.env.REACT_APP_SERVER_URL;

interface Props extends BookInfoType {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Book = ({ title, content, images, onClick }: Props) => {
  const imageUrl = images[0]?.path;

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

const Title = styled.p`
  font-size: ${pixelToRem(16)};
  font-weight: 700;

  transition: font-size 1s;

  &::after {
    content: '';
    display: block;
    width: 30%;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    transition: border 1s ease;
    margin: 10px 0px;
  }
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

  padding: 30px 50px;

  transition: flex 1s ease, color 1s ease;
  cursor: pointer;

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
      transform: scale(1.1);
    }

    ${Title} {
      font-size: ${pixelToRem(24)};
    }

    ${Title}::after {
      border-bottom: 2px solid red;
    }

    &:before {
      transform: translate(50px, 0px);
      opacity: 1;
    }
  }
`;

const Content = styled.p`
  font-size: ${pixelToRem(14)};
  text-overflow: nowrap;
`;
