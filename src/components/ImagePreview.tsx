import { styled } from "styled-components";
import { pixelToRem, getStyledColor } from "utils";

interface Props {
  children?: React.ReactNode;
  src: string;
}

const ImagePreview = ({ children, src = "", ...rest }: Props) => {
  if (src === "" || src === null)
    return (
      <Container>
        <Skeleton />
        <Wrapper>{children}</Wrapper>
      </Container>
    );

  return (
    <Container>
      <Image src={src} {...rest} alt="preview" />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default ImagePreview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  max-width: ${pixelToRem(300)};
  overflow: hidden;
  box-shadow: 0px 1px 4px 0px ${getStyledColor("cool_gray", 300)};
`;

const Image = styled.img`
  height: ${pixelToRem(165)};
  background-color: ${getStyledColor("cool_gray", 400)};
  object-fit: scale-down;
`;

const Skeleton = styled.div`
  height: ${pixelToRem(165)};
  background-color: ${getStyledColor("cool_gray", 400)};
`;

const Wrapper = styled.div`
  padding: 16px;
`;
