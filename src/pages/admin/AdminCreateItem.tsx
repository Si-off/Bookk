import { ChangeEvent as ReactChangeEvent, useEffect, useState } from 'react';
import * as S from 'styles/AdminStyledTemp';
import { usePostBook } from 'queries';
import useBookInfo from 'hooks/useBookInfo';
import ImageUploader from 'components/shared/ImageUploader';
import Button from 'components/shared/Button';
import { FaBook } from 'react-icons/fa6';

const AdminCreateItem = () => {
  const { mutate, status } = usePostBook();
  const { bookInfo, setBookInfo, resetBookInfo } = useBookInfo();
  const [isInvaild, setIsInvalid] = useState(true);

  useEffect(() => {
    if (!bookInfo.images) return;
    if (
      bookInfo.title.length === 0 ||
      bookInfo.content.length === 0 ||
      bookInfo.images.length === 0
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [bookInfo, setIsInvalid]);

  const handleChange = (e: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const onClick = async () => {
    resetBookInfo();
    mutate({ ...bookInfo });
  };

  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>
            <FaBook />책 등록하기
          </S.ContainerTitle>
        </S.ContainerHeader>
        <S.Wrapper $gap={20}>
          <S.InputField>
            <S.Label>도서명</S.Label>
            <S.Input
              name="title"
              placeholder="Title"
              value={bookInfo.title}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>설명</S.Label>
            <S.Textarea
              name="content"
              placeholder="content"
              value={bookInfo.content}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>이미지</S.Label>
            <ImageUploader
              src=""
              onChange={(fileData) =>
                setBookInfo((prev) => ({
                  ...prev,
                  images: fileData ? [fileData] : [],
                }))
              }
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $marginTop={40}>
          <Button onClick={onClick} status={status} disabled={isInvaild}>
            등록
          </Button>
        </S.Wrapper>
      </S.Container>
    </S.Layout>
  );
};

export default AdminCreateItem;
