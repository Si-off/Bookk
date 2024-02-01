import styled from 'styled-components';

const NotFound = ({ search }: { search: string }) => {
  return (
    <Container>
      <H1>{search}에 대한 검색 결과가 없습니다.</H1>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  color: white;
`;
const H1 = styled.h1`
  font-weight: 700;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`;
