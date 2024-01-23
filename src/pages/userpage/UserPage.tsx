import { useCallback, useState } from 'react';
import Slider from 'react-slick';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getStyledColor } from 'utils';
import { useUserStore } from 'store/useUserStore';
import Book from './component/Book';
import { useGetBooks } from 'queries';

const UserPage = () => {
  const user = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const { data: books, status } = useGetBooks({ take: 10, page: currentPage });

  const handlePatch = () => {};

  const handleBeforeChange = useCallback((_: any, index: number) => {
    console.log(index);
    setIsDragging(true);
  }, []);

  const handleAfterChnage = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClickItem = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.stopPropagation();
      return;
    }
    console.log('click');
  };

  const SliderSettings = {
    dots: false,
    arrows: false,
    focusOnSelect: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 300,
    infinite: false,
    draggable: true,
    touchThreshold: 100,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChnage,
  };

  return (
    <Wrap>
      <Header>
        {user.user ? (
          <>
            <Name>{user.user.nickname}</Name>
            {/* 로그인 후 전역상태관리 User 체크 후에 수정 예정 */}
          </>
        ) : (
          <>
            <StyledLink to='/login'>로그인</StyledLink>
            <StyledLink to='/signup'>회원가입</StyledLink>
          </>
        )}
      </Header>
      <Main>
        <StyledSlider {...SliderSettings}>
          {status === 'success' &&
            books.data.map((book) => {
              return <Book key={book.id} onClick={handleClickItem} {...book} />;
            })}
        </StyledSlider>
      </Main>
    </Wrap>
  );
};

export default UserPage;

const Wrap = styled.div`
  height: 100vh;
  overflow-y: hidden;
  background-color: ${getStyledColor('gray', 1100)};
`;

const Header = styled.header`
  position: absolute;
  width: 100%;
  padding: 30px;
  background-color: ${getStyledColor('gray', 1200)};
`;
const Main = styled.main`
  display: flex;
  padding: 30px 0px;
  overflow-x: hidden;
  align-items: flex-end;
  height: 100%;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${getStyledColor('red', 900)};
  }
`;

const Name = styled.div`
  color: #fff;
`;

const StyledSlider = styled(Slider)`
  margin-left: 300px;
  width: 100%;
  .slick-prev::before,
  .slick-next::before {
    // 기본으로 제공하는 이전, 다음 버튼을 없앰
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
  }
  .slick-arrow {
  }
  .slick-track {
    height: 600px;
  }
  .slick-current {
  }
  .slick-center {
  }
`;
