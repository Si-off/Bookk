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
    <Containe>
      <Inner>
        {images && <Image src={`${BASE_URL}${imageUrl}`} />}
        <Title>{title}</Title>
      </Inner>
    </Containe>
  );
};

export default Book;

const Title = styled.p`
  font-size: ${pixelToRem(16)};
  font-weight: 500;
  margin-top: 20px;
  position: relative;
  }
`;

const Image = styled.img`
  width: 200px;
  border-radius: 4px;
  object-fit: cover;
`;

const Containe = styled.div`
  align-items: center;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  color: white;
`;

const Inner = styled.div`
  &:after {
    content: '';
    display: block;
    padding-bottom: 15px;
    border-bottom: 1px solid;
    transform: scaleX(0);
    transform-origin: 0% 50%;
    transition: transform 250ms ease-in-out;
    color: #fd697b;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: 0% 50%;
  }
`;
