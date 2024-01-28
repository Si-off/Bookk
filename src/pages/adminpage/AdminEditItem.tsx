import React, {
  useState,
  useEffect,
  ChangeEvent as ReactChangeEvent,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import * as $ from 'styles/AdminStyled';
import * as S from 'styles/LoginStyled';
import { usePatchBook, useDeleteBook, useGetBook } from 'queries';
import ImageUploader from 'components/ImageUploader';
import Button from 'components/Button';
import { ImagePatchReq } from 'types';
import { postImage, deleteImage, addImage } from 'api';

import Loader from 'components/Loader';
const BASE_URL = process.env.REACT_APP_SERVER_URL;

const AdminEditItem = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : null;
  if (numericId === null || isNaN(numericId)) {
    return <div>유효하지 않은 ID입니다.</div>;
  }

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [patchLoading, setPatchLoading] = useState(false);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<ImagePatchReq[]>([]);
  const [newImagePath, setNewImagePath] = useState<string | null>(null);
  const [originalImageId, setOriginalImageId] = useState<number | null>(null);
  const { data: book, isLoading } = useGetBook(numericId);
  const { mutate, status: patchStatus } = usePatchBook();
  const { mutate: remove, status: removeStatus } = useDeleteBook();
  useEffect(() => {
    setTitle(book?.title || '');
    setContent(book?.content || '');
    setImages(
      book?.images.map((image) => ({
        id: image.id,
        newOrder: image.order,
      })) || []
    );
    setOriginalImageId(book?.images[0]?.id || null);
  }, [book]);
  // id를 숫자로 변환
  if (isLoading || patchLoading) {
    return <Loader />;
  }
  if (!book) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }

  const handleChangeTitle = (e: ReactChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: ReactChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleSetImage = async (fileData: File | null) => {
    if (fileData) {
      const uploadedImagePath = await postImage(fileData);
      if (uploadedImagePath) {
        // 새 이미지 경로를 상태에 저장
        setNewImagePath(uploadedImagePath);
      }
    } else {
      console.log('이미지 업로드가 취소되었거나 이미지가 선택되지 않았습니다.');
    }
  };
  const handleFinalUpdate = async () => {
    try {
      setPatchLoading(true);

      if (originalImageId) {
        await deleteImage(numericId, originalImageId);
      }

      let updatedImages = [...images];
      if (newImagePath) {
        const addImageResponse = await addImage(numericId, [newImagePath]);
        if (
          addImageResponse &&
          addImageResponse.images &&
          addImageResponse.images.length > 0
        ) {
          const newId = addImageResponse.images[0].id;
          updatedImages = [{ id: newId, newOrder: 0 }];
        }
      }

      // 업데이트된 images 배열로 책 정보 업데이트
      await mutate({ id: numericId, title, content, images: updatedImages });
    } catch (error) {
      console.error('Error during the update process:', error);
      // 에러 발생 시 처리할 로직 추가 가능
    } finally {
      // 성공적으로 완료되었거나 에러가 발생했을 때 모두 실행
      setPatchLoading(false);
    }

    navigate(`/admin`);
  };

  const handleRemove = () => {
    remove(numericId);
    navigate(`/admin`);
  };

  return (
    <Layout>
      <$.Container>
        <S.Wrapper>
          <S.InputField>
            <S.Label style={{ color: 'black' }}>도서명</S.Label>
            <S.Input
              name='title'
              placeholder='Title'
              value={title}
              onChange={handleChangeTitle}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label style={{ color: 'black' }}>설명</S.Label>
            <S.Input
              name='content'
              placeholder='content'
              value={content}
              onChange={handleChangeContent}
            />
          </S.InputField>
        </S.Wrapper>
        <S.InputField $marginTop={20}>
          <S.Label style={{ color: 'black' }}>이미지</S.Label>
          {images && (
            <ImageUploader
              src={book?.images[0]?.fbPath[0]}
              onChange={(fileData) => handleSetImage(fileData)}
            />
          )}
        </S.InputField>
        <S.InputField style={{ display: 'flex', marginTop: 30, gap: 20 }}>
          <Button onClick={handleFinalUpdate} status={patchStatus}>
            수정
          </Button>
          <Button onClick={handleRemove} color='red'>
            삭제
          </Button>
        </S.InputField>
      </$.Container>
    </Layout>
  );
};

export default AdminEditItem;
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
//setImage때 postImage로 이미지 경로를 받은 뒤에 이미지 id를 일단 바꾼다. 취소 버튼을 누르면 해당 이미지를 deleteImage을 해야함
//최종 수정버튼을 누를 때 deleteImage(기존 이미지id), addImage하고 patchbook을 한다.
