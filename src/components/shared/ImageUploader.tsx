import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { styled } from 'styled-components';
import { FaFileExcel, FaFileCirclePlus } from 'react-icons/fa6';
import ImagePreview from './ImagePreview';
import { pixelToRem, getStyledColor } from 'utils';

export type ImageUploaderImperativeHandle = {
  handleCancel: () => void;
};
interface Props {
  src: string;
  onChange: (file: File | null) => void;
}

const ImageUploader = (
  { onChange, src = '' }: Props,
  forwardedRef?: React.ForwardedRef<ImageUploaderImperativeHandle>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(src);
  const [fileData, setFileData] = useState<{
    name: string;
    type: string;
    size: string;
  } | null>(null);

  // 프리뷰 이미지 변경
  const previewChange = (imageFile: File) => {
    if (!imageFile) {
      setPreviewUrl('');
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
  };

  // 데이터 단위 변환
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 KB';
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // input value 초기화
  const handleCancel = async () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setPreviewUrl('');
    setFileData(null);
    onChange(null);
  };

  useImperativeHandle(forwardedRef, () => ({
    handleCancel: () => handleCancel(),
  }));

  // input data onChange
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files == null) return;
    const imageFile = files[0];

    if (!imageFile) return;
    onChange(imageFile);
    previewChange(imageFile);
    const { name, size } = imageFile;
    let newName = '';
    let newType = '';

    const newSize = formatBytes(size);
    const lastDotIndex = name.lastIndexOf('.');

    if (lastDotIndex !== -1) {
      newName = name.substring(0, lastDotIndex);
      newType = name.substring(lastDotIndex + 1);
    }

    setFileData({ name: newName, type: newType, size: newSize });
  };

  return (
    <ImagePreview src={previewUrl}>
      <Container>
        <Label htmlFor="fileInput">
          {fileData !== null ? (
            <>
              <Wrap>
                <Name>{fileData.name}</Name>
                <Type>{fileData.type}</Type>
              </Wrap>
              <Size>{fileData.size}</Size>
            </>
          ) : (
            <Upload>
              <FaFileCirclePlus />
              파일 업로드하기
            </Upload>
          )}
          <Input
            id="fileInput"
            type="file"
            ref={inputRef}
            onChange={handleOnChange}
            accept="image/jpg, image/jpeg, image/png"
          />
        </Label>
        {fileData !== null && <Cancle onClick={handleCancel} />}
      </Container>
    </ImagePreview>
  );
};

export default forwardRef(ImageUploader);

const Upload = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${pixelToRem(14)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cancle = styled(FaFileExcel)`
  align-self: flex-end;
  cursor: pointer;
  transition: color 0.15s ease;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('red', 900)};
  }
  &:active {
    color: ${getStyledColor('red', 1000)};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  display: none;
`;

const Name = styled.div`
  font-weight: 500;
  font-size: ${pixelToRem(14)};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Size = styled.div`
  color: ${getStyledColor('cool_gray', 700)};
  font-size: ${pixelToRem(12)};
`;

const Type = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  padding: 0px 2px;
  font-size: ${pixelToRem(11)};
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 2px;
  color: ${getStyledColor('cool_gray', 900)};
  background-color: ${getStyledColor('cool_gray', 400)};
`;
