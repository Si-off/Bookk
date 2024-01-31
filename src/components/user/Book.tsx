import { forwardRef, useEffect, useState } from 'react';
import { css, keyframes, styled } from 'styled-components';
import { BookInfoType } from 'types';
import { getStyledColor } from 'utils';
import pixelToRem from 'utils/pixelToRem';
interface Props extends BookInfoType {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Book = (
  { title, images, onClick }: Props,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) => {
  const [isShow, setIsShow] = useState(false);
  const imageUrl = images && images.length > 0 ? images[0]?.fbPath[0] : null;

  useEffect(() => {
    setIsShow(true);
  }, []);

  return (
    <Container ref={forwardedRef} $isShow={isShow}>
      <Inner onClick={onClick}>
        {imageUrl && <Image src={imageUrl} />}
        <Title>{title}</Title>
      </Inner>
    </Container>
  );
};

export default forwardRef(Book);

const Effect = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  } 
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Title = styled.p`
  font-size: ${pixelToRem(16)};
  font-weight: 500;
  margin-top: 20px;
  position: relative;
`;

const Image = styled.img`
  width: ${pixelToRem(200)};
  height: ${pixelToRem(300)};
  border-radius: 4px;
  object-fit: cover;
  box-shadow:
    0px 5px 5px 0px rgba(0, 0, 0, 0.2),
    0px 3px 14px 0px rgba(0, 0, 0, 0.12),
    0px 8px 10px 0px rgba(0, 0, 0, 0.14);
`;

const Container = styled.div<{ $isShow: boolean }>`
  align-items: center;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  color: ${getStyledColor('white', 'high')};
  opacity: 0;
  ${({ $isShow }) =>
    $isShow &&
    css`
      animation: ${Effect} 0.25s ease-in-out forwards;
    `};
`;

const Inner = styled.div`
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    padding-bottom: 15px;
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
