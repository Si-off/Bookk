import React, { ChangeEvent as ReactChangeEvent } from 'react';
import styled from 'styled-components';
import * as S from 'styles/LoginStyled';
import * as $ from 'styles/AdminStyled';
import { usePostBook } from 'queries';
import useBookInfo from 'pages/hooks/useBookInfo';
import { TextChange } from 'typescript';
import ImageUploader from 'components/ImageUploader';
import Button from 'components/Button';

const AdminCreateItem = () => {
  const { mutate, status } = usePostBook();
  const { bookInfo, setBookInfo, resetBookInfo } = useBookInfo();

  const handleChange = (e: ReactChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'title':
        setBookInfo((prev) => ({ ...prev, title: value }));
        break;
      case 'content':
        setBookInfo((prev) => ({ ...prev, content: value }));
        break;

      default:
        break;
    }
  };

  // TODO: 유효성 검사
  const onClick = async () => {
    if (!bookInfo.title || !bookInfo.content)
      return alert('모든 내용을 채워주세요!');
    resetBookInfo();
    mutate({ ...bookInfo });
  };
  return (
    <Layout>
      <$.Header>
        <$.Title>책 등록하기</$.Title>
      </$.Header>
      <$.Container>
        <$.SubTitle>책 등록</$.SubTitle>
        <S.Wrapper>
          <$.InputField>
            <$.Label>도서명</$.Label>
            <$.Input
              name='title'
              placeholder='Title'
              value={bookInfo.title}
              onChange={handleChange}
            />
          </$.InputField>
          <$.InputField $marginTop={20}>
            <$.Label>설명</$.Label>
            <$.Input
              name='content'
              placeholder='content'
              value={bookInfo.content}
              onChange={handleChange}
            />
          </$.InputField>
          <$.InputField $marginTop={20}>
            <$.Label>이미지</$.Label>
            <ImageUploader
              src=''
              onChange={(fileData) =>
                setBookInfo((prev) => ({
                  ...prev,
                  images: fileData ? [fileData] : [],
                }))
              }
            />
          </$.InputField>
        </S.Wrapper>
        <S.Wrapper $marginTop={40}>
          <Button onClick={onClick} status={status}>
            등록
          </Button>
        </S.Wrapper>
      </$.Container>
    </Layout>
  );
};

export default AdminCreateItem;
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 1200px;
  padding: 45px;
  overflow-x: scroll;
  background-color: white;
  height: 100vh;
`;
