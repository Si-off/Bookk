import { styled } from "styled-components";
import { BookInfoType } from "types";
import { getStyledColor } from "utils";
import pixelToRem from "utils/pixelToRem";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

interface Props extends BookInfoType {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Book = ({ title, content, images, onClick }: Props) => {
  const imageUrl = images[0]?.path;

  return (
    <Container onClick={onClick}>
      <Wrap>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </Wrap>
      {images && <Image src={`${BASE_URL}${imageUrl}`} />}
    </Container>
  );
};

export default Book;

const Title = styled.p`
  font-size: ${pixelToRem(24)};
  font-weight: 700;
  &::after {
    content: "";
    display: block;
    width: 30%;
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    transition: border 1s ease;
    margin-top: 10px;
  }
`;

const Image = styled.img`
  width: 150px;
  object-fit: cover;
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  user-select: none;
  z-index: 2;
  color: ${getStyledColor("gray", 900)};
  width: 100%;
  height: 300px;
  padding: 10px 20px;

  transition: flex 1s ease, color 1s ease;

  ${Image} {
    opacity: 0.5;
    filter: saturate(0.7);
    transition: opacity 1s, filter 1s;
  }

  &:before {
    content: "";
    display: block;
    width: 80%;
    height: 95%;
    position: absolute;
    background: #444;
    top: 0px;
    left: -50px;
    opacity: 0;
    transition: opacity 1s, transform 1s;
  }
  &:hover {
    color: ${getStyledColor("gray", 400)};

    ${Title}::after {
      border-bottom: 2px solid red;
    }

    ${Image} {
      opacity: 1;
      filter: saturate(1);
    }

    &:before {
      transform: translate(50px, 0px);
      opacity: 1;
    }
  }
`;

const Wrap = styled.div`
  flex: 1;
  z-index: 1;
  height: 300px;
`;

const Content = styled.p`
  font-size: ${pixelToRem(14)};
  text-overflow: nowrap;
`;
